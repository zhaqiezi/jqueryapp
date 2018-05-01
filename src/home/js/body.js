ui.module('home').add('body', {
    init: function () {
        this.html();
        this.on();
    },
    html: function ($html) {
        var c = this.config;

        if (ui.isJquery($html)) {
            c.$wrapper.html($html);
        } else {
            c.$element = $('<div>', {class: "home-body"}).html([
                c.$wrapper = $('<div>', {class: "wrapper"})
            ]);
            $('body').append(c.$element);
        }
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
