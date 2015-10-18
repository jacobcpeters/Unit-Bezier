var gulp = require('gulp');
var uglify = require('gulp-uglify');
var del = require('del');

gulp.task('clean', function() {
  return del(['build']);
});

gulp.task('scripts', ['clean'], function() {
  return gulp.src('./unit-bezier.js')
    .pipe(uglify({preserveComments: 'license'}))
    .pipe(gulp.dest('build'));
});


// The default task (called when you run `gulp` from cli)
gulp.task('default', ['scripts']);