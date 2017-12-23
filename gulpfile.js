const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const sass = require('gulp-sass');

// Static server
gulp.task('server', function() {
    browserSync.init({
        server: {
            port:3000,
            baseDir: "build"
        }
    });
    gulp.watch('build/**/*').on('change',browserSync.reload);
});

/* pug compile*/
gulp.task('template:compile', function buildHTML() {
    return gulp.src('sourse/template/index.pug')
        .pipe(pug({
            // Your options in here.
            pretty:true
        }))
        .pipe(gulp.dest('build'))
});

/* sass compile */
gulp.task('style:compile', function () {
    return gulp.src('sourse/style/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('build/style'));
});
/* watchers */
gulp.task('watch',function () {
        gulp.watch('sourse/style/**/*.scss',gulp.series('style:compile'))
        gulp.watch('sourse/template/**/*.pug',gulp.series('template:compile'))

    })

gulp.task('default', gulp.series(

    //gulp.parallel('templates:compile', 'style:compile'),
    gulp.parallel('watch', 'server')
    )
)
// gulp.task('default', gulp.series(
//
//     gulp.parallel('template:compile','style:compile'),
//     gulp.parallel('watch','server')
//     )
//
// )