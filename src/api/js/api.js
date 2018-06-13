'use strict';
ui.module('api', {
    i18n: ui.i18n('zh', {
        '/api': 'API文档',

    }),
    router: ui.router({
        title: '/api',
        path: '/api',
    }),
    html: function () {
        var c = this.config;

        c.$element = ui('home').module([
            ui('article').search()
        ]);

        ui.module('home.body').mount(c.$element);
    },
    on: function () {


    },
    component: {}

});



