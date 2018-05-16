ui.add('aticle', {
    h1: function (args) {
        // 传进来的args 不会变，this参数可以变

        var $element = $('<div>', {class: "row"});

        ui.component.one($element, {
            $left: ui.component.one($('<div>', {class: "f22"}), {
                $name: $('<span>', {class: 'word'}).data('i18n', args.i18n)
            }),
        }, args);

        return $element;


    },
});




