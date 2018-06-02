ui.module('framework').add('plan', {
    i18n: ui.i18n('zh', {
        '/framework/plan': '开发计划',

        'framework-plan-header': '开发计划',
        'framework-plan-content': function () {
            return [
                ui('article').list({
                    header: '完善多语言机制',
                    content: [
                        '需要先确定机制和规则',
                    ]
                }),
                $('<div>', {class: "m32-tb"}).html([
                    ui('article').goBackBtn()
                ]),
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
            ui('article').content('framework-plan-content'),
        ]);
        ui.module('home.body').mount(c.$element);
    },
    on: function () {
        var c = this.config;


    },

});