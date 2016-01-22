//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
    less = require('gulp-less'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');
 
//定义一个testLess任务（自定义任务名称）
gulp.task('testLess', function () {
    gulp.src('src/less/index.less') //该任务针对的文件
        .pipe(less()) //该任务调用的模块
        .pipe(gulp.dest('src/css')); //将会在src/css下生成index.css
});
 
gulp.task('default',['testLess', 'elseTask']); //定义默认任务
 
//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
//gulp.dest(path[, options]) 处理完后文件生成路径

//编译sass、自动添加css前缀和压缩
gulp.task('styles', function() {                //创建任务，在命令行下可以输入$ gulp styles来执行上面的任务
    return gulp.src('src/styles/main.scss')     //设置需要处理的文件的路径，可以是多个文件以数组的形式[main.scss, vender.scss]，也可以是正则表达式/**/*.scss
        .pipe(sass({ style: 'expanded' }))      //将需要处理的文件导向sass插件
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('dist/assets/css'))     //设置生成文件的路径，一个任务可以有多个生成路径，一个可以输出未压缩的版本，另一个可以输出压缩后的版本
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(notify({ message: 'Styles task complete' }));
});

//scripts的校验、合并和压缩的任务
gulp.task('scripts', function() {
    return gulp.src('src/scripts/**/*.js')
        //jshint用于js代码测试,未配置
        //.pipe(jshint('.jshintrc'))
        //.pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(notify({ message: 'Scripts task complete' }));
});

//压缩图片
//这个任务使用imagemin插件把所有在src/images/目录以及其子目录下的所有图片（文件）进行压缩
gulp.task('images', function() {
    return gulp.src('src/images/**/*')
        //.pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))

        //我们可以进一步优化，利用缓存保存已经压缩过的图片，使用之前装过的gulp-cache插件，不过要修改一下上面的代码
        .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
        .pipe(gulp.dest('dist/assets/img')) //压缩后目标存放位置
        .pipe(notify({ message: 'Images task complete' })); //提示消息
});

//清除文件
//该测试例子会清除assets下的css\js\img文件夹
gulp.task('clean', function(cb) {
    del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img'], cb)
});

//要使这个能够工作，还需要在浏览器上安装LiveReload插件
gulp.task('watch', function() {
    // Create LiveReload server
    livereload.listen();
    // Watch any files in dist/, reload on change
    gulp.watch(['dist/**']).on('change', livereload.changed);
});