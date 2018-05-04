ui.require = $.extend(function () {
    var self = this.require;
    self.init.apply(self, arguments);
}, {
    global: {},
    i18: ui.i18n('zh', {
        'ui-require-error': '抱歉，组件加载失败，点击确定按钮可刷新页面！',
    }),
    config: {},
    init: function () {
        var g = this.global;
        var completeFnIndex = -1;
        var progressFnIndex = -1;
        var keys = [];
        var _keys;
        var files;

        //先处理此次进度有可能添加的新配置
        this.add(Array.prototype.slice.call(arguments));

        for (var i = 0; i < arguments.length; i++) {
            if (ui.isFunction(arguments[i])) {
                if (completeFnIndex == -1) {
                    completeFnIndex = i;
                } else {
                    progressFnIndex = i;
                }
            } else {
                //arguments[i]: string/array/object
                var key = this.keys(arguments[i]);
                keys = keys.concat(key);
            }
        }

        if (completeFnIndex == -1) {
            return;
        }

        _keys = keys.join(',');
        // 将多层级归为同级
        files = this.files(keys);

        if (!g[_keys]) {
            g[_keys] = {
                done: this.dones(files),
                files: files,
                completeFn: [arguments[completeFnIndex]],
                progressFn: []
            }
            if (progressFnIndex != -1) {
                // 放置每个_keys各自的progressFn
                g[_keys].progressFn.push(arguments[progressFnIndex]);
            }
        } else {
            // 已存在相同的初始keys
            if (g[_keys].done === true) {
                arguments[completeFnIndex]();
            } else {
                if (g[_keys].completeFn) {
                    g[_keys].completeFn.push(arguments[completeFnIndex]);
                }
                return;
            }
        }

        this.promise(keys, 0);
    },
    add: function (config) {
        var c = this.config;
        if (ui.isArray(config)) {
            configIsArray(config);
        } else if (ui.isString(config)) {
            configIsArray(config.split(','));
        } else if (ui.isJson(config)) {
            for (var key in config) {
                var file = config[key];
                if (ui.isString(file)) {
                    if (ui.isJs(file) || ui.isCss(file)) {
                        c[key] = file.split(',');
                        if (!c[file]) {
                            c[file] = c[key];
                        }
                    }
                }
                if (ui.isArray(file)) {
                    c[key] = valueIsArray(file);
                }
                if (ui.isJson(file)) {
                    console.error('Error: Config JSON Object can not contain JSON Object');
                }
            }
        } else if (ui.isFunction(config)) {
            return;
        }

        for (var key in c) {
            if (!checkConfig(c[key])) {
                delete c[key];
            }
        }

        function configIsArray(value) {
            for (var i in value) {
                var file = value[i];
                if (ui.isString(file)) {
                    if (ui.isJs(file) || ui.isCss(file)) {
                        if (!c[file]) {
                            c[file] = file.split(',');
                        }
                    }
                } else {
                    ui.require.add(file);
                }
            }
        }

        function valueIsArray(value) {
            var files = [];
            for (var i in value) {
                var file = value[i];
                if (ui.isString(file)) {
                    ui.require.add(file);
                    files.push(file);
                }
                if (ui.isArray(file)) {
                    files.push(valueIsArray(file));
                }
                if (ui.isJson(file)) {
                    files.push(valueIsJson(file));
                }
            }
            return files;
        }

        function valueIsJson(value) {
            ui.require.add(value);
            var keys = [];
            for (key in value) {
                keys.push(key);
            }
            return keys;
        }

        function checkConfig(value) {
            for (var i in value) {
                var config = value[i];
                if (ui.isString(config)) {
                    if (!c[config]) {
                        value.splice(i, 1);
                    }
                }
                if (ui.isArray(config)) {
                    if (!checkConfig(config)) {
                        value.splice(i, 1);
                    }
                }
            }
            return value.length;
        }
    },
    keys: function (args) {
        var c = this.config;
        var rt = [];
        if (ui.isString(args)) {
            add(args);
        } else if (ui.isArray(args)) {
            for (var i in args) {
                var key = args[i];
                if (!ui.isString(key)) {
                    // 数组或对象
                    var _rt = this.keys(key);
                    if (_rt.length > 0) {
                        rt.push(_rt);
                    }
                } else {
                    add(key);
                }
            }
        } else if (ui.isJson(args)) {
            for (var key in args) {
                add(key);
            }
        }

        function add(k) {
            if (c[k]) {
                rt.push(k);
            }
        }

        return rt;
    },
    files: function (keys) {
        var c = this.config;
        var rt = [];
        for (var i in keys) {
            var key = keys[i];
            var config = c[key];
            // 不在配置表中
            if (!config) {
                continue;
            }
            for (var j in config) {
                var one = config[j];
                if (ui.isString(one)) {
                    if (ui.isJs(one) || ui.isCss(one)) {
                        rt.push(one);
                    } else {
                        if (c[one]) {
                            rt = rt.concat(this.files([one]));
                        }
                    }
                }
                if (ui.isArray(one)) {
                    rt = rt.concat(this.files(one));
                }
            }
        }

        return ui.array.unique(rt);
    },
    promise: function (resolveKeys, resolveIndex) {
        var g = this.global;
        var key, _key;
        var parentKeys = resolveKeys.join(',');
        // 循环体结束
        if (resolveKeys.length <= resolveIndex) {
            g[parentKeys].done = true;
            if (g[parentKeys].completeFn.length > 0) {
                g[parentKeys].completeFn[0]();
                g[parentKeys].completeFn.shift();
            }
            return;
        }
        key = resolveKeys[resolveIndex];
        if (ui.isString(key)) {
            key = key.split(',');
        }

        _key = key.join(',');
        if (!g[_key]) {
            var files = this.files(_key.split(','))
            g[_key] = {
                done: this.dones(files),
                files: files,
                completeFn: []
            }
        }
        if (g[_key].done === true) {
            this.promise(resolveKeys, ++resolveIndex);
            return;
        }
        for (var i in key) {
            var perkey = key[i];
            var _perkey = perkey;
            if (ui.isArray(perkey)) {
                _perkey = perkey.join(',');
            }
            if (!g[_perkey]) {
                var files = this.files(_perkey.split(','))
                g[_perkey] = {
                    done: this.dones(files),
                    files: files,
                    completeFn: []
                }
            }
            if (g[_perkey].done === true) {
                g[_key].done += g[_perkey].files.length;
                this.done.call(this, _perkey, key, resolveKeys, resolveIndex);
                continue;
            }
            if (ui.isArray(perkey)) {
                var hasChild = false
                perkey.forEach(function (v) {
                    if (ui.isArray(v)) {
                        hasChild = v;
                    }
                });
                if (hasChild) {
                    var args = ui.array.clone(perkey);
                    args.push(ui.emptyFunction);
                    ui.require.apply(this, args);
                } else {
                    this.resolve(_perkey, perkey, resolveKeys, resolveIndex);
                }
            } else {
                this.resolve(_perkey, key, resolveKeys, resolveIndex);
            }
        }
    },
    resolve: function (_perkey, key, resolveKeys, resolveIndex) {
        var g = this.global;
        var c = this.config;
        if (!c[_perkey]) {
            var perkeys = _perkey.split(',');
            c[_perkey] = [];
            for (var k = 0; k < perkeys.length; k++) {
                c[_perkey] = c[_perkey].concat(c[perkeys[k]]);
            }
        }
        var hasChild = false;
        c[_perkey].forEach(function (v, i) {
            if (!ui.isString(c[_perkey][i])) {
                hasChild = c[_perkey][i];
            }
        });

        if (hasChild) {
            ui.require(c[_perkey], function () {
                ui.require.done.apply(ui.require, [_perkey, key, resolveKeys, resolveIndex].slice());
            });
        } else {
            for (var i = 0, ii = c[_perkey].length; i < ii; i++) {
                var url = c[_perkey][i];
                // 已存在请求，且请求完成，终止
                if (g[url] && g[url].done === true) {
                    this.done.call(this, _perkey, key, resolveKeys, resolveIndex);
                    continue;
                }
                // 已存在请求，但请求未完成，追加完成回调函数，终止
                if (g[url] && g[url].completeFn.length > 0) {
                    g[url].completeFn.push([_perkey, key, resolveKeys, resolveIndex].slice());
                }
                if (ui.isCss(url) || ui.isJs(url)) {
                    if (!g[url]) {
                        var files = this.files(url.split(','));
                        g[url] = {
                            done: this.dones(files),
                            files: files,
                            completeFn: []
                        }
                    } else {
                        if (g[url].done === true) {
                            continue;
                        }
                    }
                    if (g[url].completeFn.length == 0) {
                        g[url].completeFn.push([_perkey, key, resolveKeys, resolveIndex].slice());
                    }
                    if (ui.isCss(url)) {
                        var link = document.createElement('link');
                        link.href = link.url = url;
                        link.rel = 'stylesheet';
                        document.head.appendChild(link);
                        if (!this.linkSupportOnLoad()) {
                            ui.require.loaded(url);
                        } else {
                            link.onload = function () {
                                ui.require.loaded(this.url);
                            }
                            link.onerror = function () {

                            }
                        }
                    }
                    if (ui.isJs(url)) {
                        var script = document.createElement('script');
                        script.src = script.url = url;
                        script.type = 'text/javascript';
                        script.onload = function () {
                            ui.require.loaded(this.url);
                        }
                        script.onerror = function () {
                            ui.require.error(this.url);
                        }
                        document.head.appendChild(script);
                    }
                } else {
                    ui.require(url, function () {
                        ui.require.done.apply(ui.require, [_perkey, key, resolveKeys, resolveIndex].slice());
                    });
                }
            }
        }
    },
    linkSupportOnLoad: function () {
        // 为了兼容Safari对link标签没有onload事件
        var userAgent = navigator.userAgent;
        if (userAgent.indexOf("Safari") != -1 && userAgent.indexOf("Chrome") == -1) {
            return false;
        }
        return true;
    },
    loaded: function (url) {
        var g = this.global;
        g[url].done = true;
        for (var key in g) {
            var one = g[key];
            if (ui.array.has(one.files, url)) {
                if (one.done !== true) {
                    one.done++;
                }
                if (one.progressFn) {
                    for (var j = 0; j < one.progressFn.length; j++) {
                        one.progressFn[j](one.done, one.files.length);
                    }
                }
            }
        }
        while (g[url].completeFn.length > 0) {
            var data = g[url].completeFn.shift();
            if (ui.isFunction(data)) {
                data();
            } else {
                this.done.apply(this, data);
            }
        }
    },
    done: function (_perkey, key, resolveKeys, resolveIndex) {
        var g = this.global;
        var _key = key.join(',');

        var parentKeys = resolveKeys.join(',');
        if (g[parentKeys].done === true) {
            return;
        }
        if (g[_perkey].done !== true && g[_perkey].done < g[_perkey].files.length) {
            return false;
        }
        // 组件加载完成
        g[_perkey].done = true;
        while (g[_perkey].completeFn.length > 0) {
            var data = g[_perkey].completeFn.shift();
            if (ui.isFunction(data)) {
                data();
            } else {
                this.done.apply(this, data);
            }
        }
        var done = true;
        for (var i = 0; i < key.length; i++) {
            var k = key[i];
            if (!g[k] || g[k].done !== true) {
                done = false;
            }
        }
        if (done === true) {
            g[_key].done = true;
            while (g[_key].completeFn.length > 0) {
                var data = g[_key].completeFn.shift();
                if (ui.isFunction(data)) {
                    data();
                } else {
                    this.done.apply(this, data);
                }
            }
            this.promise(resolveKeys, ++resolveIndex);
        }
    },
    dones: function (files) {
        var g = this.global;
        var rt = 0;
        for (var k in g) {
            for (var i in files) {
                if (files[i] == k && g[k].done === true) {
                    rt++;
                }
            }
        }
        return rt;
    },
    error: function (msg) {
        msg = ui.i18n('ui-require-error') + '<br>' + msg;
        ui.dialog.error(msg, function () {
            window.location.reload();
        })
    }
}, {
    has: function (id) {
        return this.config[id] !== undefined;
    },
    isDone: function (id) {
        if (this.global[id] !== undefined) {
            return this.global[id].done;
        }
        return false;
    }
});