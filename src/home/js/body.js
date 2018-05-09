ui.module('home').add('body', {
    init: function () {
        this.html();
        this.on();
    },
    html: function ($html) {
        var c = this.config;

        c.$element = $('<div>', {class: "home-body"}).html([
            c.$wrapper = $('<div>', {class: "wrapper"})
        ]);
        this.mount($('body'), c.$element, 'append');
    },
    on: function () {
        var c = this.config;

        // 追加全局事件
        // 滚动事件中调整界面
        c.$wrapper.on('scroll', function () {
            // ui.dropdown.fitPosition();
        });
    },

});
