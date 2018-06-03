'use strict'
ui.module('framework', {
    i18n: ui.i18n('zh', {
        'framework-a': 'A',
    }),

    component: {
        mindmapView: function () {
            return $('<iframe>', {
                class: 'framework-mindmap-view',
                src: 'http://naotu.baidu.com/file/d828e2d8879684b6599da338bf3d1d46?token=55b8d2f291e324cd',
            })
        }

    }

});



