'use strict'
ui.module('framework', {
    i18n: ui.i18n('zh', {
        'framework-introduce': '框架介绍',

    }),
    routerEnd: function (location) {
        var c = this.config;

        if (location.module == c.module && location.referer.module !== c.module) {
            this.start();
        } else {
            this.unmount(c.$menu)
        }
    },
    start: function () {
        var c = this.config;

        this.mount(ui.module('home.menu').config.$wrapper, c.$menu);
    },
    htmlMenu: function () {
        var c = this.config;

        c.$menu = $('<div>', {class: "menu"}).html([
            $('<a>', {
                class: 'a',
                href: '/framework/introduce'
            }).data({
                i18n: 'framework-introduce'
            }),


        ]);


    },
});



