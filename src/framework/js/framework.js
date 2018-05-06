'use strict'
ui.module('framework', {
    routerEnd: function (location) {
        if (location.referer.module !== 'framework') {

        }

        if (this.start()) {
            this.html(this.on);
        }

    },
    start: function () {
        // 模块缺少start机制
    },
    htmlMenu: function () {
        var c = this.config;

        c.$menu = $('<div>', {class: "menu"}).html([
            $('<a>', {
                class: 'a',
                href: '/framework/plan'
            }).data({
                i18n: 'home-header-plan'
            }),
            $('<a>', {
                class: 'a',
                href: '/spa'
            }).data({
                i18n: 'home-header-spa'
            }),
            $('<a>', {
                class: 'a',
                href: '/css/point'
            }).data({
                i18n: 'home-header-css'
            }),
            $('<a>', {
                class: 'a',
                href: '/js/point'
            }).data({
                i18n: 'home-header-js'
            }),
            $('<a>', {
                class: 'a',
                href: '/ui'
            }).data({
                i18n: 'home-header-ui'
            }),
            $('<a>', {
                class: "a",
                href: '/user'
            }).data({
                i18n: 'home-header-user'
            }),
            $('<a>', {
                class: "a",
                href: '/system'
            }).data({
                i18n: 'home-header-system'
            }),

        ]);

        ui.module('home.menu').html(c.$menu);
    },
});



