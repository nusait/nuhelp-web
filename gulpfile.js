var gulp = require('gulp'),
    util = require('gulp-util'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename');
var sass = require('gulp-ruby-sass'),
    minify = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var livereload = require('gulp-livereload');

function extractSassError($string) {
    patt = /(line \d+).*\/(\w+\.scss)/;
    match = patt.exec($string);
    return {file: match[2], line: match[1]};
}

gulp.task('sass', function () {
    gulp.src('css/*.scss')
        .pipe(sass())
        .on('error', notify.onError(function (error) {
            util.beep();
            util.log('error', util.colors.red(error.message));
            var info = extractSassError(error.message);
            return info.file + ' on ' + info.line;
        }))
        .pipe(autoprefixer(["last 4 versions", "Android 4"]))
        .pipe(gulp.dest('./built'))
        .pipe(minify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./built'));
});

gulp.task('browserify', function () {
    return browserify('./js/index.js')
        .bundle()
        .on('error', function (error) {
            util.log('error', util.colors.red(error.message));
            this.emit('end');
        })
        .pipe(source('index.js'))
        .pipe(gulp.dest('./built'));
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('built/**').on('change', livereload.changed);
});

gulp.task('default', function() {
    gulp.start('watch');
    gulp.start('sass');
    gulp.start('browserify');

    gulp.watch(['./css/**/*.scss'], ['sass']);
    gulp.watch(['./js/**/*'], ['browserify']);

});
