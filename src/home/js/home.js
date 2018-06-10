'use strict'
ui.module('home', {
    i18n: ui.i18n('zh', {
        'home': 'jQueryApp',
        'back': '返回',
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
            'api': [
                '/css/api.css',
                '/js/api.js'
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

    component: {
        module: function (html) {

            var $element = $('<div>', {class: 'home-module'});

            ui.component.one($element, {
                $wrapper: ui.component.one($('<div>', {class: "wrapper"}), html),
            });

            return $element;
        },

        title: function (args) {

            var $element = $('<div>', {class: "title center"});

            ui.component.one($element, {
                $btn: ui.component.one($('<a>', {class: "btn-arrow theme left"}).attr({
                    href: this.href
                }), {
                    $icon: $('<i>', {class: 'i-undo2'}),
                    $word: $('<span>', {class: 'word'}).data('i18n', 'back')
                }),
                $text: $('<div>', {class: 'word'}).html(args.text),
            }, args);


            return $element;
        }
    }
});










