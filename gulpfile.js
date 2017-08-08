/**
 * Created by Oshevchuk on 13.07.2017.
 */

'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var rigger = require('gulp-rigger');
var uglify = require('gulp-uglify');
var rimraf = require('rimraf');

var sourcemaps = require('gulp-sourcemaps');
// var amdOptimize = require("amd-optimize");
// var concat = require('gulp-concat');
// var jshint = require('gulp-jshint');
// var source = require('vinyl-source-stream');
// var tsify = require('tsify');
// var bundle = require('gulp-bundle-assets');


var browserSync = require("browser-sync");
var reload = browserSync.reload;

var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
var tsify = require("tsify");
var source = require('vinyl-source-stream');
var browserify = require('browserify');


var path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'build/',
        js: 'build/js/',
        css: './build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: { //Пути откуда брать исходники
        html: 'src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: 'src/js/*.js',//В стилях и скриптах нам понадобятся только main файлы
        style: 'src/sass/main.scss',
        img: 'src/img/**/*.*', //Синтаксис img/**/*.* означает - взять все файлы всех расширений из папки и из вложенных каталогов
        fonts: 'src/fonts/**/*.*'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/sass/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};


var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "OS"
};

gulp.task('sass', function () {
    gulp.src('./src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('sass:watch', function () {
    gulp.watch('./src/sass/**/*.scss', ['sass']);
});

gulp.task('html:build', function () {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
    // .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
        .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
});

gulp.task('ts', function () {

    // return tsProject.src()
    //     .pipe(tsProject())
    //     .js.pipe(gulp.dest('build'))

    return browserify({
        basedir: '.',
        debug: false,
        entries: ['src/js/main.ts'],
        cache: {},
        packageCache: {}
    })
        .plugin(tsify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest("build/js"))
    .pipe(reload({stream: true})); //И перезагрузим сервер
});

gulp.task('js:build', function () {
    return gulp.src(path.src.js) //Найдем наш main файл

        .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
        .pipe(reload({stream: true})); //И перезагрузим сервер
});
//
// gulp.task('js:build', function () {
//     gulp.src(path.src.js) //Найдем наш main файл
//         .pipe(rigger()) //Прогоним через rigger
//         .pipe(sourcemaps.init()) //Инициализируем sourcemap
//         .pipe(uglify()) //Сожмем наш js
//         .pipe(sourcemaps.write()) //Пропишем карты
//         .pipe(gulp.dest(path.build.js)) //Выплюнем готовый файл в build
//         .pipe(reload({stream: true})); //И перезагрузим сервер
// });


gulp.task('image:build', function () {
    gulp.src(path.src.img) //Выберем наши картинки
    // .pipe(imagemin({ //Сожмем их
    //     progressive: true,
    //     svgoPlugins: [{removeViewBox: false}],
    //     use: [pngquant()],
    //     interlaced: true
    // }))
    // .plugin(tsify)
    // .bundle()
    // .pipe(source('bundle.js'))
        .pipe(gulp.dest(path.build.img)) //И бросим в build
        .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function () {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('build', [
    'html:build',
    'ts',
    // 'js:build',
    'sass',
    'fonts:build',
    'image:build'
]);

gulp.task('watch', function () {
    gulp.watch([path.watch.html], function (event, cb) {
        gulp.start('html:build');
    });
    gulp.watch([path.watch.style], function (event, cb) {
        gulp.start('sass');
    });
    gulp.watch([path.watch.js], function (event, cb) {
        gulp.start('js:build');
    });
    gulp.watch([path.watch.img], function (event, cb) {
        gulp.start('image:build');
    });
    gulp.watch([path.watch.fonts], function (event, cb) {
        gulp.start('fonts:build');
    });
});


gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('default', ['build', 'webserver', 'watch']);