const {src, dest, watch, series} = require('gulp');
const browserSync = require('browser-sync').create();
const sass        = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const minify = require('gulp-minify');
const htmlmin = require('gulp-htmlmin');
const tinypng = require('gulp-tinypng-compress');

// Static server
function bs() {
    servSass ();
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    watch("./*.html").on('change', browserSync.reload);
    watch("./sass/**/*.sass", servSass);
    watch("./sass/**/*.scss", servSass);
    watch("./js/*.js").on('change', browserSync.reload);
};


function servSass() {
    return src("./sass/**/*.sass", "./sass/**/*/scss")
        .pipe(sass())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(dest("css"))
        .pipe(browserSync.stream());
};

function buildCSS(done) {
    src(['css/**/**.css', 'css/**/**.min.css'])
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(dest('dist/css/'));
    done();
};
function buildJS(done) {
    src(['js/**.js', '!js/**.min.js'])
    .pipe(minify({
        ext:{
            min:'.min.js'
        }}))
    .pipe(dest('dist/js/'));
    src('js/**.min.js')
    .pipe(dest('dist/js/'));
    done();
};

function buildHtml(done) {
    src('**.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest('dist/'));
    done();
};
function php(done) {
    src('**.php')
        .pipe(dest('dist/'));
    src('phpmailer/**/**')
        .pipe(dest('dist/phpmailer/'));
    done();
};
function fonts(done) {
    src('fonts/**/**')
        .pipe(dest('dist/fonts/'));
    done();
};

function imageMin(done) {
    src('img/**/*.{png,jpg,jpeg}')
        .pipe(tinypng({
            key: 'fJ6BBvxYFm3wX79YFxjlfQ5MTkd7vbxC',
        }))
        .pipe(dest('dist/img/'));
    src('img/**/**.svg')
        .pipe(dest('dist/img/'));
    done();
};
exports.serv = bs;
exports.build = series(buildCSS, buildJS, buildHtml, php, fonts);