ui.add('article', {
    i18n: ui.i18n('zh', {
        'ui-article-go-back': '返回上一页'
    }),
    title: function (html) {
        return $('<div>', {class: 'ui-article-title'}).html(html);
    },
    content: function (html) {
        return $('<div>', {class: 'ui-article-content'}).html(html);
    },
    listWidthTitle: function (i18n) {
        var $element = $('<section>', {class: 'ui-article-list-width-title'}).html([
            $('<header>', {class: 'title'}).i18n(i18n, 0),

            $('<ul>', {class: 'ul'}).html([
                '<li></li>',
                '<li></li>',
                '<li></li>',
                '<li></li>',
                '<li></li>',
                '<li></li>',
                '<li></li>',
                '<li></li>',
                '<li></li>',
            ]),
        ])


        return $element;
    },
    goBackBtn: function () {

        var $element = $('<div>', {class: 'btn gray'}).i18n('ui-article-go-back').on('click', function () {
            alert(4);
        });
        return $element;
    },

})
// ui.component.one($element, {
//     $wrapper: $('<div>', {class: 'wrapper'}).html(html),
// });
