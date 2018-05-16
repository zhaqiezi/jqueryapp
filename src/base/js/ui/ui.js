'use strict'

var ui = $.extend(function (name, args) {
    if (!ui.isNull(args)) {
        ui.add(name, args);
    }
    return ui.global[name];
}, {
    global: {},
    version: '{{version}}',
    emptyFunction: new Function(),
}, {
    add: function (space, args) {
        var g = this.global;

        if (!g[space]) {
            g[space] = {};
        }

        $.extend(g[space], args);

        return g[space];
    },


});

