import gulp from 'gulp'
import less from 'gulp-less'
import rename from 'gulp-rename'
import babel from 'gulp-babel'
import uglify from 'gulp-uglify'
import concat from 'gulp-concat'
import cleanCss from 'gulp-clean-css'
import { deleteAsync } from 'del'

const path = {
    styles: {
        src: 'src/styles/**/*.less',
        dest: 'src/compile-slyles'
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'src/compile-scripts'
    }
}

function clean() {
    return deleteAsync(['dist'])
}

function style() {
    return gulp.src(path.styles.src)
        .pipe(less())
        .pipe(cleanCss())
        .pipe(rename({
            basename: 'styles',
            suffix: '.min'
        }))
        .pipe(gulp.dest(path.styles.dest))
}

function script() {
    return gulp.src(path.scripts.src, {
        sourcemaps: true
    })
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(path.scripts.dest))
}

function watch() {
    gulp.watch(path.styles.src, style);
    gulp.watch(path.scripts.src, script);
}
function defaultTask() {
    return gulp.series(
        clean,
        gulp.parallel(style, script),
        build,
        watch
    )();
}


const build = gulp.series(clean, gulp.parallel(style, script), watch)
export { clean }
export { style }
export { watch }
export { build }
export { script }
export { defaultTask as default };