ui.component = $.extend(function (name, args) {
    var self = this.component;
    if (!ui.isNull(args)) {
        self.add(name, args);
    }
    return self.global[name];
}, {
    global: {}
}, {
    one: function ($element, config, args) {

        $.extend($element, config, args);

        var html = [];
        for (var $key in config) {
            if (args && args[$key]) {
                html.push(args[$key])
            } else {
                html.push(config[$key])
            }
        }

        $element.html(html);

        return $element;

    }
});


