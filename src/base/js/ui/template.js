/**
* ui.template 模板
*
* 对外开放接口
* ui.template(html, id); // 可选项 id 为指定本次生成的模板id名称，字符型
* ui.template.render(templateId, data);
* 
*/
'use strict'
ui.template = function (html, id) {
    var _ = ui.template._;
    //
    for (var one in _.g) {
        if (_.g[one].html === html) {
            return one;
        }
    }
    //
    id = id ? id : ui.number.random(1e8).toString();
    //
    if (!_.g[id]) {
        _.g[id] = {
            html: html,
            fn: _.compile(html)
        }
    } else {
        alert('Error: template id ' + id + ' is already exist');
    }
    return id;
    //
}
ui.template.render = function (id, data) {
    var _ = ui.template._;
    //
    return _.g[id].fn(data);
}
//
ui.template.registerHelper = function (name, fn) {
    ui.template._.helpers[name] = fn;
};
ui.template.unregisterHelper = function (name) {
    ui.template._.helpers[name] = undefined;
    delete ui.template._.helpers[name];
};
ui.template.registerPartial = function (name, template) {
    ui.template._.partials[name] = { template: template };
};
ui.template.unregisterPartial = function (name, template) {
    if (ui.template._.partials[name]) {
        ui.template._.partials[name] = undefined;
        delete ui.template._.partials[name];
    }
};
//
ui.template._ = {
    g: {},
    global: {},
    options: {},
    partials: {},
    helpers: {
        '_partial': function (partialName, options) {
            var p = ui.template._.partials[partialName];
            if (!p || (p && !p.template)) return '';
            if (!p.compiled) {
                p.compiled = new ui.template(p.template).compile();
            }
            var ctx = this;
            for (var hashName in options.hash) {
                ctx[hashName] = options.hash[hashName];
            }
            return p.compiled(ctx, options.data, options.root);
        },
        'escape': function (context, options) {
            if (!ui.isString(context)) {
                throw new Error('ui.template: Passed context to "escape" helper should be a string');
            }
            return window.escape(context);
        },
        'if': function (context, options) {
            if (ui.isFunction(context)) { context = context.call(this); }
            if (context) {
                return options.fn(this, options.data);
            }
            else {
                return options.inverse(this, options.data);
            }
        },
        'unless': function (context, options) {
            if (ui.isFunction(context)) { context = context.call(this); }
            if (!context) {
                return options.fn(this, options.data);
            }
            else {
                return options.inverse(this, options.data);
            }
        },
        'each': function (context, options) {
            var ret = '', i = 0;
            if (ui.isFunction(context)) {
                context = context.call(this);
            }
            //
            if (ui.isArray(context)) {
                if (options.hash.reverse) {
                    context = context.reverse();
                }
                for (i = 0; i < context.length; i++) {
                    ret += options.fn(context[i], { first: i === 0, last: i === context.length - 1, index: i });
                }
                if (options.hash.reverse) {
                    context = context.reverse();
                }
            } else {
                for (var key in context) {
                    i++;
                    ret += options.fn(context[key], { key: key });
                }
            }
            if (i > 0) {
                return ret;
            } else {
                return options.inverse(this);
            }
        },
        'with': function (context, options) {
            if (ui.isFunction(context)) {
                context = context.call(this);
            }
            return options.fn(context);
        },
        'join': function (context, options) {
            if (ui.isFunction(context)) {
                context = context.call(this);
            }
            return context.join(options.hash.delimiter || options.hash.delimeter);
        },
        'js': function (expression, options) {
            var func;
            if (expression.indexOf('return') >= 0) {
                func = '(function(){' + expression + '})';
            } else {
                func = '(function(){return (' + expression + ')})';
            }
            return eval.call(this, func).call(this);
        },
        'js_compare': function (expression, options) {
            var func;
            if (expression.indexOf('return') >= 0) {
                func = '(function(){' + expression + '})';
            } else {
                func = '(function(){return (' + expression + ')})';
            }
            var condition = eval.call(this, func).call(this);
            if (condition) {
                return options.fn(this, options.data);
            } else {
                return options.inverse(this, options.data);
            }
        }
    },
    //
    helperToSlices: function (string) {
        var _ = ui.template._;
        //
        var helperParts = string.replace(/[{}#}]/g, '').split(' ');
        var slices = [];
        var shiftIndex, i, j;
        for (i = 0; i < helperParts.length; i++) {
            var part = helperParts[i];
            var blockQuoteRegExp, openingQuote;
            if (i === 0) {
                slices.push(part);
            } else {
                if (part.indexOf('"') === 0 || part.indexOf('\'') === 0) {
                    blockQuoteRegExp = part.indexOf('"') === 0 ? new RegExp('"', 'g') : new RegExp('\'', 'g');
                    openingQuote = part.indexOf('"') === 0 ? '"' : '\'';
                    // Plain String
                    if (part.match(blockQuoteRegExp).length === 2) {
                        // One word string
                        slices.push(part);
                    } else {
                        // Find closed Index
                        shiftIndex = 0;
                        for (j = i + 1; j < helperParts.length; j++) {
                            part += ' ' + helperParts[j];
                            if (helperParts[j].indexOf(openingQuote) >= 0) {
                                shiftIndex = j;
                                slices.push(part);
                                break;
                            }
                        }
                        if (shiftIndex) {
                            i = shiftIndex;
                        }
                    }
                } else {
                    if (part.indexOf('=') > 0) {
                        // Hash
                        var hashParts = part.split('=');
                        var hashName = hashParts[0];
                        var hashContent = hashParts[1];
                        if (hashContent.match(blockQuoteRegExp).length !== 2) {
                            shiftIndex = 0;
                            for (j = i + 1; j < helperParts.length; j++) {
                                hashContent += ' ' + helperParts[j];
                                if (helperParts[j].indexOf(openingQuote) >= 0) {
                                    shiftIndex = j;
                                    break;
                                }
                            }
                            if (shiftIndex) {
                                i = shiftIndex;
                            }
                        }
                        var hash = [hashName, hashContent.replace(blockQuoteRegExp, '')];
                        slices.push(hash);
                    } else {
                        // Plain variable
                        slices.push(part);
                    }
                }
            }
        }
        return slices;
    },
    stringToBlocks: function (string) {
        var _ = ui.template._;
        //
        var blocks = [], i, j, k;
        if (!string) return [];
        var _blocks = string.split(/({{[^{^}]*}})/);
        for (i = 0; i < _blocks.length; i++) {
            var block = _blocks[i];
            if (block === '') continue;
            if (block.indexOf('{{') < 0) {
                blocks.push({
                    type: 'plain',
                    content: block
                });
            }
            else {
                if (block.indexOf('{/') >= 0) {
                    continue;
                }
                if (block.indexOf('{#') < 0 && block.indexOf(' ') < 0 && block.indexOf('else') < 0) {
                    // Simple variable
                    blocks.push({
                        type: 'variable',
                        contextName: block.replace(/[{}]/g, '')
                    });
                    continue;
                }
                // Helpers
                var helperSlices = _.helperToSlices(block);
                var helperName = helperSlices[0];
                var isPartial = helperName === '>';
                var helperContext = [];
                var helperHash = {};
                for (j = 1; j < helperSlices.length; j++) {
                    var slice = helperSlices[j];
                    if (ui.isArray(slice)) {
                        // Hash
                        helperHash[slice[0]] = slice[1] === 'false' ? false : slice[1];
                    }
                    else {
                        helperContext.push(slice);
                    }
                }

                if (block.indexOf('{#') >= 0) {
                    // Condition/Helper
                    var helperStartIndex = i;
                    var helperContent = '';
                    var elseContent = '';
                    var toSkip = 0;
                    var shiftIndex;
                    var foundClosed = false, foundElse = false, foundClosedElse = false, depth = 0;
                    for (j = i + 1; j < _blocks.length; j++) {
                        if (_blocks[j].indexOf('{{#') >= 0) {
                            depth++;
                        }
                        if (_blocks[j].indexOf('{{/') >= 0) {
                            depth--;
                        }
                        if (_blocks[j].indexOf('{{#' + helperName) >= 0) {
                            helperContent += _blocks[j];
                            if (foundElse) elseContent += _blocks[j];
                            toSkip++;
                        }
                        else if (_blocks[j].indexOf('{{/' + helperName) >= 0) {
                            if (toSkip > 0) {
                                toSkip--;
                                helperContent += _blocks[j];
                                if (foundElse) elseContent += _blocks[j];
                            }
                            else {
                                shiftIndex = j;
                                foundClosed = true;
                                break;
                            }
                        }
                        else if (_blocks[j].indexOf('else') >= 0 && depth === 0) {
                            foundElse = true;
                        }
                        else {
                            if (!foundElse) helperContent += _blocks[j];
                            if (foundElse) elseContent += _blocks[j];
                        }

                    }
                    if (foundClosed) {
                        if (shiftIndex) i = shiftIndex;
                        blocks.push({
                            type: 'helper',
                            helperName: helperName,
                            contextName: helperContext,
                            content: helperContent,
                            inverseContent: elseContent,
                            hash: helperHash
                        });
                    }
                }
                else if (block.indexOf(' ') > 0) {
                    if (isPartial) {
                        helperName = '_partial';
                        if (helperContext[0]) helperContext[0] = '"' + helperContext[0].replace(/"|'/g, '') + '"';
                    }
                    blocks.push({
                        type: 'helper',
                        helperName: helperName,
                        contextName: helperContext,
                        hash: helperHash
                    });
                }
            }
        }
        return blocks;
    },
    //
    getCompileFn: function (block, depth) {
        var _ = ui.template._;
        //
        if (block.content) {
            return _.compile(block.content, depth);
        } else {
            return function () { return ''; };
        }
    },
    getCompileInverse: function (block, depth) {
        var _ = ui.template._;
        //
        if (block.inverseContent) {
            return _.compile(block.inverseContent, depth);
        } else {
            return function () { return ''; };
        }
    },
    getCompileVar: function (name, ctx) {
        var _ = ui.template._;
        //
        var variable, parts, levelsUp = 0, initialCtx = ctx;
        if (name.indexOf('../') === 0) {
            levelsUp = name.split('../').length - 1;
            var newDepth = ctx.split('_')[1] - levelsUp;
            ctx = 'ctx_' + (newDepth >= 1 ? newDepth : 1);
            parts = name.split('../')[levelsUp].split('.');
        } else if (name.indexOf('@global') === 0) {
            ctx = 'ui.template.global';
            parts = name.split('@global.')[1].split('.');
        } else if (name.indexOf('@root') === 0) {
            ctx = 'root';
            parts = name.split('@root.')[1].split('.');
        } else {
            parts = name.split('.');
        }
        //
        variable = ctx;
        for (var i = 0; i < parts.length; i++) {
            var part = parts[i];
            if (part.indexOf('@') === 0) {
                if (i > 0) {
                    variable += '[(data && data.' + part.replace('@', '') + ')]';
                } else {
                    variable = '(data && data.' + name.replace('@', '') + ')';
                }
            }
            else {
                if (isFinite(part)) {
                    variable += '[' + part + ']';
                } else {
                    if (part === 'this' || part.indexOf('this.') >= 0 || part.indexOf('this[') >= 0 || part.indexOf('this(') >= 0) {
                        variable = part.replace('this', ctx);
                    } else {
                        variable += '.' + part;
                    }
                }
            }
        }
        return variable;
    },
    getCompiledArguments: function (contextArray, ctx) {
        var _ = ui.template._;
        //
        var arr = [];
        for (var i = 0; i < contextArray.length; i++) {
            if (/^['"]/.test(contextArray[i])) {
                arr.push(contextArray[i]);
            } else if (/^(true|false|\d+)$/.test(contextArray[i])) {
                arr.push(contextArray[i]);
            } else {
                arr.push(_.getCompileVar(contextArray[i], ctx));
            }
        }
        return arr.join(', ');
    },
    compile: function (template, depth) {
        var _ = ui.template._;
        //
        depth = depth || 1;
        if (typeof template !== 'string') {
            throw new Error('ui.template: Template must be a string');
        }
        var blocks = _.stringToBlocks(template);
        if (blocks.length === 0) {
            return function () { return ''; };
        }
        var ctx = 'ctx_' + depth;
        var resultString = '';
        if (depth === 1) {
            resultString += '(function (' + ctx + ', data, root) {\n';
        }
        else {
            resultString += '(function (' + ctx + ', data) {\n';
        }
        if (depth === 1) {
            resultString += 'function c(val, ctx) {if (typeof val !== "undefined" && val !== null) {if (ui.isFunction(val)) {return val.call(ctx);} else return val;} else return "";}\n';
            resultString += 'root = root || ctx_1 || {};\n';
        }
        resultString += 'var r = \'\';\n';
        var i, j, context;
        for (i = 0; i < blocks.length; i++) {
            var block = blocks[i];
            // Plain block
            if (block.type === 'plain') {
                resultString += 'r +=\'' + (block.content).replace(/\r/g, '\\r').replace(/\n/g, '\\n').replace(/'/g, '\\' + '\'') + '\';';
                continue;
            }
            var variable, compiledArguments;
            // Variable block
            if (block.type === 'variable') {
                variable = _.getCompileVar(block.contextName, ctx);
                resultString += 'r += c(' + variable + ', ' + ctx + ');';
            }
            // Helpers block
            if (block.type === 'helper') {
                if (block.helperName in _.helpers) {
                    compiledArguments = _.getCompiledArguments(block.contextName, ctx);
                    resultString += 'r += (ui.template._.helpers.' + block.helperName + ').call(' + ctx + ', ' + (compiledArguments && (compiledArguments + ', ')) + '{hash:' + JSON.stringify(block.hash) + ', data: data || {}, fn: ' + _.getCompileFn(block, depth + 1) + ', inverse: ' + _.getCompileInverse(block, depth + 1) + ', root: root});';
                } else {
                    if (block.contextName.length > 0) {
                        throw new Error('ui.template: Missing helper: "' + block.helperName + '"');
                    } else {
                        variable = _.getCompileVar(block.helperName, ctx);
                        resultString += 'if (' + variable + ') {';
                        resultString += 'if (ui.isArray(' + variable + ')) {';
                        resultString += 'r += (ui.template._.helpers.each).call(' + ctx + ', ' + variable + ', {hash:' + JSON.stringify(block.hash) + ', data: data || {}, fn: ' + _.getCompileFn(block, depth + 1) + ', inverse: ' + _.getCompileInverse(block, depth + 1) + ', root: root});';
                        resultString += '}else {';
                        resultString += 'r += (ui.template._.helpers.with).call(' + ctx + ', ' + variable + ', {hash:' + JSON.stringify(block.hash) + ', data: data || {}, fn: ' + _.getCompileFn(block, depth + 1) + ', inverse: ' + _.getCompileInverse(block, depth + 1) + ', root: root});';
                        resultString += '}}';
                    }
                }
            }
        }
        resultString += '\nreturn r;})';
        return eval.call(window, resultString);
    }
}
