ui.module('home').add('header', {
    i18n: ui.i18n('zh', {
        'home-header-logoname': 'jQueryApp',
        'home-header-framework': '开发计划',
        'home-header-api': 'API文档',
        'home-header-i18n': '多语言',
    }),
    init: function () {
        this.html();
        this.on();
    },
    routerEnd: function (location) {
        var c = this.config;

        ui.menu.active(c.$menu, location.url);
    },
    html: function () {
        var c = this.config;

        c.$element = $('<header>', {class: "home-header"}).html([
            $('<div>', {class: "wrapper"}).html([
                c.$logo = this.htmlLogo(),
                c.$menu = this.htmlMenu(),
                c.$right = this.htmlRight(),
            ]),
        ]);
        $('body').html(c.$element);
    },
    htmlLogo: function () {
        return $('<div>', {class: "logo"}).html([
            $('<a>', {
                class: 'a logoname',
                href: '/'
            }).data({
                i18n: 'home-header-logoname'
            })
        ]);
    },
    htmlMenu: function () {
        return $('<div>', {class: "menu"}).html([
            $('<a>', {
                class: 'a',
                href: '/framework'
            }).i18n('home-header-framework'),
            $('<a>', {
                class: 'a',
                href: '/api'
            }).i18n('home-header-api'),
        ]);
    },
    htmlRight: function () {
        return $('<div>', {class: "right"}).html([
            $('<a>', {
                class: "a",
                href: '/i18n'
            }).data({
                i18n: 'home-header-i18n'
            }),
        ]);
    },
    on: function () {


    },


});