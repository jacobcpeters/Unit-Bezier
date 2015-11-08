var gulp = require('gulp');
var uglify = require('gulp-uglify');
var del = require('del');
var shell = require('gulp-shell');

gulp.task('makeDocs', shell.task([
  'node_modules/.bin/jsdoc --configure .jsdoc.json --verbose'
]))

gulp.task('makeDocsWin', shell.task([
  'node_modules/.bin/jsdoc.cmd --configure .jsdoc.json --verbose'
]))

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