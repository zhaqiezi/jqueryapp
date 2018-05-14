ui.component = $.extend(function (name, args) {
    var self = this.component;
    if (!ui.isNull(args)) {
        self.add(name, args);
    }
    return self.global[name];
}, {
    global: {}
}, {
    add: function (space, args) {
        var g = this.global;

        g[space] = $.extend({


        }, args, {


        });

        ui.router.addStart(g[space].routerStart.bind(g[space]));
        ui.router.addEnd(g[space].routerEnd.bind(g[space]));

        return g[space];
    },
});


