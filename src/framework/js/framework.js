'use strict'
ui.module('framework', {
    i18n: ui.i18n('zh', {
        'framework-introduce': '框架介绍',

    }),
    routerEnd: function (location) {
        if (location.referer.module !== 'framework') {
            debugger
        }
    },
    initEnd: function () {

        this.start();
        console.log(4);
    },
    start: function () {
        var c = this.config;

        ui.module('home.menu').html(this.htmlMenu());
    },
    htmlMenu: function () {
        var c = this.config;

        return c.$menu = $('<div>', {class: "menu"}).html([
            $('<a>', {
                class: 'a',
                href: '/framework/introduce'
            }).data({
                i18n: 'framework-introduce'
            }),


        ]);


    },
});



