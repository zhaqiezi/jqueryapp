ui.module('js').add('doc', {
    i18n: ui.i18n('zh', {
        '/js/doc': 'JS文档',



    }),
    router: ui.router({
        title: '/js/doc',
        path: '/js/doc',
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

        ]).addClass('js-doc-c');
        ui.module('home.body').mount(c.$element);
    },
    on: function () {
        var c = this.config;


    },

});