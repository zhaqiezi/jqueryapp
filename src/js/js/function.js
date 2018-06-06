ui.module('js').add('function', {
    i18n: ui.i18n('zh', {
        '/js/function': '算法和工具库文档',



    }),
    router: ui.router({
        title: '/js/function',
        path: '/js/function',
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

        ]).addClass('js-function-c');

        ui.module('home.body').mount(c.$element);
    },
    on: function () {
        var c = this.config;


    },

});