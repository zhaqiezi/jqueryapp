ui.module('framework').add('introduce', {
    i18n: ui.i18n('zh', {
        '/framework/introduce': '框架介绍',

        'framework-introduce-target': 'jQueryApp 的设计初衷',
        'framework-introduce-welcome': '<section>' +
        '<p>前端中以页面为最终产出物的开发，涉及到PC界面，移动界面，单页面应用，nodejs与webkit相结合的应用程序界面，已有较多页面新特性的要求。</p>' +
        '<p>特性涉及到的技术包括样式，布局，图标，表单组件，交互组件，动效，路由，JS新语法，工程化流程等等，' +
        '所表现出来的跨界，混编，引入其他语言成熟的框架模式，都在推高对前端开发模式的要求。</p>' +
        '<p>其中以数据驱动视图就是一种重要的新的设计模式，与传统模式相比，新模式强调构建内在机制，非常重视对数据的监听，引入组件生命周期，虚拟DOM对比等特性，' +
        '让数据与视图建立了单向或者双向的关联，弱化了直接操作DOM元素的环节，让界面变得更加智能。</p>' +
        '</section><section>' +
        '<p>Angular，Vue，React是这种新模式的代表者（简称三大框架），jQuery则是传统模式的代表者（它依然定位于工具）。新旧模式的对比是开发模式的对比，得从各自的配套工具，开发效率，最终页面效果等维度对比，' +
        '但就现状来说，拿三大框架的全家桶与只集成几项核心工具的jQuery做对比，是有失公平的，因为jQuery本身就没做Nodejs开发模式的衍生，没有单页面的路由，没有数据监听等功能。</p>' +
        '<p>如果一定要比较，那么jQuery输在为什么没能做起全家桶式的Nodejs开发，为什么曾经盛极一时的jQuery插件生态体系如今垂暮，为什么官方配套的jQuery UI和jQuery Mobile无法展开对新页面特性的开发。</p>' +
        '</section>' +
        '<header>个人觉得jQuery落后的原因有三：</header>' +
        '<section>' +
        '<p>其一是竞品领先的原因：当时jQuery已成为大众产品，能力越大责任越大，保持稳定是维持繁荣的首要保障，而三大框架属于小众产品，变革的动力和阻力差别很大，并且新模式不再以事件驱动为指导，直接避开DOM元素操作，避其锋芒另辟蹊径以数据驱动为指导，' +
        '初期与jQuery形成互补，后续在不断强调健壮内在机制，通过Nodejs（这个强大的后端语言）建立起自己的语法解析功能，实现了能够对代码进行二次重构，在技法上超越了jQuery。</p>' +
        '<p>其二是使用者主动放弃的原因：jQuery语法简洁，选择器效率高，事件绑定方便，自身对象可与DOM对象无缝转换，还有其他实用强大的API，更重要的是对浏览器的兼容性好，对插件的扩展性也好，这样其他功能的插件便在jQuery的基础上百花齐放。' +
        '优点有时候也会成为缺点，从使用者的角度看，存在标准的问题，单就jQuery核心说，因为有官方团队在维护，所以API标准是存在的，但插件就不一样了，存在选择困难，社区活跃，人人都可以潜心学习然后造一套轮子，含一种设计模式，一种API接口模式，' +
        '插件的品质有赖于个人开发者的水平和能否持续地维护。前端开发者往往准备一套满意的UI库是需要几种独立的插件组合，这对开发者和团队来说，组件标准不一，记忆成本大，跨项目跨团队合作时问题突显。</p>' +
        '<p>其三是时代的不可抗力：学习的经验告诉我们应该尝试下新的东西，接受旧事物的消亡，加上一些商业推文的影响，技术栈就这样发生着更迭。基于Nodejs的开发方式，至少在前端工具上表现出来的高效率是无法拒绝的。传统开发方式在存量上保有一定的惯性，jQuery在某些场景下也是最佳选择，' +
        '浏览器的更新虽没太激进，但兼容性问题基本上解决了，三大框架较为完整和统一的UI组件库，在效果上也更为美观协调，更迭在持续，但也不是必须和激烈的，只是从jQuery官方保守的态度来说，jQuery技术栈要有接受被淘汰的准备。</p>' +
        '</section>' +
        '<header>基于优点，做出的改变：</header>',
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