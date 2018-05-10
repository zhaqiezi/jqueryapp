ui.module('home').add('menu', {
    init: function () {
        this.html();
        this.on();
    },
    html: function ($html) {
        var c = this.config;

        if (!ui.isNull($html)) {
            c.$wrapper.html($html);
            $html.isMount

        } else {
            c.$element = $('<div>', {class: "home-menu"}).html([
                c.$wrapper = $('<div>', {class: "wrapper"})
            ]);
            $('body').append(c.$element);
        }
    },
    on: function () {
        var c = this.config;


    },

});
