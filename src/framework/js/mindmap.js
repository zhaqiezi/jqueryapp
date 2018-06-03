ui.module('framework').add('mindmap', {
    i18n: ui.i18n('zh', {
        '/framework/mindmap': '框架结构脑图',

        'framework-mindmap-title': 'jQueryApp 结构脑图',
        'framework-mindmap-content': function () {
            return [
                ui('framework').mindmapView(),
                $('<div>', {class: "m32-tb"}).html([
                    '<a class="btn m32-r" href="/framework/plan">查看jQueryApp当前开发计划</a>',
                    ui('article').goBackBtn()
                ])
            ]

        }
    }),
    router: ui.router({
        title: '/framework/mindmap',
        path: '/framework/mindmap',
    }),
    routerEnd: function (location) {
        if (location.pathname !== this.router.path) {
            this.unmount();
            return false;
        }

        this.start();

    },
    start: function () {
        this.html();
        this.on();
    },
    html: function () {
        var c = this.config;

        c.$element = ui('home').module([
            ui('article').title('framework-mindmap-title'),
            ui('article').content('framework-mindmap-content'),
        ]);

        ui.module('home.body').mount(c.$element);
    },

    on: function () {
        var c = this.config;


    },

});