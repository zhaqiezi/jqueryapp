ui.module('about').add('framework', {
    i18n: ui.i18n('zh', {
        '/about/framework': 'jQueryApp框架的目标功能'
    }),
    router: ui.router({
        title: '/about/framework',
        i18n: true,
        path: '/about/framework',
    }),
    routerEnd: function (location) {
        debugger

        // 异步广播触发，需要进行路由校验
        if (this.router.path.test(location.path)) {
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