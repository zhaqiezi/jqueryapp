ui.router = $.extend(function () {
    var self = this.router;
    return self.add.apply(self, arguments);
}, {
    i18n: ui.i18n('zh', {
        'ui-router-page404': '页面不存在',
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
                $('<div>', {class: 'title'}).data('i18n', 'ui-router-page404')
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

        var location = ui.json.clone(s.location);

        if (s.isPjaxing) {
            return false;
        }

        if (location.pathname === '/') {
            this.pjaxSuccess(location);
            return false;
        }

        if (!this.isModule(location.module)) {
            return false;
        }

        if (ui.require.isDone(location.module)) {
            this.pjaxSuccess(location, save);
            return false;
        }

        this.pjaxStart(location);

        ui.require(location.module, function () {
            ui.module(location.module).init();
            self.pjaxSuccess(location);
        }, this.pjaxProgress.bind(this));

    },
    pjaxStart: function (location) {
        var s = this.state;

        s.startCallbacks.fire(location);
        this.setState('progress');
        s.isPjaxing = true;
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
                        self.setState('normal');
                    }
                }
            }, 'swing');
        }
    },
    pjaxSuccess: function (location, save) {
        this.save(location, save);
        this.pjaxStop(location);
    },
    pjaxStop: function (location) {
        var s = this.state;

        s.isPjaxing = false;
        s.endCallbacks.fire(location);
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

        s.location = {
            referer: ui.json.clone(window.location, ['href', 'pathname', 'search'], {title: document.title}),
            href: href,
            pathname: pathname,
            search: search,
            query: ui.string.getParam(search),
            dir: dir,
            module: dir[0] || 'home'
        }

        return true;
    },
    isExist: function (location) {
        var c = this.config;
        var title = false;

        c.router.forEach(function (json) {
            var rt = false;
            if (ui.isRegExp(json.path)) {
                if (json.path.test(location.href)) {
                    rt = true;
                }
            } else if (json.path === location.href) {
                rt = true;
            }

            if (rt) {
                if (json.i18n) {
                    title = ui.i18n(json.title);
                } else {
                    title = json.title;
                }
            }
        });

        if (title === false) {
            this.error404();
            console.error('url is not exist: ' + location.href);
        } else {
            this.setState('normal');
        }

        return title;
    },
    isModule: function (module) {
        if (!ui.require.has(module)) {
            this.error404();
            console.error('module is not exist: ' + module);
            return false;
        }
        return true;
    },
    save: function (location, save) {
        var s = this.state;

        var title = this.isExist(location);
        if (!title) {
            return false;
        }

        document.title = title;
        if (save !== false) {
            window.history.pushState(ui.json.clone(s.location, ['href', 'pathname', 'search'], {title: document.title}), document.title, s.location.href);
        }
    },
    error404: function () {
        document.title = ui.i18n('ui-router-page404');
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
        this.startCallbacks.add(fn);
    },
    addEnd: function (fn) {
        this.endCallbacks.add(fn);
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

