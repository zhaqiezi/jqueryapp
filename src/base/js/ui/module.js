ui.module = $.extend(function (name, args) {
    var self = this.module;
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
            i18n: false,
            router: false,
            routerStart: ui.emptyFunction,
            routerEnd: ui.emptyFunction,
            mount: ui.emptyFunction,
            unmount: ui.emptyFunction,
            init: function () {
                var s = this.state;

                // 模块初始化
                if (s.initCallbacks.fired()) {
                    return false;
                }

                s.initCallbacks.fire();
                this.initEnd();

            },
            initEnd: ui.emptyFunction,
            addInit: function (fn) {
                var s = this.state;

                s.initCallbacks.add(fn);
            },
            start: function () {
                // 模块被使用
                this.startCallbacks.fire();

                this.startEnd();
            },
            startEnd: ui.emptyFunction,
            addStart: function (fn) {
                var s = this.state;

                s.startCallbacks.add(fn);
            },

        }, args, {
            state: $.extend({
                initCallbacks: $.Callbacks('once unique'),
                startCallbacks: $.Callbacks('unique')
            }, args.state),
            config: $.extend({
                space: space,
                module: space.split('.')[0],
                $element: null,
            }, args.config),
            $$parent: {},
            $$children: {},
            children: function (name) {
                return name ? this.$$children[name] : this.$$children;
            },
            add: function (name, module) {
                var c = this.config;

                var space = c.space + '.' + name;
                module = ui.module(space, module);
                module.$$parent = this;

                // 回传给父级，挂载此自组件，以便使用
                this.$$children[name] = module;

                this.addInit(module.init.bind(module));

            },
            mount:function($html){
                var c = this.config;

                if (c.$wrapper) {
                    c.$wrapper.html($html);
                }
            },
            unmount:function(){
                var c = this.config;

                if (c.$element) {
                    c.$element.remove();
                }
            },
            isMounted: function ($html) {
                var c = this.config;

                $html = !$html ? c.$element : $html;

                return $.contains(document.documentElement, $html);
            }

        });

        ui.router.addStart(g[space].routerStart.bind(g[space]));
        ui.router.addEnd(g[space].routerEnd.bind(g[space]));

        return g[space];
    }
});


