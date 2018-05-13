ui.menu = $.extend(function () {
    var self = this.array;
    // 功能待定
}, {
    active: function ($menu, url, query, attr) {

        query = !query ? 'a' : query;
        attr = !attr ? 'href' : attr;

        $menu.find(query).each(function () {
            var val = $(this).attr(attr);

            if (url === val) {
                $(this).attr('state', 'active');
            } else {
                $(this).attr('state', '');
            }
        });
    }
});