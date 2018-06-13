ui.i18n = $.extend(function (key, value) {
    var self = this.i18n;

    if (ui.isNull(key)) {
        return self.translate()
    } else {
        if (ui.isJquery(key)) {
            return self.translate(key);
        } else if (ui.isJson(value)) {
            return self.extend(key, value);
        } else {
            return self.get(key, value)
        }
    }
}, {
    state: {
        get lang() {
            if (!this._lang) {
                return 'zh';
            }
            return this._lang;
        },
        set lang(val) {
            this._lang = val;
            $('html').attr('lang', this._lang);
            ui.i18n.translate();
        }
    },
    config: {},
    init: function (lang) {
        var s = this.state;

        s.lang = lang;
        this.translate();
    },
    set: function (key, value, lang) {
        var c = this.config;

        lang = !lang ? s.lang : lang;

        c[lang][key] = value;
    },
    get: function (key, $element) {
        var c = this.config;
        var s = this.state;

        if (!ui.json.hasKey(c[s.lang], key)) {
            console.error('i18n error: ' + key + ' is not exist,language is ' + s.lang);
            return '';
        }

        var value = c[s.lang][key];

        if (ui.isFunction(value)) {
            value = value($element);
        } else if (ui.isString(value)) {
            // $$i18n$$ 这样引用另外一个语言标签
            value = value.replace(/\$\{([^${}]*)\}\$/g, function (match, p1) {
                return ui.i18n.get(p1);
            });
        }

        return value;
    },
}, {
    translate: function ($dom) {
        // 开始翻译，参数dom
        // 两种形式，单个字符串表示只替换html，属于多数情况，所以简写
        // 特殊情况如多部位替换，采用对象的格式
        // data-i18n="unknown" ,
        // data-i18n={ 'html': 'unknown', 'title': 'unknown' }
        // 或
        // $dom.data('i18n',"unknown"),
        // $dom.data('i18n',{ 'html': 'unknown', 'title': 'unknown' })
        //
        var self = this;
        var $element;
        if (!$dom) {
            $element = $('*');
        } else {
            translate($dom);
            $element = $dom.children();
        }

        $element.each(function () {
            translate($(this));
        });

        function translate($this) {
            var i18n = $this.data('i18n');
            if (!i18n) {
                return;
            }

            if (ui.isString(i18n)) {
                $this.html(self.get(i18n, $this));
            }
            if (ui.isJson(i18n)) {
                var html;
                for (var attr in i18n) {
                    var key = i18n[attr];
                    if (attr == 'html') {
                        html = self.get(key, $this);
                        $this.html(html);
                    } else if (attr == ui.component.key) {
                        var newconfig = {};
                        for (var uikey in key) {
                            var _i18n = key[uikey];
                            if (!ui.isString(_i18n)) {
                                newconfig[uikey] = key[uikey];
                                continue;
                            }
                            newconfig[uikey] = self.get(_i18n, $this);
                        }
                        $this.data(ui.component.key, newconfig);
                    } else {
                        html = self.get(key, $this);
                        $this.attr(attr, html);
                    }
                }
            }
        }

    },
    extend: function (lang, json) {
        var c = this.config;

        if (!c[lang]) {
            c[lang] = {};
        }

        for (var key in json) {
            this.set(key, json[key], lang);
        }
    }
});

$.fn.i18n = function (key, value) {
    if (key) {
        this.data({
            'i18n': key
        });
    }
    if (value) {
        ui.i18n(key, value);
    }
    ui.i18n.translate(this);
    return this;
}
