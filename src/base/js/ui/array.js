ui.array = $.extend(function () {
    var self = this.array;
    // 功能待定
}, {
    // 深度拷贝
    clone: function (obj, arr) {
        if (ui.isJson(obj)) {
            return ui.json.clone(obj, arr);
        }
        return $.extend(true, obj, arr);
    },
    jsonPart: function (obj, key) {
        var rt = [];
        obj.forEach(function (one) {
            var val = one[key];
            if (ui.isObject(val)) {
                val = ui.array.clone(val);
            }
            if (ui.isString(key)) {
                rt.push(val);
            } else if (ui.isArray(key)) {
                var json = {};
                key.forEach(function (k) {
                    val = one[k];
                    if (ui.isObject(val)) {
                        val = ui.array.clone(val);
                    }
                    json[k] = val;
                });
                rt.push(json);
            }
        });
        return rt;
    },
    // 返回元素：数组的第一个元素
    first: function (obj) {
        return obj.slice().shift();
    },
    // 返回元素：数组的最后一个元素
    last: function (obj) {
        return obj.slice().pop();
    },
    // 返回数组：删除数组中某个元素，该元素可为string/number/array/json，当为array时，删除全等的array数组并遍历数组里的元素也进行删除
    del: function (obj, val) {
        var rt = [];
        for (var i in obj) {
            if (!ui.isEqual(obj[i], val)) {
                rt.push(obj[i]);
            }
        }
        if (ui.isArray(val)) {
            for (var k in val) {
                rt = ui.array.del(rt, val[k]);
            }
        }
        return rt;
    },
    // 返回数组：去除数组中重复或null值的元素
    unique: function (obj) {
        var rt = ui.array.clone(obj);
        var i, ii, k;
        for (i = 0, ii = rt.length; i < ii; i++) {
            for (k = i + 1; k < ii; k++) {
                if (ui.isEqual(rt[i], rt[k])) {
                    rt.splice(k, 1);
                    i--;
                    ii--;
                }
            }
        }
        return rt;
    },
    // 返回布尔：判断数组是否包含某个元素,返回true/false，此包含关系是“元素全等包含”
    has: function (obj, val) {
        if (typeof val != 'object') {
            return obj.indexOf(val) == -1 ? false : true;
        } else {
            for (var one in obj) {
                if (ui.isEqual(one, val)) {
                    return true;
                }
            }
            return false;
        }
    },
    // 返回数组：返回包含了指定值string/number/array/json的元素的新的数组集合，此包含关系指定值与元素“不需要全等匹配”
    // 例如 var obj = ["a","ab",["a","ab"],["b","abc"],{"a":"ab"},{"a":"ab","b":"abc"}];
    //   ui.array.contain(obj,{"a":"ab"}) --> [{"a":"ab"},{"a":"ab","b":"abc"}]
    //   ui.array.contain(obj,{"a":"ab","b":"ab"}) --> []
    //   ui.array.contain(obj,["ab","a"]) --> [["a","ab"]]
    //   ui.array.contain(obj,["ab","b"]) --> []
    //   ui.array.contain(obj,"ab") --> ["ab",["a","ab"]]
    contain: function (obj, val, deep) {
        var rt = [];
        var type = ui.isArray(val) ? 'array' : ui.isJson(val) ? 'json' : '';
        for (var i in obj) {
            var a = true;
            if (ui.isJson(obj[i])) {
                if (type != 'json') {
                    continue;
                }
                a = ui.json.has(obj[i], val);

                // 只找出最底部一层
                if (deep) {
                    for (var k in obj[i]) {
                        if (ui.isJson(obj[i][k]) || ui.isArray(obj[i][k])) {
                            var _rt = ui.array.contain(obj[i][k], val, deep);
                            if (_rt.length > 0) {
                                return _rt;
                            }
                        }
                    }
                }
            } else if (ui.isArray(obj[i])) {
                if (type == 'json') {
                    continue;
                }
                if (type == 'array') {
                    for (var k in val) {
                        if (!ui.array.has(obj[i], val[k])) {
                            a = false;
                            break;
                        }
                    }
                } else {
                    a = ui.array.has(obj[i], val);
                }
            } else {
                a = ui.isEqual(obj[i], val);
            }
            if (a) {
                rt.push(obj[i]);
            }
        }
        return rt;
    },
    // 返回元素：返回ui.array.contain(obj, val)数组中第一个元素，如果一个元素都没有，则返回空字符串""
    one: function (obj, val, deep) {
        var rt = ui.array.contain(obj, val, deep);
        if (rt.length == 0) {
            return "";
        }
        return rt[0];
    },
    // 返回数组：找出两个数组之间的交集(相同的元素)，找不到则返回空数组
    // common=false是找出差集，在A中，但不在B中，都不在B中则返回A的全部
    common: function (objA, objB, common) {
        common = common == null ? true : false;
        var rt = [];
        objA.forEach(function (val) {
            if (ui.array.has(objB, val) === common) {
                rt.push(val);
            }
        });
        return rt;
    },
    // 数组内部随机排列
    shuffle: function (obj) {
        var rt = ui.array.clone(obj);
        var index, b;
        for (var i = rt.length - 1; i >= 0; i--) {
            index = Math.floor(Math.random() * (i + 1));
            b = rt[index];
            rt[index] = rt[i];
            rt[i] = b;
        }
        return rt;
    }
});