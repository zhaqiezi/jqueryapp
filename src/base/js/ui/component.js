ui.component = $.extend(function (name, args) {
    var self = this.component;
    if (!ui.isNull(args)) {
        self.add(name, args);
    }
    return self.global[name];
}, {
    global: {}
}, {
    one: function ($element, children, args) {
        var html;

        if (ui.isArray(args)) {
            html = args;
        } else {
            $.extend(children, args);

            html=[];
            for (var $el in children) {
                if (ui.isJquery(children[$el])) {
                    html.push(children[$el])
                }
            }
        }
        $element.html(html);

        return $element;

    }
});


