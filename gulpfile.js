"use strict";

/***************************
  Vars
***************************/
const srcFolder  = 'src',
    distFolder = 'dist';

const path = {
    src: {
        html: srcFolder + '/*.html',
        inc: srcFolder + '/**/*.html',
        sass: srcFolder + '/sass/**/*.sass',
        js: srcFolder + '/js/**/*.js',
        img: srcFolder + '/images/**/*.{jpg,png,svg,gif,ico,webp}',
        fonts: srcFolder + '/fonts/**/*.{eot,svg,ttf,woff}'
    },
    dist: {
        html: distFolder + '/*.html',
        css: distFolder + '/css',
        js: distFolder + '/js',
        img: distFolder + '/images',
        fonts: distFolder + '/fonts'
    }
}

const gulp       = require('gulp'),
    browserSync  = require('browser-sync').create(),
    sass         = require('gulp-sass'),
    concat       = require('gulp-concat'),
    mqpacker     = require('css-mquery-packer'),
    sortCSSmq    = require('sort-css-media-queries'),
    postcss      = require('gulp-postcss'),
    sourcemaps   = require('gulp-sourcemaps'),
    uglify       = require('gulp-uglify'), //For JS
    babel        = require('gulp-babel'),
    cleanCSS     = require('gulp-clean-css'),
    rename       = require('gulp-rename'),
    del          = require('del'),
    imagemin     = require('gulp-imagemin'),
    cache        = require('gulp-cache'),
    autoprefixer = require('autoprefixer'),
    include      = require('gulp-file-include'),
    gulpif       = require('gulp-if');

/***************************
  Browser Sync
***************************/
function browserSyncFunc() {
    browserSync.init({
        server: {
            baseDir: distFolder
        },
        port: 3000,
        //proxy: 'yourlocal.dev',
        notify: false
    });
}

/***************************
  JS
***************************/
function jsUseFunc() {
    return gulp.src(srcFolder + '/js/common.js')
        .pipe(sourcemaps.init())
            .pipe(babel({
                presets: ['@babel/env']
            }))
            .pipe(rename({
                basename: 'scripts'
            }))
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest(path.dist.js))
}

function jsLibFunc() {
    return gulp.src([
            // srcFolder + '/libs/jquery/dist/jquery.min.js',
            // srcFolder + '/libs/imagesloaded/imagesloaded.pkgd.min.js',
            distFolder + '/js/scripts.js'
        ])
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(path.dist.js))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest(path.dist.js))
        .pipe(browserSync.stream());
}

let jsFunc = gulp.series(jsUseFunc, jsLibFunc);

/***************************
  Sass
***************************/
const pluginsPostCss = [
    autoprefixer({
        overrideBrowserslist: ['last 21 versions']
    }),
    mqpacker({
        sort: sortCSSmq
    })
];

// function sassFullFunc() {
//     return gulp.src(path.src.sass)
//         .pipe(sourcemaps.init())
//             .pipe(sass({
//                 outputStyle: 'expanded'
//             })
//             .on('error', sass.logError))
//             .pipe(postcss(pluginsPostCss))
//             .pipe(cleanCSS({
//                 format: 'beautify'
//             }))
//         .pipe(sourcemaps.write('/'))
//         .pipe(gulp.dest(path.dist.css));
// }

// function sassMinFunc() {
//     return gulp.src(path.src.sass)
//         .pipe(sourcemaps.init())
//             .pipe(sass({
//                 outputStyle: 'expanded'
//             })
//             .on('error', sass.logError))
//             .pipe(postcss(pluginsPostCss))
//             .pipe(rename({
//                 suffix: '.min'
//             }))
//             .pipe(cleanCSS())
//         .pipe(sourcemaps.write('/'))
//         .pipe(gulp.dest(path.dist.css));
// }

// let sassFunc = gulp.series(sassFullFunc, sassMinFunc);

function sassFunc() {
    return gulp.src(path.src.sass)
        .pipe(sourcemaps.init())
            .pipe(sass({
                outputStyle: 'expanded'
            })
            .on('error', sass.logError))
            .pipe(postcss(pluginsPostCss))
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(cleanCSS())
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest(path.dist.css))
        .pipe(browserSync.stream());
}

/***************************
  Html
***************************/
function htmlFunc() {
    return gulp.src(path.src.html)
        .pipe(include({
            prefix: '@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(distFolder + '/'))
        .pipe(browserSync.stream());
}

/***************************
  Image
***************************/
function imgFunc() {
    return gulp.src(path.src.img)
        .pipe(cache(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            interlaced: true,
            optimizationLevel: 3
        })))
        .pipe(gulp.dest(path.dist.img))
        .pipe(browserSync.stream());
}

/***************************
  Fonts
***************************/
function fontsFunc() {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.dist.fonts))
        .pipe(browserSync.stream());
}

/***************************
  Watch
***************************/
function watchFunc() {
    gulp.watch(path.src.inc, gulp.parallel( htmlFunc ));
    gulp.watch(path.src.sass, gulp.parallel( sassFunc ));
    gulp.watch(path.src.js, gulp.parallel( jsFunc ));
    gulp.watch(path.src.img, gulp.parallel( imgFunc ));
}

/***************************
  Clean and Clearcache
***************************/
function cleanFunc() {
    return del(distFolder);
}

function clearcacheFunc() {
    return cache.clearAll();
}

/***************************
  Commands
***************************/
exports.default = gulp.series(cleanFunc, gulp.parallel(htmlFunc, sassFunc, jsFunc, imgFunc, fontsFunc, browserSyncFunc, watchFunc));
exports.build = gulp.series(clearcacheFunc, cleanFunc, gulp.parallel(htmlFunc, sassFunc, jsFunc, imgFunc, fontsFunc));
exports.clearcache = clearcacheFunc;