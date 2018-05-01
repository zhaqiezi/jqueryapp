ui.json = $.extend(function () {
    var self = this.json;
    // 功能待定
}, {
    // 深度拷贝
    // 需要有指定字段的拷贝功能
    clone: function (obj, json) {
        if (ui.isArray(obj)) {
            return ui.array.clone(obj, json);
        }
        return $.extend(true, obj, json);
    },
    hasKey: function (obj, key) {
        if (hasOwnProperty.call(obj, key)) {
            return true;
        }
        for (var k in obj) {
            if (k === key) {
                return true;
            }
        }
        return false;
    },
    hasValue: function (obj, val) {
        var values = this.values(obj);
        return values.some(function (one) {
            return ui.isEqual(one, val);
        });
    },
    has: function (obj, json) {
        var rt = true;
        for (var key in json) {
            if (!ui.json.hasKey(obj, key)) {
                rt = false;
                break;
            }
            if (!ui.isEqual(obj[key], json[key])) {
                rt = false;
                break;
            }
        }
        return rt;
    },
    // 为了兼容safari和ios没有Object.values
    values: function (obj) {
        if (Object.values) {
            return Object.values(obj);
        }
        var rt = [];
        if (!ui.isJson(obj)) {
            return rt;
        }
        for (var k in obj) {
            var val = obj[k];
            rt.push(val);
        }
        return rt;
    }
});


