const gulp = require('gulp');
const del = require('del');
const webpack = require('webpack-stream');
const uglify = require('gulp-uglify');
const stripDebug = require('gulp-strip-debug');
const webpackConfig = require('./webpack.config.js')['development'];
const webpackConfigProd = require('./webpack.config.js')['production'];

const SRC_PATH = 'src/';
const DIST_PATH = 'dist/';

const build = gulp.parallel(buildDevelopment, buildProduction);

function buildDevelopment() {
    return gulp.src(webpackConfig.entry.app)
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(DIST_PATH));
}

function buildProduction() {
    return gulp.src(webpackConfigProd.entry.app)
        .pipe(webpack(webpackConfigProd))
        .pipe(uglify())
        .pipe(stripDebug())
        .pipe(gulp.dest(DIST_PATH));
}

async function watch() {
    return await gulp.watch(SRC_PATH + '**/*.js', build);
}

async function clean() {
    return del([DIST_PATH]);
}

exports.clean = clean;
exports.build = gulp.series(clean, build);
exports.default = gulp.series(clean, build, watch);
