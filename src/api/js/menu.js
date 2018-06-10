ui.module('api').add('menu', {
    i18n: ui.i18n('zh', {
        'api-ui': 'ui对象',
        'api-ui-is': 'ui.is',
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
                href: '/api/ui'
            }).i18n('api-ui'),
            $('<a>', {
                class: 'a',
                href: '/api/ui/is'
            }).i18n('api-ui-is'),

        ]);

        ui.module('home.nav').mount(c.$element);
    },
    on: function () {
        var c = this.config;
        var s = this.state;

        ui.menu.active(c.$element, s.location.url);

    },

});
