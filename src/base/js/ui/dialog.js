ui.dialog = function (args) {
    return this.dialog.init(args);
}
$.extend(ui.dialog, {
    global: {},
    i18: ui.i18n('zh', {
        'ui-dialog-sure': '确定',
        'ui-dialog-cancel': '取消',
    }),
    config: {
        selector: '.ui-dialog',
        class: 'ui-dialog',
        theme: {
            alert: 'icon i-alert-triangle',
            success: 'icon i-check-circle',
            error: 'icon i-close-circle',
            confirm: 'icon i-pause-circle',
            close: 'i-close-circle',
            sure: 'btn theme',
            cancel: 'btn'
        },
    },
    init: function (args) {
        var config = {
            $element: null,
            $container: null,
            $header: null,
            $body: null,
            $footer: null,
            $btn: null,
            $ghost: null,
            $title: null,
            $close: null,
            $html: null,
            title: '',
            theme: 'dialog',
            position: {
                of: null,
                my: 'center middle',
                at: 'center middle',
                collision: 'flip flip'
            },
            animate: {
                show: 'zoomIn',
                hide: 'fadeOutUpBig'
            },

            cover: true,
            drag: true,

            callback: ui.emptyFunction,
            remove: ui.emptyFunction,
            sure: false,
            cancel: false
        }

        var theme = this.config.theme;

        var id = config.id = args.id ? args.id : ui.string.random(10);
        var g = this.global[id] = {};
        $.extend(g, config, args);

        if (!g.$container) {
            g.$container = $('body');
            if (!g.theme) {
                g.theme = 'dialog fixed';
            }
        } else {
            if (!g.theme) {
                g.theme = 'dialog';
            }
            if (!ui.isJquery(g.$container)) {
                g.$container = $(g.$container);
            }
        }
        if (!g.position.of) {
            g.position.of = g.$container;
        }

        if (!g.btn) {
            g.btn = [];
            if (g.sure) {
                g.btn.push({
                    attr: {
                        name: 'sure',
                        class: theme.sure,
                    },
                    html: ui.i18n.getValue('ui-dialog-sure'),
                    callback: ui.isFunction(g.sure) ? g.sure : ui.dialog.remove.bind(this)
                });
            }
            if (g.cancel) {
                g.btn.push({
                    attr: {
                        name: 'cancel',
                        class: theme.cancel,
                    },
                    html: ui.i18n.getValue('ui-dialog-cancel'),
                    callback: ui.isFunction(g.cancel) ? g.cancel : ui.dialog.remove.bind(this)
                });
            }
        }

        this.html(g);
        this.on(g);

        return g
    },
    html: function (g) {
        var theme = this.config.theme;

        if (!ui.isEmpty(g.btn)) {
            g.$btn = $([]);
            g.btn.forEach(function (one) {
                $.merge(g.$btn, $('<div>', one.attr).html(one.html).on('click', function () {
                    if (one.callback.bind(g)(g) === true) {
                        ui.dialog.remove(g.id);
                    }
                }));
            });
        }


        if (g.title !== false) {
            g.$close = $('<div>', {class: 'close'}).html($('<i>', {class: theme.close}));
            g.$title = $('<div>', {class: 'title'}).html(g.title);

            g.$header = $('<div>', {class: 'header'}).html([
                g.$title,
                g.$close
            ]);
        }

        g.$body = $('<div>', {class: 'content'});
        g.$footer = $('<div>', {class: 'foot'});
        g.$element = $('<div>', {
            class: this.config.class,
            theme: g.theme
        }).html([
            g.$header,
            g.$body.html([
                g.$html
            ]),
            g.$footer.html([
                g.$btn
            ])
        ]);
        g.component = ui.component.init(g.$element, {});

        g.$container.append(g.$element);
        this.show(g);
    },
    on: function (g) {
        if (g.$close) {
            g.$close.click(function () {
                if (ui.isFunction(g.cancel)) {
                    if (g.cancel(g) === false) {
                        return false;
                    }
                }
                ui.dialog.remove(g);
                return false;
            });
        }

        if (g.drag && g.$title) {
            var dragOption = {
                $element: g.$ghost,
                $handle: g.$title,
                $container: g.$container,
                start: function () {
                    var dimension = ui.position.getDimensions(g.$element);
                    g.$ghost.css($.extend(dimension, dimension.offset)).show();
                },
                stop: function () {
                    g.$ghost.hide();
                    g.$element.css(this.css);
                }
            }
            ui.drag(dragOption);
        }
    },
    show: function (g) {
        if (g.position) {
            g.$element.position(g.position);
        }
        ui.component.setShow(g.component);

        if (g.animate) {
            g.$element.one(ui.config.animationEnd, function () {
                if (g.component.isShow()) {
                    g.callback();
                    g.$element.removeClass(g.animate.show);
                }
            });
            g.$element.addClass(g.animate.show);
        } else {
            g.callback();
        }

        g.$ghost = $('<div>', {
            class: this.config.class + '-ghost',
            theme: g.theme
        });
        g.$container.append(g.$ghost);

        if (g.cover) {
            g.cover = ui.cover({
                id: g.id,
                animate: {
                    show: 'fadeIn',
                    hide: 'fadeOut'
                },
                $container: g.$container,
                theme: g.theme
            });
        }

    },
    remove: function (id, force) {
        var self = this;
        if (ui.isJson(id)) {
            id = id.id;
        }
        if (id) {
            var g = this.global[id];

            if (!g) {
                return false;
            }

            if (!force && g.remove() === false) {
                return false;
            }

            g.$ghost.remove();
            if (g.cover) {
                ui.cover.remove(g.cover);
            }

            if (g.animate) {
                g.$element.one(ui.config.animationEnd, function () {
                    if (!g.component.isShow()) {
                        $(this).remove();
                        delete self.g[id];
                    }
                });
                g.$element.addClass(g.animate.hide);
                ui.component.setHide(g.component);
            } else {
                ui.component.setHide(g.component);
                delete self.g[id];
            }

        } else {
            for (id in this.global) {
                if (ui.isString(id)) {
                    this.remove(id, force);
                }
            }
        }
    },
    alert: function (html, callback) {
        return ui.dialog({
            $html: $('<div>', {class: 'alert'}).html([
                $('<i>', {class: this.config.theme.alert}),
                html,
            ]),
            sure: callback || true,
        });
    },
    error: function (html, callback) {
        return ui.dialog({
            $html: $('<div>', {class: 'error'}).html([
                $('<i>', {class: this.config.theme.error}),
                html,
            ]),
            sure: callback || true,
        });
    },
    success: function (html, callback) {
        return ui.dialog({
            $html: $('<div>', {class: 'success'}).html([
                $('<i>', {class: this.config.theme.success}),
                html,
            ]),
            sure: callback || true,
        });
    },
    confirm: function (html, sure, cancel) {
        return ui.dialog({
            $html: $('<div>', {class: 'confirm'}).html([
                $('<i>', {class: this.config.theme.confirm}),
                html,
            ]),
            sure: sure || true,
            cancel: cancel || true,
        });
    },

    fitPosition: function () {
        for (var id in this.global) {
            var g = this.global[id];
            var component = ui.component.get(g.$element);
            if (component.isShow()) {
                g.$element.position(g.position);
            }
        }
    }
});

$(window).on('resize.dialog', function () {
    ui.dialog.fitPosition();
});

