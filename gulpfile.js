var gulp = require('gulp');
var path = require('path');
var del = require('del');
var $ = require('gulp-load-plugins')({
    pattern: '*',
});

var webpackConfig = require('./webpack.config.js')['development'];
var webpackConfigProd = require('./webpack.config.js')['production'];

var src = 'src/';
var dist = 'dist/';

gulp.task('scripts-dev', function() {
    return gulp.src(webpackConfig.entry.app)
        .pipe($.webpackStream(webpackConfig))
        .pipe(gulp.dest(dist))
        .pipe($.size({
            title: 'js'
        }));
});

gulp.task('scripts-prod', function() {
    return gulp.src(webpackConfigProd.entry.app)
        .pipe($.webpackStream(webpackConfigProd))
        .pipe($.uglify({preserveComments: 'license'}))
        .pipe($.stripDebug())
        .pipe(gulp.dest(dist))
        .pipe($.size({
            title: 'js'
        }));
});

gulp.task('watch', function() {
    gulp.watch(src + '**/*.js', ['scripts-dev', 'scripts-prod']);
});

gulp.task('clean', function(cb) {
    del([dist]).then(function() {
        cb();
    });
});

var defaultTasks = ['scripts-dev' , 'scripts-prod'];

// waits until clean is finished then builds the project
gulp.task('build', ['clean'], function() {
    gulp.start(defaultTasks);
});

// by default build project and then watch files
gulp.task('default', ['build', 'watch']);