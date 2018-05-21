ui.add('article', {
    title: function (html) {

        var $element = $('<div>', {class: 'ui-article-title'});

        ui.component.one($element, {
            $text: $('<div>', {class: 'word'}).html(html),
        });

        return $element;
    },
    content: function (html) {

        var $element = $('<div>', {class: 'ui-article-content'});

        ui.component.one($element, {
            $section: $('<div>', {class: 'section'}).html(html),
        });

        return $element;
    }
})
