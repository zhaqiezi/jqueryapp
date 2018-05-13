'use strict'
ui.module('home', {
    i18n: ui.i18n('zh', {
        'home': 'jQueryApp',
    }),
    router: ui.router({
        i18n: true,
        title: 'home',
        path: '/'
    }),
    state: {},
    config: {
        version: '{{environment.version}}',
        module: {
            'framework': [
                '/css/framework.css',
                '/js/framework.js'
            ],
        }
    },

    initEnd: function () {
        var c = this.config;

        ui.i18n.init('zh');

        ui.router.init();

        ui.require.init(c.module);

        this.start();

    },
    start: function () {
        var s = this.state;

        s.startCallbacks.fire();

        ui.router.go();


    },


});










