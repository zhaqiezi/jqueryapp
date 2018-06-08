ui.module('js').add('menu', {
    i18n: ui.i18n('zh', {
        'js-doc-ui': '算法和工具',
        'js-doc-ui-component': 'UI组件',
        'js-doc-ui-module': 'UI模块',
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
            }).i18n('js-doc-ui'),
            $('<a>', {
                class: 'a',
                href: '/js/component'
            }).i18n('js-doc-ui-component'),
            $('<a>', {
                class: 'a',
                href: '/js/module'
            }).i18n('js-doc-ui-module'),
        ]);

        ui.module('home.nav').mount(c.$element);
    },
    on: function () {
        var c = this.config;
        var s = this.state;

        ui.menu.active(c.$element, s.location.url);

    },

});
