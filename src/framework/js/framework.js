'use strict';
ui.module('framework', {
    i18n: ui.i18n('zh', {
        '/framework': '开发计划',

        'framework-header': '开发计划',
        'framework-api-doc': function () {
            return [
                $('<div>', {class: 'f18 m16-tb'}).html('更新API文档'),
                ui('article').block({
                    header: '2018-06-07 模块JS',
                    content: [
                        '<div class="font red"><i class="i-frown-o p8-r"></i><span class="word">计划完成文档界面布局和常规功能</span></div>'
                    ]
                }),

            ];

        },
        'framework-api-test': function () {
            return [
                $('<div>', {class: 'f18 m16-tb'}).html('新功能测试及修复Bug'),
                ui('article').list({
                    header: [
                        '<div><labe class="label p10-r">问题收集及新功能的讨论请查看</labe><a class="a p10-r" href="https://github.com/pageborn/jqueryapp/issues" target="_blank">Github Issue</a></div>',
                        '<div><labe class="label p10-r">API在线测试及功能Demo演示请查看</labe><a class="a p10-r" href="https://codepen.io/jqueryapp/project/full/DBjkyd/" target="_blank">CodePen Test</a></div>'
                    ],
                    content: []
                    //
                }),

            ];

        },
    }),
    router: ui.router({
        title: '/framework',
        path: '/framework',
    }),
    routerEnd: function (location) {
        if (location.pathname !== this.router.path) {
            this.unMount();
            return false;
        }
        this.html();
        this.on();
    },
    html: function () {
        var c = this.config;

        c.$element = ui('home').module([
            ui('article').title('framework-header'),
            $('<div>', {class: 'row row-one'}).html([
                $('<div>', {class: 'col6 col-half'}).html([
                    ui('article').content('framework-api-doc'),
                ]),
                $('<div>', {class: 'col6 col-half'}).html([
                    ui('article').content('framework-api-test'),
                ])

            ]),
            $('<div>', {class: "m16-t"}).html([
                ui('article').goBackBtn()
            ]),
        ]).addClass('framework-c');
        ui.module('home.body').mount(c.$element);
    },
    on: function () {


    },
    component: {


    }

});



