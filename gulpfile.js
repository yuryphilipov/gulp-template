const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const gcmq = require('gulp-group-css-media-queries');
const cleancss = require('gulp-clean-css');
const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

function browsersync() {
  browserSync.init({
    server: {
      baseDir: 'app/'
    },
    notify: false
  });
}

function styles() {
  return gulp
    .src('app/scss/**/*.scss')
    .pipe(sass())
    .pipe(gcmq())
    .pipe(concat('app.min.css'))
    .pipe(cleancss({ level: { 1: { specialComments: 0 } } }))
    .pipe(gulp.dest('app/css'))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
}

function scripts() {
  return gulp
    .src('app/js/**/*.js')
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({ stream: true }));
}

function startwatch() {
  gulp.watch('app/scss/**/*.scss', styles);
  gulp.watch(['app/js/**/*.js', '!app/js/**/*.min.js'], scripts);
  gulp.watch('app/*.html').on('change', browserSync.reload);
}

exports.browsersync = browsersync;
exports.styles = styles;
exports.scripts = scripts;

exports.default = gulp.parallel(scripts, styles, browsersync, startwatch);
