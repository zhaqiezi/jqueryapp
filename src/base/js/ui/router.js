ui.router = $.extend(function () {
    var self = this.router;

}, {
    state: {
        location: {},
        isRunning: false,
        timeoutId: '',
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
            c.$wrapper = $('<div>', {class: "wrapper"}).html([
                c.$progress = $('<div>', {class: "progress"}),
                c.$loading = $('<div>', {class: "loading"}).html([
                    c.$icon = $('<i>', {class: 'icon'})
                ]),
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
            var pathname = state ? state.pathname : window.location.pathname;
            var search = state ? state.search : window.location.search;
            if (self.allow(pathname, search)) {
                self.pjax($.extend({}, s.location), false);
            }
        };

    },

    allow: function (pathname, search) {
        var s = this.state;

        // 预留有些情况要return false;
        // 绝对路径的链接跳过
        if (pathname.indexOf('://') != -1) {
            return false;
        }

        var params = ui.array.del(pathname.split('/'), '');

        s.location = {
            referer: ui.json.clone(window.location, {title: document.title}),
            params: params,
            query: ui.string.getParam(search),
            path: pathname + search,
            pathname: pathname,
            search: search,
            parent: pathname.substr(0, pathname.lastIndexOf('/')),
            module: params[0] || '',
            getPath: function (level) {
                return '/' + this.params.slice(0, level).join('/')
            },
        }
        return true;
    },

    pushState: function (location, push) {
        var i18n = this.checkStateExist(location);
        var title = '';

        if (!i18n) {
            title = ui.i18n.getValue('home-error');
            home.error.page('page -> ' + location.path);
        } else {
            title = ui.i18n.getValue(i18n);
            home.error.none();
        }

        document.title = title;
        if (push !== false) {
            window.history.pushState({
                path: location.path,
                pathname: location.pathname,
                search: location.search,
                title: title
            }, title, location.path);
        }
    },
    checkStateExist: function (location) {
        var c = this.config;
        var i18n = '';
        c.state.forEach(function (json) {
            var rt = false;
            if (ui.isRegExp(json.path)) {
                if (json.path.test(location.pathname)) {
                    rt = true;
                }
            } else if (json.path == location.pathname) {
                rt = true;
            }

            if (rt) {
                i18n = json.i18n;
            }
        });
        return i18n;
    },

    pjax: function (location, push) {
        var s = this.state;
        var self = this;
        var module = location.module;

        if (!module) {
            location.path = '/';
            self.pjaxSuccess(location);
            return;
        }

        if (s.isRunning) {
            clearTimeout(s.timeoutId);
            s.timeoutId = setTimeout(function () {
                self.pjaxFail(location);
            }, 10000);
            return false;
        }

        if (ui.require.isDone(module)) {
            window[module].init();
            this.pjaxSuccess(location, push);
            return false;
        }

        if (!ui.require.has(module)) {
            home.error.page('module -> ' + module);
            return false;
        }

        this.pjaxStart(location);
        ui.require(module, function () {
            window[module].init();
            self.pjaxSuccess(location);

        }, this.pjaxProgress.bind(this));
    },
    pjaxStart: function () {
        var s = this.state;
        var c = this.config;
        c.$element.fadeIn();
        s.isRunning = true;
        if (this.startCallbacks) {
            this.startCallbacks.fire();
        }
    },
    pjaxProgress: function (done, total) {
        var c = this.config;
        if (total) {
            var percent = (done / total) * 100 + '%';
            c.$progress.stop().animate({
                'width': percent
            }, {
                duration: 300,
                complete: function () {
                    if (done == total) {
                        c.$element.stop().fadeOut();
                    }
                }
            }, 'swing');
        }
    },
    pjaxSuccess: function (location, push) {
        var s = this.state;
        s.isRunning = false;

        this.pushState(location, push);

        clearTimeout(s.timeoutId);
        if (this.endCallbacks) {
            this.endCallbacks.fire(location);
        }
    },
    pjaxFail: function (location) {
        console.error('pjaxFail');
        console.error(location);
        ui.dialog.confirm(ui.i18n.getValue('system-pjax-error'), function () {
            window.location.reload();
        })
    },
}, {
    add: function (router) {
        var c = this.config;

        // 这里需要处理下

        c.router = c.router.concat(router);
    },
    refresh: function () {
        var s = this.state;

        if (this.allow(window.location.pathname, window.location.search)) {
            this.pjax(ui.json.clone(s.location));
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
        if (this.allow(path)) {
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
});

