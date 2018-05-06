ui.module('framework').add('introduce', {
    i18n: ui.i18n('zh', {
        '/framework/introduce': '框架介绍'
    }),
    router: ui.router({
        i18n: true,
        title: '/framework/introduce',
        path: '/framework/introduce',
    }),
    routerEnd: function (location) {
        if (this.router.path === location.path) {
            this.remove();
            return false;
        }

        if (this.$$parent.routerSecurity() === false) {
            return false;
        }

        if (this.start()) {
            this.html(this.on);
        }

    },
    start: function () {
        var c = this.config;

        c.$element = $('<div>', {class: "module"}).html([
            c.$wrapper = $('<div>', {class: "wrapper"})
        ]);
        ui.module('home.body').html(c.$element);


    },
    html: function () {
        var c = this.config;


    },
    on: function () {
        var c = this.config;


    },

});