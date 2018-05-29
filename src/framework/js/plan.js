ui.module('framework').add('plan', {
    i18n: ui.i18n('zh', {
        '/framework/plan': '开发计划',

        'framework-plan-title': '开发计划',
        'framework-plan-content': [
            $('<section>').html([
                $('<header>').html([
                    '完善多语言机制'
                ]),
                $('<ul>').html([
                    '<li>需要先确定机制和规则</li>',
                ]),
            ]),
        ],
        'framework-plan-i18n': ['完善多语言机制',[
            '需要先确定机制和规则',

        ]],
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
            ui('article').title($('<span>', {class: 'span'}).data('i18n', 'framework-plan-title')),
            ui('article').content($('<div>', {class: 'm16-tb'}).data('i18n', 'framework-plan-content')),
        ]);
        ui.module('home.body').mount(c.$element);
    },
    on: function () {
        var c = this.config;


    },

});