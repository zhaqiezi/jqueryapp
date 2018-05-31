ui.add('article', {
    i18n: ui.i18n('zh', {
        'ui-article-go-back': ''
    }),
    header: function (json) {
        return ui.component.one($('<div>', {class: 'ui-article-header'}), {
            $word: $('<span>', {class: 'span'}).i18n(json.input),
        }, json);
    },
    main: function (arr) {
        return $('<div>', {class: 'ui-article-main'}).html(arr);
    },
    block: function (json) {
        return ui.component.one($('<div>', {class: 'ui-article-block'}), {
            $header: ui.isNull(json.header) ? null : $('<div>', {class: 'header'}).i18n(json.header),
            $list: ui.isNull(json.list) ? null : $('<ul>', {class: 'list'}).html(json.list.map(function (item) {
                return $('<li>').i18n(item);
            })),
        }, json);
    },
    goBackBtn: function () {
        return $('<div>', {class: 'btn gray'}).i18n('返回上一页').on('click', window.history.back);
    },

})

