ui.module('framework').add('plan', {
    i18n: ui.i18n('zh', {
        '/framework/plan': '开发计划'
    }),
    router: ui.router({
        i18n: true,
        title: '/framework/plan',
        path: '/framework/plan',
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
            c.$wrapper = $('<div>', {class: "wrapper"})
        ]);
        ui.module('home.body').mount(c.$element);
    },
    on: function () {
        var c = this.config;


    },

});