ui.module('framework').add('plan', {
    i18n: ui.i18n('zh', {
        '/framework/plan': '开发计划'
    }),
    router: ui.router({
        title: '/framework/plan',
        i18n: true,
        path: '/framework/plan',
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