'use strict'
ui.module('js', {
    i18n: ui.i18n('zh', {
        '/js': '模块JS相关文档',

    }),
    router: ui.router({
        title: '/js',
        path: '/js',
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



