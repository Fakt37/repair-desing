const {src, dest, watch}        = require('gulp');
const browserSync = require('browser-sync').create();
const sass        = require('gulp-sass');

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


function servSass() {
    return src("./sass/*.sass")
        .pipe(sass())
        .pipe(dest("css"))
        .pipe(browserSync.stream());
};
exports.serv = bs;