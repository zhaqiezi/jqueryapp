ui.router = $.extend(function () {
    var self = this.router;
    return self.add.apply(null, arguments);
}, {
    i18n: ui.i18n('zh', {
        'ui-router-page404': '页面不存在',
        'ui-router-pjaxfail': '抱歉，相关组件加载失败，请点击确定重新加载！',
    }),
    state: {
        location: {},
        isProgress: false,
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
            if (self.legal(state.href)) {
                self.pjax(false);
            }
        };

    },
    legal: function (href) {
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

        s.location = {
            referer: ui.json.clone(window.location, ['href', 'pathname', 'search'], {title: document.title}),
            href: href,
            pathname: pathname,
            search: search,
            query: ui.string.getParam(search),
            dirname: ui.array.del(pathname.split('/'), ''),
        }

        return true;
    },

    pjax: function (save) {
        var s = this.state;
        var self = this;

        var location = ui.json.clone(s.location);

        if (location.pathname === '/') {
            self.pjaxSuccess(location);
            return;
        }

        if (s.isProgress) {
            clearTimeout(s.timeoutId);
            s.timeoutId = setTimeout(function () {
                self.pjaxFail(location);
            }, 10000);
            return false;
        }

        var module = location.dirname[0];

        if (!ui.require.has(name)) {
            self.setState('error');
            console.error('module is not exist: ' + module);
            return false;
        }

        if (ui.require.isDone(module)) {
            this.pjaxSuccess(location, save);
            return false;
        }

        this.pjaxStart(location);

        ui.require(module, function () {
            window[module].init();
            self.pjaxSuccess(location);
        }, this.pjaxProgress.bind(this));

    },
    pjaxStart: function (location) {
        var s = this.state;
        var c = this.config;
        var smooth = this.startCallbacks.fire(location);

        if (smooth) {
            self.setState('progress');
            s.isProgress = true;
        }
    },
    pjaxProgress: function (done, total) {
        var c = this.config;
        if (total) {
            var percent = (done / total) * 100 + '%';
            c.$bar.stop().animate({
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
    pjaxSuccess: function (location, save) {
        var s = this.state;
        s.isProgress = false;

        this.pushState(location, save);

        clearTimeout(s.timeoutId);
        if (this.endCallbacks) {
            this.endCallbacks.fire(location);
        }
    },
    pjaxFail: function () {
        ui.dialog.confirm(ui.i18n('ui-router-pjaxfail'), function () {
            window.location.reload();
        })
    },
    pushState: function (location, save) {

        var title = this.checkExist(location);

        if (title === false) {
            title = ui.i18n('ui-router-page404');
            self.setState('404');
            console.error('url is not exist: ' + location.href);
        } else {
            self.setState('normal');
        }

        document.title = title;

        if (save !== false) {
            window.history.pushState(ui.json.clone(s.location, ['href', 'pathname', 'search'], {title: title}), title, s.location.href);
        }
    },
    checkExist: function (location) {
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

        return title;
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
        if (this.legal(url)) {
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
        if (this.legal(path)) {
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

