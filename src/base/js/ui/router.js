ui.router = $.extend(function () {
    var self = this.router;
    return self.add.apply(self, arguments);
}, {
    i18n: ui.i18n('zh', {
        'ui-router-page404': '<div class="f36 m36-b">$$ui-router-page404-title$$</div><div class="f24">OMG 页面不存在</div>',
        'ui-router-page404-title': '出错了',
        'ui-router-pjaxfail': '抱歉，相关组件加载失败，请点击确定重新加载！',
    }),
    state: {
        location: {},
        referer: {},
        isPjaxing: false,
        startCallbacks: $.Callbacks('unique stopOnFalse'),
        endCallbacks: $.Callbacks('unique'),
    },
    config: {
        router: [],
        $element: null
    },
    init: function () {
        this.html();
        this.on();
    },
    html: function () {
        var c = this.config;

        c.$element = $('<div>', {class: "ui-router"}).html([
            c.$progress = $('<div>', {class: "progress"}).html([
                c.$bar = $('<div>', {class: "bar"}),
                c.$loading = $('<div>', {class: "loading"}).html([
                    $('<i>', {class: 'icon'})
                ]),
            ]),
            c.$page404 = $('<div>', {class: "page404"}).html([
                $('<div>', {class: 'title'}).data('i18n', 'ui-router-page404'),
            ]),
        ]);
        $('body').append(c.$element);
    },
    on: function () {
        var s = this.state;
        var self = this;

        // SPA方式，需要全局接管标签<a>链接的点击事件
        $(document).on('click', 'a[href]:not([target="_blank"]):not([download])', function (e) {
            var href = $(this).attr('href');
            if (self.isLegal(href)) {
                self.pjax();
                // 阻断原生
                e.preventDefault();
            }
        });

        // 监听window.onpopstate事件
        window.onpopstate = function () {
            var state = window.history.state;
            if (self.isLegal(state.url)) {
                self.pjax(false);
            }
        };

    },
    pjax: function (save) {
        var s = this.state;
        var self = this;

        if (s.isPjaxing) {
            return false;
        }

        var module = s.location.module;

        this.history(save);

        if (location.pathname === '/') {
            this.pjaxStop(location);
            return false;
        }

        if (!this.hasModule(module)) {
            return false;
        }

        if (ui.require.isDone(module)) {
            this.pjaxStop(location);
            return false;
        }

        this.pjaxStart(location);

        ui.require(module, function () {
            ui.module(module).init();
            self.pjaxStop(location);
        }, this.pjaxProgress.bind(this));

    },
    pjaxStart: function () {
        var s = this.state;

        s.startCallbacks.fire(s.location);
        s.isPjaxing = true;
        this.setState('progress');
    },
    pjaxProgress: function (done, total) {
        var c = this.config;
        var self = this;
        if (total) {
            var percent = (done / total) * 100 + '%';
            c.$bar.stop().animate({
                'width': percent
            }, {
                duration: 300,
                complete: function () {
                    if (done == total) {
                        c.$element.stop();
                    }
                }
            }, 'swing');
        }
    },
    pjaxStop: function () {
        var s = this.state;

        if (this.isExist(true)) {
            s.endCallbacks.fire(s.location);
            this.setState('');
        }
        s.isPjaxing = false;
    },
    isLegal: function (url) {
        var s = this.state;

        // 预留有些情况要return false;
        // 绝对路径的链接跳过
        if (/(^\w)*?\:\/\//.test(url)) {
            return false;
        }

        var pathname = url;
        var search = '';
        if (url.indexOf('?') != -1) {
            pathname = url.substr(0, url.lastIndexOf('?'));
            search = url.substr(url.lastIndexOf('?'));
        }
        var dir = ui.array.del(pathname.split('/'), '');

        s.referer = ui.json.clone(s.location);
        s.location = {
            referer: ui.json.clone(s.referer),
            url: url,
            pathname: pathname,
            search: search,
            query: ui.string.getParam(search),
            dir: dir,
            module: dir[0] || '',
            space: dir.join('.')
        }

        return true;
    },
    isExist: function (updateTitle) {
        var s = this.state;
        var c = this.config;
        var url = this.state.location.url;

        var rt = false;
        c.router.forEach(function (json) {
            var exist = false;
            var path = json.path;
            var title = json.title;

            if (ui.isRegExp(path)) {
                if (path.test(url)) {
                    exist = true;
                }
            } else if (path === url) {
                exist = true;
            }

            if (exist) {
                rt = true;
                if (updateTitle) {
                    document.title = ui.i18n(title);
                }
            }
        });

        if (rt === false) {
            this.error404();
            console.error('url is not exist: ' + url);
        }

        return rt;
    },
    hasModule: function (module) {

        if (!ui.require.has(module)) {
            this.error404();
            console.error('module is not exist: ' + module);
            return false;
        }
        return true;
    },
    history: function (save) {
        var s = this.state;
        var url = s.location.url;
        var key = 'ui.router.state.location.url';

        if (save !== false) {
            if (url !== window.sessionStorage.getItem(key)) {
                window.sessionStorage.setItem(key, url);
                window.history.pushState(ui.json.clone(s.location, ['url', 'pathname', 'search']), '', url);
            }
        }
    },
    error404: function () {
        var s = this.state;

        document.title = ui.i18n('ui-router-page404-title') + s.location.pathname;
        this.setState('404');
    },
    setState: function (state) {
        var c = this.config;

        c.$element.attr('state', state);
    },
}, {
    add: function (router) {
        var c = this.config;

        c.router = c.router.concat(router);
        return router;
    },
    go: function (url) {
        var wl = window.location;

        url = url ? url : (wl.pathname + wl.search);

        if (this.isLegal(url)) {
            this.pjax();
        }
    },
    addStart: function (fn) {
        var s = this.state;

        s.startCallbacks.add(fn);
    },
    addEnd: function (fn) {
        var s = this.state;

        s.endCallbacks.add(fn);
    },
    getPath: function (location, level) {
        var pathname = '/';
        if (!ui.isNull(level)) {
            pathname += location.params.slice(0, level).join('/');
        } else {
            pathname += location.params.join('/');
        }
        return pathname;
    },

});

