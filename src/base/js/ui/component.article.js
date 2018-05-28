ui.add('article', {
    i18n: ui.i18n('zh', {
        'article-btn-go-back': '返回上一页'
    }),
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
    },
    goBackBtn: function () {
        return $('<div>', {class: 'btn gray'}).i18n('article-btn-go-back').click(window.history.back);
    },

})
