ui.module('framework').add('feature', {
    i18n: ui.i18n('zh', {
        '/framework/feature': '框架已实现的特性',

        'framework-feature-title': 'jQueryApp 已实现的特性',
        'framework-feature-content': '<section>' +
        '<header>使用jQuery</header>' +
        '<ul>' +
        '<li>使用jQuery 3.3.1版本，保有官方所有特性</li>' +
        '<li>使用$.Deferred</li>' +
        '<li>使用$.Callbacks</li>' +
        '<li>改写源码$()环节，提升性能</li>' +
        '<li>改写源码$.fn.html()环节，增加订阅，组件化jQuery对象</li>' +
        '<li>改写源码$.ajax环节，支持获取xhr对象</li>' +
        '<li>使用$(tag, attr).html(arr)格式进行对象化</li>' +
        '<li>依然支持jQuery系列插件</li>' +
        '<li>依然支持JS原生语法插件</li>' +
        '</ul>' +
        '</section>' +
        '<section>' +
        '<header>使用Less</header>' +
        '<ul>' +
        '<li>使用less语法，对象化写样式</li>' +
        '<li>使用全局颜色参数配置</li>' +
        '<li>使用全局单位参数配置</li>' +
        '<li>使用mixins</li>' +
        '<li>按模块隔离样式</li>' +
        '<li>样式名称使用语义化短单词</li>' +
        '<li>样式以class叠加的方式为主</li>' +
        '<li>样式以原子类样式为辅助</li>' +
        '<li>样式以attr属性变更参与js逻辑</li>' +
        '<li>复用组件样式</li>' +
        '</ul>' +
        '</section>' +
        '<section>' +
        '<header>支持单页面应用（SPA）</header>' +
        '<ul>' +
        '<li>支持SPA生命周期</li>' +
        '<li>支持SPA路由</li>' +
        '<li>支持路由的订阅和广播</li>' +
        '<li>支持路由下的多语言</li>' +
        '<li>支持路由下的原生history操作</li>' +
        '<li>支持路由规则404</li>' +
        '<li>支持路由URL与模块的关联配置</li>' +
        '<li>支持路由正则</li>' +
        '<li>支持多页面共享sessionStorage</li>' +
        '</ul>' +
        '</section>' +
        '<section>' +
        '<header>支持模块化</header>' +
        '<ul>' +
        '<li>支持模块异步加载，含模块自己的样式</li>' +
        '<li>支持模块之间依赖加载</li>' +
        '<li>支持模块撤销</li>' +
        '<li>模块通过ui.module()构建</li>' +
        '<li>子模块通过ui.module().add()构建</li>' +
        '<li>支持模块上追加路由</li>' +
        '<li>支持模块上追加多语言</li>' +
        '<li>支持模块上追加组件</li>' +
        '</ul>' +
        '</section>' +
        '<section>' +
        '<header>基于Nodejs开发</header>' +
        '<ul>' +
        '<li>面向Nodejs的JS使用ES6语法</li>' +
        '<li>面向浏览器的JS使用ES5语法</li>' +
        '<li>使用gulp系列工具，可定义开发流程中的事件</li>' +
        '<li>单列出npm指令，gulp指令，推荐使用webStorm编辑器</li>' +
        '<li>分模块开启文件监听</li>' +
        '<li>文件监听使用缓存</li>' +
        '<li>打包是对资源文件的整合</li>' +
        '<li>打包到dist目录</li>' +
        '<li>打包改写URL加文件hash</li>' +
        '<li>发布到publish目录</li>' +
        '<li>发布支持多环境参数配置</li>' +
        '</ul>' +
        '</section>' +
        '<section>' +
        '<header>使用ui命名的基础工具库</header>' +
        '<ul>' +
        '<li>ui.ajax 简化接口，增强功能，包括统一时机设置Request Header，缓存Response数据，处理错误码，获取上传进度等等</li>' +
        '<li>ui.array 补充数组型操作，提供一些常见的数据查询，转换，赋值，和参数是数据块类型的方法/li>' +
        '<li>ui.component 添加界面UI组件，是组件化开发的关键设计</li>' +
        '<li>ui.date 补充日期型操作，提供一些常见的时间加减，格式化，取值等方法</li>' +
        '<li>ui.is* 补充多种格式判断，空值空类型的判断，对象全等判断</li>' +
        '<li>ui.i18n 支持国际化多语言特性</li>' +
        '<li>ui.json 补充JSON格式数据的操作</li>' +
        '<li>ui.number 补充数字型操作</li>' +
        '<li>ui.module 支持模块化特性，内含SPA生命周期等规则</li>' +
        '<li>ui.position 提供简易的方法处理界面元素绝对定位，相对定位，动态定位等问题</li>' +
        '<li>ui.require 支持模块异步加载，依赖加载特性</li>' +
        '<li>ui.string 补充字符型，提供简易的方法处理数据替换，拼接，生成</li>' +
        '<li>ui.router 支持SPA路由，路由订阅，优雅的链接形式，提供状态管理，载入新模块，404等功能</li>' +
        '<li>ui.watch 支持数据驱动视图特性，可对Json,Array类型数据监听，支持原生方法变动，支持追加或解绑监听回调</li>' +
        '</ul>' +
        '</section>' +
        '<section>' +
        '<header>使用ui命名的元素组件</header>' +
        '<ul>' +
        '<li>ui.checkbox 对应原生checkbox，对象化，简易取值和赋值</li>' +
        '<li>ui.checklist 单选或多选的列表，简易取值和赋值</li>' +
        '<li>ui.cover 遮罩层，绝对或相对位置遮罩，自动处理多交互遮罩冲突</li>' +
        '<li>ui.datepicker 日历选择，支持单面板，多面板</li>' +
        '<li>ui.dialog 对话框</li>' +
        '<li>ui.dropdown 关联拉下的弹出层</li>' +
        '<li>ui.input 对应原生的input</li>' +
        '<li>ui.menu 菜单是界面最常见的组件之一，提供高亮等简易方法</li>' +
        '<li>ui.pagination 分页，简易取值和赋值，事件回调</li>' +
        '<li>ui.popper 基础的弹出层</li>' +
        '<li>ui.radio 对应原生的radio，简易取值和赋值</li>' +
        '<li>ui.select 对应原生select，简易取值和赋值，只是下拉树形</li>' +
        '<li>ui.switch 切换按钮，简易取值和赋值</li>' +
        '<li>ui.tip 提示信息，支持多种状态样式和位置</li>' +
        '<li>ui.tooltip 对应原生元素的title</li>' +
        '<li>ui.tree 树形列表，支持单选和多选，简易取值和赋值，支持多种取值的数据格式</li>' +
        '<li>ui.upload 文件上传，支持进度显示，取消和错误提示</li>' +
        '</ul>' +
        '</section>' +
        '<div class="m32-tb"><a class="btn" href="/framework/mindmap">查看jQueryApp脑图</a></div>',

    }),
    router: ui.router({
        title: '/framework/feature',
        path: '/framework/feature',
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
            ui('article').title($('<span>', {class: 'span'}).data('i18n', 'framework-feature-title')),
            ui('article').content($('<div>', {class: 'm16-tb'}).data('i18n', 'framework-feature-content')),
        ]);

        ui.module('home.body').mount(c.$element);
    },

    on: function () {
        var c = this.config;


    },

});