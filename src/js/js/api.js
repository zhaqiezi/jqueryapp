ui.module('js').add('api', {
    i18n: ui.i18n('zh', {
        '/js/api': '算法和工具类文档',

    }),
    router: ui.router({
        title: '/js/api',
        path: '/js/api',
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

        c.$element = ui('home').module([
            c.$header = $('<div>', {class: 'header'}),
            c.$menu = $('<div>', {class: 'menu'}),
            c.$content = $('<div>', {class: 'content'}),

        ]).addClass('js-api-c');

        ui.module('home.body').mount(c.$element);
    },
    on: function () {
        var c = this.config;


    },
    component: {}

});