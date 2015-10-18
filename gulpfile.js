var gulp = require('gulp');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');

gulp.task('clean', function() {
  return del(['build']);
});

gulp.task('scripts', ['clean'], function() {
  return gulp.src('./unit-bezier.js')
    .pipe(uglify())
    .pipe(gulp.dest('build'));
});


// The default task (called when you run `gulp` from cli)
gulp.task('default', ['scripts']);