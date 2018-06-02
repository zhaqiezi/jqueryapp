ui.add('article', {
    i18n: ui.i18n('zh', {
        'ui-article-go-back': '返回上一页'
    }),
    title: function (i18n) {
        return $('<div>', {class: 'ui-article-title'}).i18n(i18n);
    },
    content: function (i18n) {
        return $('<div>', {class: 'ui-article-content'}).i18n(i18n);
    },
    header: function (i18n) {
        return $('<div>', {class: 'ui-article-header'}).i18n(i18n);
    },
    block: function (json) {
        return ui.component.one($('<div>', {class: 'ui-article-block'}), {
            $header: ui.isNull(json.header) ? null : $('<div>', {class: 'header'}).html(json.header),
            $content: ui.isNull(json.content) ? null : $('<div>', {class: 'content'}).html(json.content),
            $list: ui.isNull(json.list) ? null : $('<ul>', {class: 'ul'}).html(json.list.map(function (html) {
                return $('<li>').html(html);
            })),
        }, json);
    },
    list: function (json) {
        return ui.component.one($('<div>', {class: 'ui-article-list'}), {
            $header: ui.isNull(json.header) ? null : $('<div>', {class: 'header'}).html(json.header),
            $list: ui.isNull(json.content) ? null : $('<ul>', {class: 'ul'}).html(json.content.map(function (html) {
                return $('<li>').html(html);
            })),
        }, json);
    },
    goBackBtn: function () {
        return $('<div>', {class: 'btn gray'}).i18n('ui-article-go-back').on('click', function () {
            window.history.back();
        });
    },

})

