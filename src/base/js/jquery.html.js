;(function () {
    var fnHtml = $.fn.html;
    var fnAppend = $.fn.append;
    var fnPrepend = $.fn.prepend;
    var callbacks = $.Callbacks();

    // jquery里面的.html关联到.append，当插入值是字符时，直接使用innerHTML；当值是jquery对象时，使用.append
    // .prepend与.append保持独立
    // 所以这里的注入操作需要传入jquery object才能生效

    $.fn.html = function (value) {
        if ($.isFunction(value)) {
            callbacks.add(value);
            return;
        }
        var rt = fnHtml.apply(this, arguments);
        return rt;
    }

    $.fn.append = function () {
        var rt = fnAppend.apply(this, arguments);
        if (ui.isJquery(arguments[0])) {
            callbacks.fire(arguments[0]);
        }
        return rt;
    }

    $.fn.prepend = function () {
        var rt = fnPrepend.apply(this, arguments);
        if (ui.isJquery(arguments[0])) {
            callbacks.fire(arguments[0]);
        }
        return rt;
    }

})();