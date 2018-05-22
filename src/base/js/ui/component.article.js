ui.add('article', {
    title: function (html) {

        var $element = $('<div>', {class: 'ui-article-title'});

        ui.component.one($element, {
            $wrapper: $('<div>', {class: 'wrapper'}).html(html),
        });

        return $element;
    },
    content: function (html) {

        var $element = $('<div>', {class: 'ui-article-content'});

        ui.component.one($element, {
            $wrapper: $('<div>', {class: 'wrapper'}).html(html),
        });

        return $element;
    }
})
