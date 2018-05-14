ui.module('framework').add('introduce', {
    i18n: ui.i18n('zh', {
        '/framework/introduce': '框架介绍'
    }),
    router: ui.router({
        i18n: true,
        title: '/framework/introduce',
        path: '/framework/introduce',
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

        c.$element = $('<div>', {class: "module"}).html([
            c.$wrapper = $('<div>', {class: "wrapper"}).html([
                ui('title.theme',{

                })
            ])
        ]);
        ui.module('home.body').mount(c.$element);
    },
    htmlTitle:function() {
        // return $html;
        // $html.mount()  指定一个.html的容器
    },
    on: function () {
        var c = this.config;


    },

});