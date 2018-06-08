ui.module('js').add('menu', {
    i18n: ui.i18n('zh', {
        'js-api': 'API文档',
        'js-component': '对象化组件',
        'js-plugin': '精选插件',
        'js-module': 'SPA模块',
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
                href: '/js/api'
            }).i18n('js-api'),
            $('<a>', {
                class: 'a',
                href: '/js/component'
            }).i18n('js-component'),
            $('<a>', {
                class: 'a',
                href: '/js/plugin'
            }).i18n('js-plugin'),
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
