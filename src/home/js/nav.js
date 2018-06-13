ui.module('home').add('nav', {
    init: function () {
        this.html();
        this.on();
    },
    routerEnd: function (location) {
        var c = this.config;

        ui.menu.active(c.$element, location.url);

    },
    html: function () {
        var c = this.config;

        c.$element = $('<nav>', {class: "home-nav"}).html([
            c.$wrapper = $('<div>', {class: "wrapper"})
        ]);
        $('body').append(c.$element);
    },
    on: function () {
        var c = this.config;


    },

});
