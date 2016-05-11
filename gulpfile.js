'use strict';

const gulp = require('gulp');
const david = require('gulp-david');
const sass = require('gulp-sass');
const cleancss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const concat = require('gulp-concat');

// Node tasks
gulp.task('node-david', () => {
  return gulp.src('package.json')
    .pipe(david())
    .on('error', (err) => console.error(err));
});

// JS tasks
gulp.task('js-process', () => {
  return gulp.src(['content/js/base.js'])
    .pipe(concat('base.js'))
    .pipe(uglify({ compress: { drop_debugger: false } }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('content'));
});

// CSS tasks
gulp.task('css-process', () => {
  return gulp.src([
      'content/css/import.scss',
      'content/normalize.css',
      'content/css/base.scss'
    ])
    .pipe(sass())
    .pipe(cleancss({
      advanced: false,
      processImport: false,
      keepSpecialComments: false
    }))
    .pipe(concat('all.min.css'))
    .pipe(gulp.dest('content'));
});

// The default task (called when you run `gulp` from cli)
// Using 'run-sequence' to run tasks in order
gulp.task('default', ['node-david', 'js-process', 'css-process']);
