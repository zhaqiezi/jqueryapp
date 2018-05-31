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
        var $html = $([]);

        if (ui.isArray(args)) {
            $html = args;
        } else if (ui.isJson(args)) {
            $.extend(children, args);
        }

        for (var key in children) {
            var $ele = children[key];
            if (ui.isJquery($ele)) {
                $.merge($html, $ele);
            }
        }
        $element.html($html);

        return $element;

    }
});


