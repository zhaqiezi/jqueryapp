ui.module('framework').add('introduce', {
    i18n: ui.i18n('zh', {
        '/framework/introduce': '框架介绍',

        'framework-introduce-title': '依然 write less, do more',

    }),
    router: ui.router({
        i18n: true,
        title: '/framework/introduce',
        path: '/framework/introduce',
    }),
    routerEnd: function (location) {
        if (location.pathname !== this.router.path) {
            this.unmount();
            return false;
        }

        this.start();

    },
    start: function () {
        this.html();
        this.on();
    },
    html: function () {
        var c = this.config;

        c.$element = $('<div>', {class: "module"}).html([
            c.$wrapper = $('<div>', {class: "wrapper"}).html([
                c.$title = ui('aticle').h1({
                    i18n: 'framework-introduce-title'
                }),
            ])
        ]);
        ui.module('home.body').mount(c.$element);
    },

    on: function () {
        var c = this.config;


    },

});