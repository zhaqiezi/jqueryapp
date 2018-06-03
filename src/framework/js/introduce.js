ui.module('framework').add('introduce', {
    i18n: ui.i18n('zh', {
        '/framework/introduce': '框架介绍，设计初衷',

        'framework-introduce-title': 'jQueryApp 的设计初衷',
        'framework-introduce-content': function () {
            return [
                ui('article').block({
                    content: [
                        '<p>前端中以页面为最终产出物的开发，涉及到PC界面，移动界面，单页面应用，nodejs与webkit相结合的应用程序界面，已有较多页面新特性的要求。</p>',
                        '<p>特性涉及到的技术包括样式，布局，图标，表单组件，交互组件，动效，路由，JS新语法，工程化流程等等，所表现出来的跨界，混编，引入其他语言成熟的框架模式，都在推高对前端开发模式的要求。</p>',
                        '<p>其中以数据驱动视图就是一种重要的新的设计模式，与传统模式相比，新模式强调构建内在机制，非常重视对数据的监听，引入组件生命周期，虚拟DOM对比等特性，让数据与视图建立了单向或者双向的关联，弱化了直接操作DOM元素的环节，让界面变得更加智能。</p>',
                    ]
                }),
                ui('article').block({
                    content: [
                        '<p>Angular，Vue，React是这种新模式的代表者（简称三大框架），jQuery则是传统模式的代表者（它依然定位于工具）。新旧模式的对比是开发模式的对比，' +
                        '得从各自的配套工具，开发效率，最终页面效果等维度对比，但就现状来说，拿三大框架的全家桶与只集成几项核心工具的jQuery做对比，是有失公平的，因为jQuery本身就没做Nodejs开发模式的衍生，' +
                        '没有单页面的路由，没有数据监听等功能。</p>',
                        '<p>如果一定要比较，那么jQuery输在为什么没能做起全家桶式的Nodejs开发，为什么曾经盛极一时的jQuery插件生态体系如今垂暮，' +
                        '为什么官方配套的jQuery UI和jQuery Mobile无法展开对新页面特性的开发。</p>',
                    ]
                }),
                ui('article').block({
                    header: '个人觉得jQuery落后的原因有三：',
                    content: [
                        '<p>其一是竞品领先的原因：当时jQuery已成为大众产品，能力越大责任越大，保持稳定是维持繁荣的首要保障，而三大框架属于小众产品，变革的动力和阻力差别很大，并且新模式不再以事件驱动为指导，直接避开DOM元素操作，避其锋芒另辟蹊径以数据驱动为指导，',
                        '初期与jQuery形成互补，后续在不断强调健壮内在机制，通过Nodejs（这个强大的后端语言）建立起自己的语法解析功能，实现了能够对代码进行二次重构，在技法上超越了jQuery。</p>',
                        '<p>其二是使用者主动放弃的原因：jQuery语法简洁，选择器效率高，事件绑定方便，自身对象可与DOM对象无缝转换，还有其他实用强大的API，更重要的是对浏览器的兼容性好，对插件的扩展性也好，这样其他功能的插件便在jQuery的基础上百花齐放。' +
                        '优点有时候也会成为缺点，从使用者的角度看，存在标准的问题，单就jQuery核心说，因为有官方团队在维护，所以API标准是存在的，但插件就不一样了，社区活跃，功能效果相同的插件往往有好几个可选，一个含一种设计模式，一种API参数模式，存在选择困难。',
                        '插件的品质有赖于个人开发者的水平和能否持续地维护。前端开发者往往准备一套满意的UI库是需要几种独立的插件组合，这对开发者和团队来说，组件标准不一，记忆成本大，跨项目跨团队合作时问题突显。</p>',
                        '<p>其三是时代的不可抗力：学习的经验告诉我们应该尝试下新的东西，接受旧事物的消亡，加上一些商业推文的影响，技术栈就这样发生着更迭。基于Nodejs的开发方式，至少在前端工具上表现出来的高效率也是无法拒绝的。' +
                        '传统开发方式在存量上保有一定的惯性，jQuery在某些场景下也是最佳选择，浏览器的更新虽没太激进，但兼容性问题基本上解决了，jQuery能满足兼容性的需求消失了。此外三大框架带来各自的较为完整的UI组件库，在效果上协调统一，样式上美观时尚，甩了jQuery松散的UI插件几条街，这点吸引了视觉设计师和产品经理的好感。</p>',
                    ]
                }),
                ui('article').block({
                    header: '保有核心优点，做出改变：',
                    content: [
                        '<p>从jQuery官方保守的态度来说，大神们如此镇静，不可能是完全的束手无策。</p>',
                        '<p>jQuery的链式操作是非常犀利且极具美感的对象化操作理念。</p>',
                        '<p>当前各大技术栈的最终产出物依然是页面，页面的解析依然是在浏览器里，浏览器里遵守W3C标准，所以回归原生，大家殊途同归。</p>',
                        '<p>在DOM操作，事件绑定上，jQuery依然保持在扩展性和便捷性方面无出其右。</p>',
                        '<p>既然在应用场景上没有本质的不适用，那么改良就是最好的出路。</p>',
                    ]
                }),
                ui('article').block({
                    header: 'jQueryApp做出的努力：',
                    content:[
                        '<p>要改良哪些，要吸收新模式的哪些新特性，才能让开发者继续觉得简单又好用？</p>',
                        '<p>个人觉得jQuery应该增强这四点：</p>'
                    ],
                    list: [
                        '基于Nodejs开发，使用相关工具',
                        '基于视觉和交互来开发UI组件化，美观动感，可高复用',
                        '基于数据驱动视图，引入视图生命周期和数据监听',
                        '支持分离特定场景，快速组合相应的应用技术',
                    ]
                }),
                ui('article').block({
                    content: [
                        '<p>jQueryApp立足前端开发的的基本工作，为了能更好地开发出符合需求的网页，我们建议从项目立项，方案选型，技术预演，开发测试都应该遵循一定的设计规范，明确评审指标，让需求方和开发方建立稳固的沟通基础，认同现有的开发结果，清晰未来的开发计划。</p>',
                        '<p>jQueryApp协助实现这一良性的开发循环，从交互理论，代码效率，网络加载，页面性能等方面提供可参考的指标，期望达到良好的产出：</p>',
                        ui('article').block({
                            list: [
                                '丰富的界面表现层',
                                '简洁的代码逻辑层',
                                '模块化的项目结构',
                            ]
                        }).addClass('inside green'),
                        '<p>jQueryApp秉承jQuery工具化的理念，尽量做到明确每个功能，每个对象的输入，输出，初始，销毁，赋值，取值等重要环节，简化调用，继续彰显 <label class="font green">write less do more</label> 的澎湃活力。</p>',
                    ]
                }),
                $('<div>', {class: "m32-tb"}).html([
                    '<a class="btn m32-r" href="/framework/feature">查看jQueryApp已实现的特性</a>',
                    ui('article').goBackBtn()
                ]),
            ]
        },
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
            ui('article').title('framework-introduce-title'),
            ui('article').content('framework-introduce-content'),
        ]);

        ui.module('home.body').mount(c.$element);
    },

    on: function () {
        var c = this.config;


    },

});