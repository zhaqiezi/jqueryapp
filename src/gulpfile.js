const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const revHash = require('rev-hash');
const vinylFile = require('vinyl-file');
const replace = require('gulp-replace');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const pump = require('pump');
const package = require('./package.json');

//----以下部分，一般情况不需要修改，有修改的请在这里备注----

// 根路径，仍然是相对路径，
const rootDir = './';

// gulp工具的入口文件名，固定就叫这个
const gulpfile = 'gulpfile.js';

// 性能优化需要，在遍历文件夹中需要排除不必要的查询
const ignoreDir = ['node_modules'];

// 缓存文件的md5，包rev-hash的md5 hash只有10位
const hashManifest = {};

/*
* 参数file为vinyl file格式
* 返回hash值
* */
function saveHashManifest(file) {
    let hash = revHash(file.contents);
    // 缓存hash值
    hashManifest[file.path] = hash;
    return hash;
}

// 从每个入口文件夹获取任务
/*
* 参数 dir 目录路径，需要是相对路径
* 返回一个gulp任务
* 内有自回调
* */
function getGulpTask(dir) {
    // task为数组是预先设计的，最终返回一个任务列表
    let task = [];
    // 同步读取文件，以下都基于同步编程模式，理论上也可以采用异步遍历子文件夹，性能上会好一些，但就没有返回一个大任务列表这样的结果，回调需要改。
    fs.readdirSync(dir).forEach(function (file) {
        // 忽略一些路径
        if (ignoreDir.includes(file) || file.indexOf('.') == 0) {
            return false;
        }

        // 拼凑子文件|夹的路径
        let filePath = dir + file;
        let fileDir = filePath + '/';

        let stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            // 是文件夹的情况再进去获取子任务
            task = task.concat(getGulpTask(fileDir));
        } else {
            // 排除当前文件，否则进入死循环
            if (dir != rootDir && file == gulpfile) {
                // 推入任务列表
                task.push(require(filePath))
            }
        }
    });
    // 返回数组
    return task;
}

const taskDevelop = 'develop';
gulp.task(taskDevelop, function () {
    console.log(taskDevelop);
    getGulpTask(rootDir).forEach(function (task) {
        // 如果子任务task.enable=false;说明该任务暂时不启动，可以有效保护已开发完成的一些功能。
        if (task.enable) {
            // 启动子任务，字段由子任务导出，名称.start与gulp.start一样，但只是一个普通的回调函数，两者没有直接的关联。
            task.start();
        }
    });
});

/*
* 上线前的发布
* 启动时实现对生产文件夹的js/css资源进行压缩，html资源中有链入js/css的修改其hash版本号
* */
// 本任务的名称
const publishTask = function (environmentName) {
    console.log(environmentName);

    const publishEnvironment = package.environment[environmentName];
    const date = new Date();
    const dir = [
        date.getMonth() + 1,
        date.getDate(),
        date.getHours(),
        date.getMinutes()
    ].join('-');

    const dist = path.join(__dirname, '../dist');
    const publish = path.join(__dirname, '../publish', environmentName, dir);

    gulp.src(path.join(dist, '**/*')).pipe(gulp.dest(publish));

    const publishCss = path.join(publish, 'css');
    const publishJs = path.join(publish, 'js');
    const publishHtml = publish;

    const entryCss = path.join(publishCss, '*.css');
    const entryJs = [path.join(publishJs, '**/*.js'), '!' + path.join(publishJs, '**/*.min.js')];
    const entryHtml = path.join(publishHtml, '*.html');

    setTimeout(function () {
        gulp.src(entryHtml)
            .pipe(replace(/(src|href)=["']?([^"']+)["']?/g, function (match, p0, p1) {
                let length = p1.indexOf('?');
                var address = p1;
                if (length != -1) {
                    address = p1.substr(0, length);
                }
                let filePath = path.join(dist, address);
                let stat = fs.statSync(filePath);
                if (!stat.isFile()) {
                    return;
                }

                let hash = hashManifest[filePath];
                if (!hash) {
                    let file = vinylFile.readSync(filePath);
                    hash = saveHashManifest(file);
                }
                address = publishEnvironment.host + address + '?' + hash;
                return match.replace(p1, address);
            }))
            .pipe(gulp.dest(publishHtml));

        gulp.src(entryCss)
            .pipe(cleanCSS())
            .pipe(gulp.dest(publishCss));

        pump([
            gulp.src(entryJs),
            replace(/["'](\/(css|js)[^"']+\.(css|js))["']/g, function (match, p1) {
                console.log(match, p1);
                let length = p1.indexOf('?');
                var address = p1;
                if (length != -1) {
                    address = p1.substr(0, length);
                }
                let filePath = path.join(dist, address);
                let hash = hashManifest[filePath];
                if (!hash) {
                    let file = vinylFile.readSync(filePath);
                    hash = saveHashManifest(file);
                }
                address = publishEnvironment.host + address + '?' + hash;
                return match.replace(p1, address);
            }),
            uglify(),
            gulp.dest(publishJs)
        ],function(err) {
            if(!err){
                console.log('success');
            }else{
                console.error('Error: ', err);
            }
        });
    }, 3000);
}

const taskPublishProduct = 'publish-product';
gulp.task(taskPublishProduct, function () {
    publishTask(taskPublishProduct);
});




