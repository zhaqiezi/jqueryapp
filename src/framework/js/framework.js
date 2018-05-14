'use strict'
ui.module('framework', {


    component: {
        title: function (args) {
            // 传进来的args 不会变，this参数可以变
            var $html = $('<div>', {class: "title center"}).html([
                $('<a>', {class: "btn-arrow theme left"}).attr({
                    href: g.location.parent
                }).html([
                    '<i class="i-undo2"></i>',
                    '<span class="word" data-i18n="back"></span>'
                ]),
                '<div class="word" data-i18n="dispatch-route-domainsecond-' + (c.isAdd ? 'add' : 'update') + '"></div>'
            ]);
            return $html;
        }
    }
});



