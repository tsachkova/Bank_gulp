let gulp = require('gulp');
let { src, dest } = require('gulp');
let browsersync = require('browser-sync').create();
let fileinclude = require('gulp-file-include');
let scss = require('gulp-sass')(require('sass'))
let postcss = require('gulp-postcss');
let autoprefixer = require('autoprefixer');
let group_media = require('gulp-group-css-media-queries');
let clean_css = require('gulp-clean-css');
let rename = require('gulp-rename');
let ts = require('gulp-typescript');
let uglify = require('gulp-uglify');
let concat = require('gulp-concat');

let dist = './dist';
let srcProject = './src';

let path = {
    build: {
        html: dist + '/',
        css: dist + '/css',
        js: dist + '/js',
    },
    src: {
        html: [srcProject + '/html/*.html','!' +srcProject + '/html/_*.html'],
        scss: srcProject + '/scss/*.scss',
        ts: srcProject + '/ts/*.ts'

    },
    watch: {
        html: srcProject + '/**/*.html',
        css: srcProject + '/scss/**/*.scss',
        js: srcProject + '/ts/**/*.ts',
    },
    clean: './' + dist + '/'
}

function browserSync() {
    browsersync.init({
        server: {
            baseDir: './' + dist + '/'},
            port:3000
        ,
    })
}

function html() {
    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}

function css() {
    return src(path.src.scss)
        .pipe(scss({
            outputStyle: "expanded"
        }))
        .pipe(postcss([autoprefixer({
            overrideBrowserslist: ['last 5 versions'],
            cascade: true
            })
                ]))
        .pipe(group_media())
        .pipe(dest(path.build.css))
        .pipe(clean_css())
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}

function js() {
    console.log(111);
    return src(path.src.ts)
        .pipe(fileinclude())
        .pipe(ts({"downlevelIteration": true,
        }))
        .pipe(concat('all.js'))
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))

        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}

function watchFile() {
    gulp.watch([path.watch.html], html)
    gulp.watch([path.watch.css], css)
    gulp.watch([path.watch.js], js)
}

let build = gulp.series(gulp.parallel(js, css, html));
let watch = gulp.parallel(build, watchFile, browserSync);

exports.html = html;
exports.css = css;
exports.js = js;
exports.build = build;
exports.watch = watch;
exports.default = watch;