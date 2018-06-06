ui.module('js').add('menu', {
    i18n: ui.i18n('zh', {
        'js-function': '算法及工具库',
        'js-component': 'UI及自定义组件',
        'js-module': 'SPA及流程模块',
    }),
    routerEnd: function (location) {
        var c = this.config;
        var s = this.state;

        if (location.module !== c.module) {
            this.unmount();
            return false;
        }

        if (location.referer.module !== c.module) {
            s.location = location;
            this.start();
        }
    },
    start: function () {
        this.html();
        this.on();
    },
    html: function () {
        var c = this.config;

        c.$element = $('<div>', {class: "menu"}).html([
            $('<a>', {
                class: 'a',
                href: '/js/function'
            }).i18n('js-function'),
            $('<a>', {
                class: 'a',
                href: '/js/component'
            }).i18n('js-component'),
            $('<a>', {
                class: 'a',
                href: '/js/module'
            }).i18n('js-module'),
        ]);

        ui.module('home.nav').mount(c.$element);
    },
    on: function () {
        var c = this.config;
        var s = this.state;

        ui.menu.active(c.$element, s.location.url);

    },

});
