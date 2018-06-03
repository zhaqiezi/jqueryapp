ui.module('framework').add('plan', {
    i18n: ui.i18n('zh', {
        '/framework/plan': '开发计划',

        'framework-plan-header': '开发计划',
        'framework-plan-api-doc': function () {
            return [
                $('<div>', {class: 'f18 m16-tb'}).html('更新API文档'),
                ui('article').list({
                    header: '模块JS',
                    content: []
                }),

            ];

        },
        'framework-plan-api-test': function () {
            return [
                $('<div>', {class: 'f18 m16-tb'}).html('新功能测试及修复Bug'),
                ui('article').list({
                    header: [
                        '<p>问题收集及新功能的讨论请查看<a class="a p10-rl" href="https://github.com/pageborn/jqueryapp/issues" target="_blank">Github Issue</a></p>',
                        '<p>API在线测试及功能Demo演示请查看<a class="a p10-rl" href="https://codepen.io/jqueryapp/project/full/DBjkyd/" target="_blank">CodePen Test</a></p>'
                    ],
                    content: []
                    //
                }),

            ];

        },
    }),
    router: ui.router({
        title: '/framework/plan',
        path: '/framework/plan',
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
            ui('article').title('framework-plan-header'),
            $('<div>', {class: 'row row-one'}).html([
                $('<div>', {class: 'col6 col-half'}).html([
                    ui('article').content('framework-plan-api-doc'),
                ]),
                $('<div>', {class: 'col6 col-half'}).html([
                    ui('article').content('framework-plan-api-test'),
                ])

            ]),
            $('<div>', {class: "m32-tb"}).html([
                ui('article').goBackBtn()
            ]),
        ]).addClass('framework-plan-c');
        ui.module('home.body').mount(c.$element);
    },
    on: function () {
        var c = this.config;


    },

});