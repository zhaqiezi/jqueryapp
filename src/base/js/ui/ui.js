'use strict'

var ui = $.extend(new Function(), {
    global: {},
    version: '{{version}}',
    emptyFunction: new Function(),
}, {
    add: function (space, args) {
        var g = this.global;

        g[space] = $.extend({}, args, {});


        return g[space];
    },
    render:function(){}
});

