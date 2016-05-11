'use strict';

const gulp = require('gulp');
const david = require('gulp-david');
const sass = require('gulp-sass');
const cleancss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const sequence = require('run-sequence');

// Node tasks
gulp.task('node-david', function () {
  return gulp.src('package.json')
    .pipe(david())
    .on('error', (err) => console.error(err));
});

// JS tasks
gulp.task('js-prepare', function () {
  return gulp.src(['content/js/base.js'])
    .pipe(concat('base.js'))
    .pipe(uglify({ compress: { drop_debugger: false } }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('content'));
});

// CSS tasks
gulp.task('css-prepare', function () {
  return gulp.src(['content/css/import.scss', 'content/css/base.scss'])
    .pipe(sass())
    .pipe(gulp.dest('content/css/'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cleancss({ keepSpecialComments: false, processImport: false, advanced: false }))
    .pipe(gulp.dest('content'));
});
gulp.task('css-combine', function() {
  return gulp.src(['content/import.min.css', 'content/normalize.min.css', 'content/base.min.css'])
    .pipe(concat('all.min.css'))
    .pipe(gulp.dest('content'));
});

// The default task (called when you run `gulp` from cli)
// Using 'run-sequence' to run tasks in order
gulp.task('default', function (callback) {
  sequence('node-david', 'js-prepare', 'css-prepare', 'css-combine', callback);
});
