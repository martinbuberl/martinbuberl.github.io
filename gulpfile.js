const { parallel, src, dest } = require('gulp');
const sass = require('gulp-sass');
const cleancss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

function scripts(cb) {
  src(['content/js/base.js'])
    .pipe(concat('base.min.js'))
    .pipe(uglify({
      compress: { drop_debugger: false }
    }))
    .pipe(dest('content'));

  cb();
}

function styles(cb) {
  src([
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
    .pipe(dest('content'));

  cb();
}

exports.default = parallel(scripts, styles);
