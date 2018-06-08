ui.module('js.doc').add('ui', {
    i18n: ui.i18n('zh', {
        '/js/doc/ui': '算法和工具',



    }),
    router: ui.router({
        title: '/js/doc/ui',
        path: '/js/doc/ui',
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

        ]).addClass('js-apidoc-c');

        ui.module('home.body').mount(c.$element);
    },
    on: function () {
        var c = this.config;


    },

});