$.extend(ui, {
    isEmpty: function (obj) {
        if (ui.isNull(obj) || (ui.isNumber(obj) && isNaN(obj))) {
            return true;
        }
        if (ui.isString(obj)) {
            return obj.length === 0;
        }
        if (ui.isArray(obj)) {
            return obj.length === 0;
        }
        if (ui.isJson(obj)) {
            return ui.isEmptyJson(obj);
        }
        return false;
    },
    isEmptyArray: function (obj) {
        return ui.isArray(obj) && obj.length === 0;
    },
    isNull: function (obj) {
        var rt = Object.prototype.toString.call(obj);
        return rt === '[object Null]' || rt === '[object Undefined]';
    },
    isArray: Array.isArray,
    isJson: function (obj) {
        return $.isPlainObject(obj);
    },
    isEmptyJson: function (obj) {
        return $.isEmptyObject(obj);
    },
    isDom: function (obj) {
        return !!(obj && obj.nodeType === 1);
    },
    isJquery: function (obj) {
        return obj instanceof $;
    },
    isNumeric: function (obj) {
        return !isNaN(parseFloat(obj));
    },

    isFile: $.extend(function (str, arr) {
        if (!ui.isString(str)) {
            return false;
        }
        // 这里换成url解析的方式
        str = str.split('?').shift();
        var ext = str.substr(str.lastIndexOf('.') + 1).toLowerCase();
        for (var one in arr) {
            if (ext == arr[one]) {
                return true;
            }
        }
        return false;
    }, {
        worker: function (arr) {
            return function (str, ext) {
                arr = ext ? ext : arr;
                return ui.isFile(str, arr);
            }
        }
    }),
    isReg: $.extend(function (str, reg) {
        return reg.test(str);
    }, {
        worker: function (reg) {
            return function (str, exp) {
                reg = exp ? exp : reg;
                return ui.isReg(str, reg);
            }
        }
    }),
    isEqual: $.extend(function (a, b) {
        return ui.isEqual.worker(a, b);
    }, {
        worker: function (a, b, aStack, bStack) {
            if (a === b) {
                return a !== 0 || 1 / a === 1 / b;
            }
            if (a == null || b == null) {
                return a === b
            }
            if (a !== a) {
                return b !== b
            }

            var type = Object.prototype.toString.call(a);
            if (type !== Object.prototype.toString.call(b)) {
                return false
            }
            if (type === '[object Function]') {
                return false;
            }
            switch (type) {
                case '[object RegExp]':
                case '[object String]':
                    return '' + a === '' + b;
                case '[object Date]':
                case '[object Boolean]':
                    return +a === +b;
                case '[object Number]':
                    if (+a !== +a) {
                        return +b !== +b
                    }
                    return +a === 0 ? 1 / +a === 1 / b : +a === +b;
            }

            aStack = aStack || [];
            bStack = bStack || [];
            var length = aStack.length;
            while (length--) {
                if (aStack[length] === a) {
                    return bStack[length] === b;
                }
            }
            aStack.push(a);
            bStack.push(b);
            if (type === '[object Array]') {
                length = a.length;
                if (length !== b.length) {
                    return false;
                }
                while (length--) {
                    if (!ui.isEqual.worker(a[length], b[length], aStack, bStack)) {
                        return false;
                    }
                }
            } else if (type === '[object Object]') {
                var keys = Object.keys(a), key;
                length = keys.length;
                if (Object.keys(b).length !== length) {
                    return false;
                }
                while (length--) {
                    key = keys[length];
                    if (!(ui.json.hasKey(b, key) && ui.isEqual.worker(a[key], b[key], aStack, bStack))) {
                        return false;
                    }
                }
            }
            aStack.pop();
            bStack.pop();
            return true;
        }
    }),

});

// 根据本模块的配置批量挂载方法
(function () {
    
    var config = {
        type: ['Boolean', 'Date', 'Function', 'Object', 'Number', 'String', 'RegExp'],
        file: {
            'Image': ['png', 'gif', 'jpg', 'jpge'],
            'Css': ['css'],
            'Js': ['js']
        },
        regExp: {
            'Url': /^((http(s)?|ftp)?\:\/\/)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,
            'Email': /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])+$/
        }
    };

    config.type.forEach(function (key) {
        ui['is' + key] = function (obj) {
            return Object.prototype.toString.call(obj) === '[object ' + key + ']';
        }
    });

    $.each(config.file, function (key, value) {
        ui['is' + key] = ui.isFile.worker(value);
    });

    $.each(config.regExp, function (key, value) {
        ui['is' + key] = ui.isReg.worker(value);
    });


})();
