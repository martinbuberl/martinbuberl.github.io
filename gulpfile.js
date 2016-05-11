'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const cleancss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

gulp.task('scripts', () => {
  return gulp.src(['content/js/base.js'])
    .pipe(concat('base.min.js'))
    .pipe(uglify({
      compress: { drop_debugger: false }
    }))
    .pipe(gulp.dest('content'));
});

gulp.task('styles', () => {
  return gulp.src([
      'content/css/import.scss',
      'content/normalize.css',
      'content/css/base.scss'
    ])
    .pipe(sass())
    .pipe(concat('all.min.css'))
    .pipe(cleancss({
      advanced: false,
      processImport: false,
      keepSpecialComments: false
    }))
    .pipe(gulp.dest('content'));
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['scripts', 'styles']);
