ui.module('framework').add('introduce', {
    i18n: ui.i18n('zh', {
        '/framework/introduce': '框架介绍',

        'framework-introduce-target': 'jQueryApp 的设计初衷',
        'framework-introduce-welcome': '<p>前端中以页面为最终产出物的开发，涉及到PC界面，移动界面，单页面应用，nodejs与webkit相结合的应用程序界面，已有较多页面新特性的要求。</p>' +
        '<p>特性涉及到的技术包括样式，布局，图标，表单组件，交互组件，动效，路由，JS新语法，工程化流程等等，' +
        '所表现出来的跨界，混编，引入其他语言成熟的框架模式，都在推高对前端开发模式的要求。</p>' +
        '<p>其中以数据驱动视图就是一种重要的新的设计模式，与传统模式相比，新模式强调构建内在机制，非常重视对数据的监听，引入组件生命周期，虚拟DOM对比等特性，' +
        '让数据与视图建立了单向或者双向的关联，弱化了直接操作DOM元素的环节，让界面的变得更加智能。</p>' +
        '<p>Angular,Vue,React是这种新模式的代表者（简称三大框架），jQuery则是传统模式的代表者（它依然定位于工具）。新旧模式的对比是开发模式的对比，得从各自的配套工具，开发效率，最终页面效果等维度对比，' +
        '但就现状来说，拿三大框架的全家桶与只集成几项核心工具的jQuery做对比，是有失公平的，因为jQuery本身就没做Nodejs开发模式的衍生，也没有单页面的路由，没有数据监听机制等核心功能。</p>' +
        '<p>如果一定要比较，那么jQuery输在为什么没能做起全家桶式的Nodejs开发，为什么曾经盛极一时的jQuery插件生态体系如今垂暮，为什么官方配套的jQuery UI 和 jQuery Mobile无法展开对新页面特性的开发。</p>' +
        '<br>我个人觉得原因有三：其一是当时jQuery已成为大众产品，而三大框架属于小众产品，而且新模式直接避开DOM元素操作，另辟蹊径一开始与jQuery形成互补，在不断强调内在机制构建的时候，通过Nodejs（这个强大的后端语言）建立起自己的语法解析功能，实现了能够对代码的进行二次逻辑重构的过程，实现了完美的弯道超车。' +
        '秉承jQuery的优良特性，"write less do more"的理念是无法拒绝的，Html5和Css3能配合出非常棒的页面效果，' +
        'Nodejs及其相关工具已是前端工程化的核心组件，' +
        '' +
        '都将前端的设计模式要求推向了新的高度，',
        'framework-introduce-feature': 'jQueryApp' +
        'jQueryApp的设计初衷依然是"write less do more", ' +
        '并将这条准则的范围扩大到了视图组件，交互效果和应用性能这三大方面，期望达到针对场景的应用，更容易的视图切换和效果组合',

    }),
    router: ui.router({
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

        c.$element = ui('home').module([
            ui('article').title($('<span>', {class: 'span'}).data('i18n', 'framework-introduce-target')),
            ui('article').content($('<div>', {class: 'm16-tb'}).data('i18n', 'framework-introduce-welcome')),
        ]);

        ui.module('home.body').mount(c.$element);
    },

    on: function () {
        var c = this.config;


    },

});