'use strict'
ui.module('home', {
    state: {},
    config: {
        version: '{{environment.version}}',
        module: {
            'about': [
                '/css/about.css',
                '/js/about.js'
            ],
        }
    },
    i18n: ui.i18n('zh', {
        'home-title': 'jQuery based application',
    }),
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

        ui.router.refresh();


    },


});










