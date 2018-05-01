const fs = require('fs');
const path = require('path');
const revHash = require('rev-hash');
const vinylFile = require('vinyl-file');
const gulp = require('gulp');
const less = require('gulp-less');
const concat = require('gulp-concat');
const changed = require('gulp-changed');
const rename = require('gulp-rename');
const gulpif = require('gulp-if');
const replace = require('gulp-replace');
const package = require('../package.json');

// 需要配置的内容
// 模块名称：SPA首页
const moduleName = 'home';
const moduleDist = path.join(__dirname, '../../dist');
const taskJsSrc = [
    path.join(__dirname, 'js/home.js'),
    path.join(__dirname, 'js/header.js'),
    path.join(__dirname, 'js/body.js'),

];
exports.enable = true;


//----以下部分，一般情况不需要修改，有修改的请在这里备注----

const modulePrefix = moduleName + '-';

const hashManifest = {};

function saveHashManifest(file) {
    let hash = revHash(file.contents);
    hashManifest[file.path] = hash;
    return hash;
}

const taskLess = modulePrefix + 'css';
const entryLess = path.join(__dirname, 'css/' + moduleName + '.less');
const watchLess = path.join(__dirname, 'css/**/*.less');
const outputLess = path.join(moduleDist, '/css');
gulp.task(taskLess, function () {
    console.log(taskLess);
    gulp.src(entryLess)
        .pipe(less())
        .pipe(replace(/url\(["']?img\/([^"']+)["']?\)/g, function (match, p1) {
            let length = p1.indexOf('?');
            var address = p1;
            if (length != -1) {
                address = p1.substr(0, length);
            }

            let filePath = path.join(entryImg, address);
            let hash = hashManifest[filePath];
            if (!hash) {
                // 不存在于hash缓存表的情况将其file重新生成出一个hash
                let file = vinylFile.readSync(filePath);
                hash = saveHashManifest(file);
            }
            let newname = modulePrefix + path.basename(address) + '?' + hash;
            return match.replace(path.basename(p1), newname);
        }))
        .pipe(gulp.dest(outputLess));
});

const taskImg = modulePrefix + 'img';
const entryImg = path.join(__dirname, 'css/img');
const watchImg = path.join(entryImg, '/**/*');
const outputImg = path.join(moduleDist, '/css/img');
gulp.task(taskImg, function () {
    console.log(taskImg);
    gulp.src(watchImg)
        .pipe(changed(outputImg, {
            transformPath: function (oPath) {
                let iPath = oPath.replace(outputImg, entryImg);
                let stat = fs.statSync(iPath);
                if (stat.isDirectory()) {
                    return oPath;
                } else {
                    let oName = modulePrefix + path.basename(oPath);
                    return path.join(path.dirname(oPath), oName);
                }
            }
        }))
        .pipe(gulpif(function (file) {
            let stat = fs.statSync(file.path);
            if (stat.isDirectory()) {
                return false;
            }
            return true;
        }, rename({prefix: modulePrefix})))
        .pipe(gulp.dest(outputImg));
});

const taskJs = modulePrefix + 'js';
const watchJs = path.join(__dirname, 'js/**/*.js');
const outputJs = path.join(moduleDist, '/js');
gulp.task(taskJs, function () {
    console.log(taskJs);
    gulp.src(taskJsSrc)
        .pipe(replace(/\{\{environment\.api\}\}/g, function () {
            return package.environment.develop.api;
        }))
        .pipe(replace(/\{\{environment\.host\}\}/g, function () {
            return package.environment.develop.host;
        }))
        .pipe(replace(/\{\{version\}\}/g, function () {
            return package.version;
        }))
        .pipe(concat(moduleName + '.js'))
        .pipe(gulp.dest(outputJs));
});


const taskJsPlugin = modulePrefix + 'JsPlugin';
const entryJsPlugin = path.join(__dirname, 'js/plugin');
const watchJsPlugin = path.join(entryJsPlugin, '/**/*');
const outputJsPlugin = path.join(moduleDist, '/js/plugin');
gulp.task(taskJsPlugin, function () {
    console.log(taskJsPlugin);
    gulp.src(watchJsPlugin)
        .pipe(changed(outputJsPlugin))
        .pipe(gulp.dest(outputJsPlugin));
});

const taskHtml = modulePrefix + 'html';
const watchHtml = [path.join(__dirname, '*.*'), '!' + path.join(__dirname, '*.js')];
const outputHtml = moduleDist;
gulp.task(taskHtml, function () {
    console.log(taskHtml);
    gulp.src(watchHtml)
        .pipe(gulp.dest(outputHtml));
});

const taskWatch = modulePrefix + 'watch';
gulp.task(taskWatch, function () {
    gulp.watch(watchLess, [taskLess]);
    gulp.watch(watchImg, function (e) {
        if (e.type == 'changed') {
            console.log(taskWatch, e.path);
            gulp.src(e.path, {base: entryImg})
                .pipe(gulpif(function (file) {
                    let stat = fs.statSync(file.path);
                    if (stat.isDirectory()) {
                        return false;
                    }
                    saveHashManifest(file);
                    return true;
                }, rename({prefix: modulePrefix})))
                .pipe(gulp.dest(outputImg));
        }
    });
    gulp.watch(watchJs, [taskJs]);
    gulp.watch(watchJsPlugin, function (e) {
        if (e.type == 'changed') {
            console.log(taskWatch, e.path);
            gulp.src(e.path, {base: entryJsPlugin})
                .pipe(gulpif(function (file) {
                    let stat = fs.statSync(file.path);
                    if (stat.isDirectory()) {
                        return false;
                    }
                    saveHashManifest(file);
                    return true;
                }, gulp.dest(outputJsPlugin)));
        }
    });
    gulp.watch(watchHtml, function (e) {
        if (e.type == 'changed') {
            console.log(taskWatch, e.path);
            gulp.src(e.path)
                .pipe(gulp.dest(outputHtml));
        }
    });
});


exports.start = function () {
    gulp.start(taskImg, taskJsPlugin, taskLess, taskJs, taskHtml, taskWatch);
};
