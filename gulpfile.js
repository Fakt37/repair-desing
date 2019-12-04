const {src, dest, watch}        = require('gulp');
const browserSync = require('browser-sync').create();
const sass        = require('gulp-sass');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
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
    watch("./js/*.js").on('change', browserSync.reload);
};

function min() {
    src('./css/*.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(dest('css'));
};

function servSass() {
    return src("./sass/*.sass")
        .pipe(sass())
        .pipe(dest("/css"))
        .pipe(browserSync.stream());
};
exports.serv = bs;