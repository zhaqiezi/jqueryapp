ui.module('framework').add('menu', {
    i18n: ui.i18n('zh', {
        'framework-introduce': '框架介绍',
        'framework-feature': '框架特性',
        'framework-mindmap': '框架脑图',

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
                href: '/framework/introduce'
            }).data({
                i18n: 'framework-introduce'
            }),
            $('<a>', {
                class: 'a',
                href: '/framework/feature'
            }).data({
                i18n: 'framework-feature'
            }),
            $('<a>', {
                class: 'a',
                href: '/framework/mindmap'
            }).data({
                i18n: 'framework-mindmap'
            }),
        ]);

        ui.module('home.nav').mount(c.$element);
    },
    on: function () {
        var c = this.config;
        var s = this.state;

        ui.menu.active(c.$element, s.location.url);

    },

});
