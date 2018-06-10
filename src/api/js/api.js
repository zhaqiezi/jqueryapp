'use strict'
ui.module('api', {
    i18n: ui.i18n('zh', {
        '/api': '模块JS相关文档',

    }),
    router: ui.router({
        title: '/api',
        path: '/api',
    }),
    start: function () {
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
        var c = this.config;


    },
    component: {


    }

});



