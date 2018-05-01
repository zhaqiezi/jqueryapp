ui.string = {
    random: function (num) {
        var str = 'abcdefghijklnmopqrstuvwxyz0123456789_';
        var max = str.length - 1;
        var rt = '';
        var i;
        while (num) {
            i = ui.number.random(0, max);
            rt += str[i];
            num--;
        }
        return rt;
    },
    uuid: function () {
        var str = new Date().getTime().toString() + 'xyx';
        return str.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },
    setParam: function (json, preff) {
        if (!preff) {
            preff = '';
        }
        var rt = [];
        for (var k in json) {
            rt.push(k.toString() + '=' + encodeURIComponent(json[k].toString()));
        }
        return preff + rt.join('&');
    },
    getParam: function (url) {
        var rt = {};
        if (!url) {
            return rt;
        }
        var str = url ? url.split('?').pop() : window.location.search.substring(1);
        if (!str) {
            return rt;
        }

        var arr = str.split('&');
        arr.forEach(function (one) {
            var index = one.indexOf('=');
            var key = one.substr(0, index);
            var value = decodeURIComponent(one.substr(index + 1));
            rt[key] = value;
        });
        return rt;
    },
    numberUnit: function (str) {
        var arr = str.match(/(\d*\.?\d+)(\w+|%)/);
        return {number: Number(arr[1]), unit: arr[2]}
    },
    replaceWithJson: function (str, json) {
        if (!ui.isJson(json)) {
            return str;
        }
        return str.replace(/\{([^{}]*)\}/g, function (match, p1) {
            if (ui.isNull(json[p1])) {
                console.error('ui.string.replaceWithJson error:' + str + ', param[' + p1 + '] is not exist.');
            }
            return json[p1];
        });
    }
}