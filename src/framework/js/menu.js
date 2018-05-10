ui.module('framework').add('menu', {
    i18n: ui.i18n('zh', {
        'framework-introduce': '框架介绍',

    }),
    routerEnd: function (location) {
        var c = this.config;

        if (location.module === c.module) {
            if (location.referer.module !== c.module) {
                this.start();
            }
        }
        else {
            this.remove()
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
        ]);
        ui.module('home.menu').html(c.$element);
    },
    on: function () {
        var c = this.config;


    },

});
