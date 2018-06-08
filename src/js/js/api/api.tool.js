ui.module('js.api').add('tool', {
    i18n: ui.i18n('zh', {
        '/js/api/tool': '工具算法',



    }),
    router: ui.router({
        title: '/js/api/tool',
        path: '/js/api/tool',
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

        ])

        // ui.module('home.body').mount(c.$element);
    },
    on: function () {
        var c = this.config;


    },

});