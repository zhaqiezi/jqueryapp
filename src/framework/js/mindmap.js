ui.module('framework').add('mindmap', {
    i18n: ui.i18n('zh', {
        '/framework/mindmap': '框架已实现的特性',

        'framework-mindmap-title': 'jQueryApp 长期计划',
        'framework-mindmap-content': '<section>' +

        '</section>' +
        '<div class="m32-tb"><a class="btn" href="/framework/plan">查看jQueryApp当前开发计划</a></div>',

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
            ui('article').title($('<span>', {class: 'span'}).data('i18n', 'framework-mindmap-title')),
            ui('article').content($('<div>', {class: 'm16-tb'}).data('i18n', 'framework-mindmap-content')),
        ]);

        ui.module('home.body').mount(c.$element);
    },

    on: function () {
        var c = this.config;


    },

});