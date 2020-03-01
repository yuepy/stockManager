var gulp = require('gulp');
    less = require('gulp-less');
    browserSync = require('browser-sync');
    clean = require('gulp-clean');
    gulpServer = require('gulp-webserver');
    autoprefixer = require('gulp-autoprefixer');
    var dev = 'dev';
    var release = 'release';
    var reload = browserSync.reload;    
    var webpack = require('./webpack.dev.config');
    var path = require('path');
    var webpackStream = require('webpack-stream');
    var gulpReactify = require('gulp-reactify'); //gulp构建react应用
    var reactTools = require('react-tools');  //gulp构建reacr环境
    gulp.task('less',function(){
        // 找到less文件
        return gulp.src('src/css/**.less')
        // 用gulp-less做处理
        .pipe(less({
            paths:[path.join(__dirname,'less','includes')]
        }))
        // 输出到当前目录下
        .pipe(gulp.dest('./dist/css'))
    })