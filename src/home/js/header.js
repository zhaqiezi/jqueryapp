ui.module('home').add('header', {
    i18n: ui.i18n('zh', {
        'home-header-logoname': 'jQueryApp',
        'home-header-plan': '开发计划',
        'home-header-spa': '异步SPA',
        'home-header-css': '组件CSS',
        'home-header-js': '模块JS',
        'home-header-ui': '过程UI',
        'home-header-usercenter': '用户中心',
        'home-header-logout': '登出',
    }),
    init: function () {
        this.html();
        this.on();
    },
    html: function () {
        var c = this.config;

        c.$element = $('<div>', {class: "home-header"}).html([
            $('<div>', {class: "wrapper"}).html([
                c.$logo = this.htmlLogo(),
                c.$menu = this.htmlMenu(),
                c.$user = this.htmlUser(),
            ]),
        ]);
        $('body').html(c.$element);
    },
    htmlLogo: function () {
        return $('<div>', {class: "logo"}).html([
            $('<div>', {class: 'img'}),
            $('<div>', {
                class: 'a logoname',
                href: '/'
            }).data({
                i18n: 'home-header-logoname'
            })
        ]);
    },
    htmlMenu: function () {
        var c = this.config;

        return $('<div>', {class: "menu"}).html([
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
        ]);
    },
    htmlUser: function () {
        var t = this;
        var c = this.config;

        return $('<div>', {class: "user"}).html([
            c.$username = $('<a>', {
                class: "a name",
            }).data({
                i18n: 'home-header-usercenter'
            }),
            c.$userlogout = $('<a>', {
                class: "a logout",
            }).data({
                i18n: 'home-header-logout'
            }).click(t.$$parent.logout)
        ]);
    },
    on: function () {
        var c = this.config;


    },
    onActive: function (url) {
        var c = this.config;

        c.$menu.children().each(function () {
            var href = $(this).attr('href');

            if (url == href) {
                $(this).attr('state', 'active');
            } else {
                $(this).attr('state', '');
            }
        });
    },
    routerEnd: function (location) {
        this.onActive(location.href);

    }


});