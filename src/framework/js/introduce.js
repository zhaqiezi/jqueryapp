ui.module('framework').add('introduce', {
    i18n: ui.i18n('zh', {
        '/framework/introduce': '框架介绍，设计初衷',

        'framework-introduce-title': 'jQueryApp 的设计初衷',
        'framework-introduce-content': function () {
            return [
                ui('article').block({
                    header: '序（丑话写在前头）',
                    content: [
                        '<p>鉴于写一个框架不是一个人能为之，有必要交代一下本人的技术背景，实属不想装逼：草根，拳乱无章法，糊口生计，一直工作在技术岗位第一线，至今仍未有机会和能力走向管理岗位，勤于开发业务，坑于造轮子，多数坑只挖不填（含不会填），没有进过大厂，也未能带好小团队，技术涉猎面小，缺少设计模式经验，缺少与大神交流的经验。</p>',
                        '<p>本框架的设计产出实属开发总结，一家之谈且较为碎片化，本意尽量做到中肯表述，如有词不达意，井蛙之见，高谈阔论的地方还请海涵，框架中虽有许多特性优化，但仍未通过项目验证（进行中），不建议其他人将其用于生产环境。欢迎讨论交流，推动框架走向成熟。</p>',
                    ]
                }),
                ui('article').block({
                    header: '投石问路，抛砖引玉',
                    content: [
                        '<p>前端开发以页面为最终产出物，涉及到PC界面，移动界面，单页面应用，nodejs与webkit相结合的应用程序界面，有较多应用场景的特性要求。</p>',
                        '<p>特性涉及到的技术包括样式，布局，图标，表单，组件，动效，路由，缓存，新语法，工程化等方面，所表现出来的跨界，混编，引入其他语言的框架模式，都在推高对前端开发模式的要求。</p>',
                        '<p>其中以数据驱动视图就是一种重要的新的设计模式，与传统模式相比，新模式强调构建内在关联机制，非常重视对数据的监听，引入生命周期，虚拟DOM树等特性，让数据与视图建立了单向或者双向的关联，弱化了直接操作DOM元素的环节，让界面的变动变得更加智能。</p>',
                    ]
                }),
                ui('article').block({
                    content: [
                        '<p>Angular，Vue，React是这种新模式的代表者（简称三大框架），jQuery则是传统模式的代表者（它依然定位于工具）。新旧模式的对比是开发模式的对比，' +
                        '从各自的配套工具，开发效率，最终页面效果等维度进行对比，就现状来说，拿三大框架的全家桶与只集成几项核心功能的jQuery相比，有失公平，就像拿一辆汽车和一台发动机相比一样。</p>',
                        '<p>如果一定要比较，那么jQuery输在为什么没做基于Nodejs的衍生开发模式，没做单页面的路由，没做数据监听，为什么曾经盛极一时的jQuery插件生态体系如今垂暮，' +
                        '为什么官方配套的jQuery UI和jQuery Mobile用的人那么少！</p>',
                    ]
                }),
                ui('article').block({
                    header: '个人觉得jQuery落后的原因有三：',
                    content: [
                        '<p>其一是竞品领先的原因：当时jQuery已成为大众产品，能力越大责任越大，保持稳定是维持繁荣的首要保障，而三大框架属于小众产品，变革的动力和阻力差别很大，并且新模式不再以事件驱动为指导，避其锋芒，直接避开了DOM元素事件和操作，另辟蹊径以数据驱动为指导，' +
                        '初期与jQuery形成互补，后续在不断强调健壮内在机制，通过Nodejs（这个强大的后端语言）建立起自己的语法解析功能，实现了能够对代码进行二次重构，在技法上超越了jQuery。</p>',
                        '<p>其二是使用者主动放弃的原因：jQuery语法简洁，选择器效率高，事件绑定方便，自身对象可与DOM对象无缝转换，还有其他实用强大的API，更重要的是对浏览器的兼容性好，对插件的扩展性也好，这样其他功能的插件便在jQuery的基础上百花齐放。' +
                        '优点有时候也会成为缺点，从使用者的角度看，存在标准不一的问题，又爱又恨呐，单就jQuery核心说，因为有官方团队在维护，所以API标准是存在的，但插件就不一样了，社区活跃，功能效果相同的插件往往有好几个可选，一个含一种设计模式，一种API传参规则，实有选择困难。',
                        '插件的品质有赖于个人开发者的水平和能否持续地维护。前端开发者往往准备一套满意的UI库需要几种独立的插件来组合，这对开发者和团队来说，组件标准不一，记忆成本大，跨项目跨团队合作时问题突出。</p>',
                        '<p>其三是时代的不可抗力：学习的经验告诉我们应该善于尝试新的东西，平和地接受旧事物的消亡，加上一些商业推文的影响，技术栈就这样发生着更迭。基于Nodejs的开发方式，至少在前端工具上表现出来的高效率是无法拒绝的。' +
                        '传统开发方式在存量上保有一定的惯性，但随着浏览器的更新，兼容性问题解决了，新的ECMAScript语法的更新，新的代码写法出现了，老代码即使功能稳定，也会因为不满足代码规范而出局。此外三大框架带来各自的较为完整的UI组件库，在效果上协调统一，样式上美观时尚，甩了jQuery松散的UI插件几条街，这点吸引了众多视觉设计师和产品经理。</p>',
                    ]
                }),
                ui('article').block({
                    header: 'jQuery坚守核心功能，路在何方？',
                    content: [
                        '<p>从jQuery官方保守的态度来说，大神们面对开发者多次追问未来规划的时候，略带忧伤的镇静，我个人还是相信他们是有远见的。</p>',
                        '<p>从一直被模仿，有时被超越的jQuery众多特性来说，链式操作是非常犀利且极具美感的对象化操作理念。</p>',
                        '<p>从各大技术栈的最终产出物依然是页面来说，页面的解析在浏览器里，浏览器里遵守W3C标准，回归执行层面，还是浏览器事件和DOM操作，大家殊途同归。</p>',
                        '<p>从开发效率上说，实在没有动力去学习另一种相同功用，思路却完全不同的开发模式，这好比请西餐师傅做中餐一样。</p>',
                        '<p>jQuery的便捷性和扩展性至今其他框架无出其右，简单就是强大的最好理由，有理由相信底层越简单，上层逻辑才能搞得越复杂。</p>',
                        '<p>jQuery只需改良，完成SPA场景特性，改进UI组件效果，甄选插件，靠拢Nodejs开发方式，那么曾经的“不会原生JS也能写出漂亮的交互”是真的，现在“不会三大框架也能写出漂亮的App”也会是真的。</p>',
                    ]
                }),
                ui('article').block({
                    header: 'jQueryApp做出的努力：',
                    content: [
                        '<p>要改良哪些，要吸收新模式的哪些新特性，才能让开发者继续觉得简单又好用？</p>',
                        '<p>个人觉得jQuery技术栈应该增强以下几点：</p>'
                    ],
                    list: [
                        '基于Nodejs开发，使用相关工具',
                        '基于视觉和交互设计开发，产出美观动感',
                        '基于组件化开发，具有高复用性',
                        '基于数据开发，支持数据监听，以数据驱动视图',
                        '支持单页面应用（SPA）特性，含路由和组件生命周期',
                        '支持分离特定场景，满足该场景下的重要指标',
                    ]
                }),
                ui('article').block({
                    content: [
                        '<p>jQueryApp建议从项目立项，方案选型，技术预演，开发测试都应该遵循一定的设计规范，明确评审指标，让需求方和开发方建立稳固的沟通基础，认同现有的开发结果，清晰未来的开发计划。</p>',
                        '<p>jQueryApp协助实现这一良性的开发循环，从交互理论，代码效率，网络加载，页面性能等方面提供可参考的指标，期望达到良好的产出：</p>',
                        ui('article').block({
                            list: [
                                '丰富的界面表现层',
                                '简洁的代码逻辑层',
                                '模块化的项目结构',
                            ]
                        }).addClass('inside green'),
                        '<p>jQueryApp秉承jQuery工具化的思路，为避免框架越做越大出现复杂耦合且臃肿的缺点，会将每一个函数功能和组件对象定位为可替换的接口，尽量做到明确每个功能，每个对象的输入/输出，初始/销毁，赋值/取值等使用方式，简化其被调用或扩展的方式，从而贯彻并实施 <label class="font green">write less do more</label> 的重要理念。</p>',
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
            this.unMount();
            return false;
        }
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


    },

});