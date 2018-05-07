ui.router = $.extend(function () {
    var self = this.router;
    return self.add.apply(self, arguments);
}, {
    i18n: ui.i18n('zh', {
        'ui-router-page404': '<div class="f36 m36-b">$ui-router-page404-title$</div><div class="f24">OMG 页面不存在</div>',
        'ui-router-page404-title': '出错了',
        'ui-router-pjaxfail': '抱歉，相关组件加载失败，请点击确定重新加载！',
    }),
    state: {
        location: {},
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
            var path = $(this).attr('href');
            if (self.rewrite(path)) {
                // 阻断原生
                e.preventDefault();
            }
        });

        // 监听window.onpopstate事件
        window.onpopstate = function () {
            var state = window.history.state;
            if (self.isLegal(state.href)) {
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

        if (!this.isModule()) {
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
    isLegal: function (href) {
        var s = this.state;

        // 预留有些情况要return false;
        // 绝对路径的链接跳过
        if (/(^\w)*?\:\/\//.test(href)) {
            return false;
        }

        var pathname = href;
        var search = '';
        if (href.indexOf('?') != -1) {
            pathname = href.substr(0, href.lastIndexOf('?'));
            search = href.substr(href.lastIndexOf('?'));
        }
        var dir = ui.array.del(pathname.split('/'), '');
        var module = dir[0] || 'home';

        s.location = {
            referer: ui.json.clone(window.location, ['href', 'pathname', 'search', 'module']),
            href: href,
            pathname: pathname,
            search: search,
            query: ui.string.getParam(search),
            dir: dir,
            module: module,
        }

        return true;
    },
    isExist: function (updateTitle) {
        var s = this.state;
        var c = this.config;
        var href = this.state.location.href;

        var rt = false;
        c.router.forEach(function (json) {
            var exist = false;
            var path = json.path;
            var title = json.title;

            if (ui.isRegExp(path)) {
                if (path.test(href)) {
                    exist = true;
                }
            } else if (path === href) {
                exist = true;
            }

            if (exist) {
                rt = true;
                if (updateTitle) {
                    document.title = json.i18n ? ui.i18n(title) : title;
                }
            }
        });

        if (rt === false) {
            this.error404();
            console.error('url is not exist: ' + href);
        }

        return rt;
    },
    isModule: function () {
        var s = this.state;

        if (!ui.require.has(s.location.module)) {
            this.error404();
            console.error('module is not exist: ' + s.location.module);
            return false;
        }
        return true;
    },
    history: function (save) {
        var s = this.state;

        if (save !== false) {
            window.history.pushState(ui.json.clone(s.location, ['href', 'pathname', 'search']), '', s.location.href);
        }
    },
    error404: function () {
        document.title = ui.i18n('ui-router-page404-title');
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
    refresh: function () {
        var s = this.state;

        var url = window.location.pathname + window.location.search;
        if (this.isLegal(url)) {
            this.pjax();
        }
    },
    rewrite: function (path) {
        var s = this.state;
        // 用输入的方式请求
        if (!path) {
            path = window.location.pathname;
        }
        // 与当前的链接相同，阻断但不用继续操作
        if (s.location.path == path) {
            return true;
        }
        if (this.isLegal(path)) {
            this.pjax($.extend({}, s.location));
            // 成功进入pjax
            return true;
        } else {
            return false;
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

