ui.module('js').add('menu', {
    i18n: ui.i18n('zh', {
        'js-doc': 'API文档',

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
                href: '/js/doc'
            }).i18n('js-doc'),

        ]);

        ui.module('home.nav').mount(c.$element);
    },
    on: function () {
        var c = this.config;
        var s = this.state;

        ui.menu.active(c.$element, s.location.url);

    },

});
