ui.module('api').add('ui', {
    i18n: ui.i18n('zh', {
        '/api/ui': '${api-ui}$-${/api}$',


    }),
    router: ui.router({
        title: '/api/ui',
        path: '/api/ui',
    }),
    routerEnd: function (location) {
        if (location.pathname !== this.router.path) {
            this.unMount();
            return false;
        }
        this.html();
        this.on();
    },
    html: function () {
        var c = this.config;

        c.$element = ui('home').module([

        ]);

        ui.module('home.body').mount(c.$element);
    },
    on: function () {


    },

});