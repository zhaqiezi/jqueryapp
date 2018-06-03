ui.module('js').add('index', {
    i18n: ui.i18n('zh', {
        '/js/index': '开发计划',



    }),
    router: ui.router({
        title: '/js/index',
        path: '/js/index',
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

        ]).addClass('js-index-c');
        ui.module('home.body').mount(c.$element);
    },
    on: function () {
        var c = this.config;


    },

});