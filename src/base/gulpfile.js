// 加载内建模块和依赖的工具包
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


// 需要配置的内容

// 模块名称，与父级文件夹一致
// 模块名称：基础工具包
const moduleName = 'base';

// 输出的目标位置
const moduleDist = path.join(__dirname, '../../dist');

// 指定合并的js文件，__dirname是被执行文件的当前路径，所以到了总任务那边就是绝对路径了
const taskJsSrc = [
    path.join(__dirname, 'js/jquery.js'),
    path.join(__dirname, 'js/jquery.html.js'),
    path.join(__dirname, 'js/jquery.position.js'),
    path.join(__dirname, 'js/ui/ui.js'),
    path.join(__dirname, 'js/ui/array.js'),
    path.join(__dirname, 'js/ui/i18n.js'),
    path.join(__dirname, 'js/ui/is.js'),
    path.join(__dirname, 'js/ui/json.js'),
    path.join(__dirname, 'js/ui/menu.js'),
    path.join(__dirname, 'js/ui/module.js'),
    path.join(__dirname, 'js/ui/require.js'),
    path.join(__dirname, 'js/ui/router.js'),
    path.join(__dirname, 'js/ui/string.js'),


];

// 配置本任务是否可用
exports.enable = true;


//----以下部分，一般情况不需要修改，有修改的请在这里备注----

// 加上模块名的前缀，对于文件名称有一定的语义化作用，属于约定规则中的内容。
const modulePrefix = moduleName + '-';

// 缓存文件的md5，包rev-hash的md5 hash只有10位
const hashManifest = {};

/*
* 参数file为vinyl file格式
* 返回hash值
* */
function saveHashManifest(file) {
    // 产生hash值
    let hash = revHash(file.contents);
    // 缓存hash值
    hashManifest[file.path] = hash;
    // 返回hash值
    return hash;
}

/*
* 任务'base-img'
* 启动时实现对静态资源的拷贝
* 出于性能考虑，会与生产文件夹/dist对应的/css/img内的资源进行比对，使用包gulp-changed
* 生产文件夹的文件名称会变动，所以这里加了transformPath，其指定到新的文件（文件名不同）进行比对
* */
// 本任务的名称
const taskImg = modulePrefix + 'img';
// 入口目录
const entryImg = path.join(__dirname, 'css/img');
// 监视的目录，glob格式
const watchImg = path.join(entryImg, '/**/*');
// 产出目录
const outputImg = path.join(moduleDist, '/css/img');
// 定义任务
gulp.task(taskImg, function () {
    console.log(taskImg);
    gulp.src(watchImg)
    // 这里使用changed, 只复制修改过的文件，避免全部复制
        .pipe(changed(outputImg, {
            transformPath: function (oPath) {
                // 由输出路径变换出输入路径，这是基于比对时路径格式的一致性
                let iPath = oPath.replace(outputImg, entryImg);
                let stat = fs.statSync(iPath);
                if (stat.isDirectory()) {
                    // 文件夹直接返回路径
                    return oPath;
                } else {
                    // 新的文件名称格式
                    // 与包rename的重名命规则一致，见下文
                    let oName = modulePrefix + path.basename(oPath);
                    // 返回新的文件路径
                    return path.join(path.dirname(oPath), oName);
                }
            }
        }))
        // 使用gulpif，对文件夹不进行重命名
        // rename的prefix为指定前缀
        .pipe(gulpif(function (file) {
            let stat = fs.statSync(file.path);
            if (stat.isDirectory()) {
                // 返回false会过滤掉本次file
                return false;
            }
            // 返回true是file可用，继续操作
            return true;
        }, rename({prefix: modulePrefix})))
        .pipe(gulp.dest(outputImg));
});

/*
* 任务'base-css'
* 启动时实现该模块的样式重新生成
* */
// 本任务的名称
const taskLess = modulePrefix + 'css';
// 入口文件，less自身的语法@import能导入文件，所以入口文件的内容也链入了其他子文件，包括其顺序
const entryLess = path.join(__dirname, 'css/' + moduleName + '.less');
// 监视的目录，glob格式
const watchLess = path.join(__dirname, 'css/**/*.less');
// 产出目录
const outputLess = path.join(moduleDist, '/css');
// 定义任务
gulp.task(taskLess, function () {
    console.log(taskLess);
    gulp.src(entryLess)
    // 使用包gulp-less进行编译
        .pipe(less())
        // 使用了包gulp-replace，替换操作，如下：
        // background-image:url('img/logo.png');
        // -->
        // background-image:url('img/base-logo.png?xxxxxxxxxx');
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

/*
* 任务'base-js'
* 启动时打包关联功能的js文件
* */
// 本任务的名称
const taskJs = modulePrefix + 'js';
// 监视的目录，glob格式
const watchJs = path.join(__dirname, 'js/**/*.js');
// 产出目录
const outputJs = path.join(moduleDist, '/js');
// 定义任务
gulp.task(taskJs, function () {
    console.log(taskJs);
    // taskJsSrc里面的顺序也是文件的打包顺序
    gulp.src(taskJsSrc)
    // 打包成模块的名称，属于规范约定的内容
        .pipe(concat(moduleName + '.js'))
        .pipe(gulp.dest(outputJs));
});

/*
* 任务'base-watch'
* 启动时会监听本模块下的静态资源（图片，图形，字体，音视频等）的变动
* */
// 本任务的名称
const taskWatch = modulePrefix + 'watch';
// 定义任务
gulp.task(taskWatch, function () {
    gulp.watch(watchLess, [taskLess]);
    gulp.watch(watchJs, [taskJs]);
    gulp.watch(watchImg, function (e) {
        // 这里只能监听到文件的变动，文件的添加和删除都无法监听到
        // 有添加和删除文件都需要重启此任务重新监听
        if (e.type == 'changed') {
            console.log(taskWatch, e.path);
            gulp.src(e.path, {base: entryImg})
                // 重命名
                .pipe(gulpif(function (file) {
                    let stat = fs.statSync(file.path);
                    if (stat.isDirectory()) {
                        return false;
                    }
                    // 重新生成文件的hash，以便在'base-css'任务中能重新生成
                    // 所以重新修改了文件，想要在样式表中去除缓存，需要重启样式生成
                    saveHashManifest(file);
                    return true;
                }, rename({prefix: modulePrefix})))
                // 拷贝到目标位置
                .pipe(gulp.dest(outputImg));
        }
    });


});


// 不能有'default'任务，任务名称也必须跟上前缀 modulePrefix，
// 因为gulp内建机制中会对任务名称去重，在串行执行中，后续同名的任务名称会不执行。


// 输出全部任务，便于集成调度
exports.start = function () {
    // 启动时各任务都执行一次
    // 任务是按同步触发的，但任务不是同步的，任务间的数据不保持前后顺序，所以任务内容之间不应该有相互依赖
    gulp.start(taskImg, taskLess, taskJs, taskWatch);
};
