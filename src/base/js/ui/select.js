ui.select = function ($element, args) {
    var component = ui.component.get($element);
    if (args) {
        $.extend(component, args);
    }
    return component;
}

$.extend(ui.select, {
    i18: ui.i18n.merge('zh', {
        'ui-select-empty': '请选择',
        'ui-select-placeholder-search': '支持过滤查询',
        'ui-select-required': '不能为空，请选择',
        'ui-select-multiple': function ($element) {
            var str = '已选择 {length} 项';
            var json = $element.data('i18n-data');
            return ui.string.replaceWithJson(str, json)
        },
        'ui-select-searchinfo': function ($element) {
            var str = '当前有效 {valid} 项，过滤掉 {filt} 项， 一共 {length} 项';
            var json = $element.data('i18n-data');
            return ui.string.replaceWithJson(str, json)
        },
    }),
    config: {
        selector: '.ui-select',
        class: 'ui-select',
        theme: {
            arrow: 'i-chevron-down',
            close: 'i-close-circle',
        }
    },
    init: function ($element) {
        var self = this;
        var attr = ['required', 'multiple', 'value', 'status', 'theme', 'search', 'type'];
        var config = {
            $element: null,
            $header: null,
            $headerText: null,
            $content: null,
            $list: null,
            show: 'no',
            textValue: {
                text: 'text',
                value: 'value'
            },
            required: false,
            multiple: false,
            status: null,
            theme: null,
            search: false,
            searchValue: '',
            type: 'checklist', // 'tree'
            valueType: 'node', // 'tree' 返回的数据结构可以是数组的列表，也可以是树形结构
            placeholder: null,
            change: ui.emptyFunction,
            clear: function () {
                self.emptyValue(this);
                self.setActive(this);
            },
            active: function (value) {
                ui.component.get(this.$list).value = value;
                this._value = ui.component.get(this.$list)._value;
                self.setActive(this);
            },
            error: ui.emptyFunction,
            blur: function () {
                if (ui.isEmpty(this.value) && this.required) {
                    var $text = $('<span>').data({'i18n': 'ui-select-required'});
                    this.$headerText.html($text);

                    ui.component.setError(this);
                    this.error();
                }
                return this;
            },

            option: null,
            value: null,
        }
        if (ui.isJquery($element)) {
            ui.component.render.bind(this)($element, config, attr);
        }
    },
    render: function (component) {

        this.emptyValue(component);

        this.html(component);

        this.on(component);

    },
    html: function (component) {
        var self = this;
        var theme = this.config.theme;

        component.$headerText = $('<div>', {class: 'name'});
        component.$header = $('<div>', {class: 'header'}).html([
            component.$headerText,
            '<div class="icon"><i class="' + this.config.theme.arrow + '"></i></div>',
        ]);
        component.$searchInput = $('<input>', {
            class: 'input small',
            type: "text",
            placeholder: ui.i18n.getValue('ui-select-placeholder-search')
        }).data('i18n', {'placeholder': 'ui-select-placeholder-search'}).on('keyup', function () {
            component.searchValue = $(this).val();
            self.changeHtml(component);
        });
        component.$searchClose = $('<div>', {class: 'close'}).html('<i class="' + theme.close + '"></i>').on('click', function () {
            component.$searchInput.val('').focus();
            component.searchValue = '';
            self.changeHtml(component);
        });

        component.$searchInfo = $('<div>', {class: 'info'});

        component.$search = $('<div>', {class: 'search'}).html([
            component.$searchInput,
            component.$searchInfo,
            component.$searchClose
        ]);

        component.$list = $('<div>', {
            class: 'ui-' + component.type
        }).data(ui.component.key, {
            multiple: component.multiple,
            textValue: component.textValue,
            valueType: component.valueType,
            click: function (compo) {
                component._value = compo._value;
                self.setActive(component);
                component.change();
                if (!component.multiple) {
                    ui.component.setHide(component);
                }
            }
        });
        component.$content = $('<div>', {class: 'content'}).html(component.$list);
        component.$element.html([
            component.$header,
            $('<div>', {class: 'body'}).html([
                component.search ? component.$search : null,
                component.$content
            ])
        ]).attr({show: component.show});
    },
    on: function (component) {
        var self = this;

        Object.defineProperty(component, 'value', {
            get: function () {
                return ui.component.get(this.$list).value;
            },
            set: function (value) {
                component.active(value);
                component.change();
            },
            enumerable: true,
            configurable: true
        });

        Object.defineProperty(component, 'option', {
            get: function () {
                return component._option;
            },
            set: function (value) {
                component._option = value;
                self.changeHtml(component);
            },
            enumerable: true,
            configurable: true
        });

    },
    changeHtml: function (component) {
        var option = component._option;
        if (component.search) {
            option = component.optionSearch = this.searchFilter(component);
        }

        ui[component.type](component.$list).option = option;

        this.setActive(component);
    },
    searchFilter: function (component) {
        var reg = new RegExp(component.searchValue);
        return component._option.filter(function (one) {
            return reg.test(one[component.textValue.text]);
        });
    },
    emptyValue: function (component) {
        component._value = '';
        if (component.multiple) {
            component._value = [];
        }
    },
    setActive: function (component) {
        ui.select.setText(component);
        ui.component.setActive(component);
    },
    setText: function (component) {
        var _value = component._value;
        var i18n = 'ui-select-empty';

        if (component.placeholder) {
            i18n = component.placeholder;
        }
        var length = 0;
        if (!ui.isEmpty(_value)) {
            var value = _value;
            if (component.multiple) {
                length = _value.length;
                if (length > 1) {
                    i18n = 'ui-select-multiple';
                } else if (length == 1) {
                    value = _value[0];
                }
            } else {
                length = 1;
            }
            if (length == 1) {
                var one;
                var search = {};
                search[component.textValue.value] = value;
                var deep = component.type == 'tree' ? true : false
                one = ui.array.one(component._option, search, deep);
                component.$headerText.html(one[component.textValue.text]);
                return;
            }
        }

        var $text = $('<span>').data({
            'i18n': i18n,
            'i18n-data': {length: length}
        });
        component.$headerText.html($text);

        if (component.search) {
            var valid = component.optionSearch.length;
            var length = component._option.length;
            var $info = $('<span>').data({
                'i18n': 'ui-select-searchinfo',
                'i18n-data': {
                    valid: valid,
                    filt: length - valid,
                    length: length,
                }
            });
            component.$searchInfo.html($info);
        }
    },
    setShow: function (component) {
        $(ui.select.config.selector).not(component.$element).each(function () {
            ui.component.setHide($(this));
        });
        ui.component.setShow(component);
        component.$searchInput.focus();
    }
});

$.fn.html(ui.select.init.bind(ui.select));

$(document).on('click', ui.select.config.selector + '> .header', function () {
    var $select = $(this).parent();
    var component = ui.component.set($select);
    if (component.isDisable()) {
        return true;
    }

    if (component.isShow()) {
        ui.component.setHide(component);
    } else {
        ui.select.setShow(component);
    }
});

$(document).on('click', function (e) {
    var selector = ui.select.config.selector;
    if ($(e.target).closest(selector).length == 0) {
        $(selector).each(function () {
            ui.component.setHide($(this));
        });
    }
});
