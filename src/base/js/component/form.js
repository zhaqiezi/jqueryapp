ui.add('form.view', {
    row: function () {
        // 传进来的args 不会变，this参数可以变

        var $element = $('<div>', {class: "row"});

        ui.component.one($element, {
            $left: ui.component.one($('<div>', {class: "col3 col-name"}), {
                $name: $('<span>', {class: 'word'}).data('i18n', 'back')
            }),
            $right: ui.component.one($('<div>', {class: "col6 col-item"}), {
                $value: $('<label>', {class: 'label'}).data('i18n', 'back')
            }),
        }, args);

        return $element;


    },
    submit: function () {
        //
    }
});

ui.add('form.add', {
    row: function () {
        // 传进来的args 不会变，this参数可以变

        var $element = $('<div>', {class: "row"});

        ui.component.one($element, {
            $left: ui.component.one($('<div>', {class: "col3 col-name"}), {
                $name: $('<span>', {class: 'word'}).data('i18n', 'back')
            }),
            $right: ui.component.one($('<div>', {class: "col6 col-item"}), {
                $value: $('<label>', {class: 'label'}).data('i18n', 'back')
            }),
        }, args);

        return $element;


    },
    submit: function () {
        //
    }
});



