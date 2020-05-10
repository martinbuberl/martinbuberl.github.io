const { parallel, src, dest } = require('gulp')
const sass = require('gulp-sass')
const cleancss = require('gulp-clean-css')
const terser = require('gulp-terser')
const concat = require('gulp-concat')

const root = 'docs/content'

function scripts (cb) {
  src([`${root}/js/base.js`])
    .pipe(concat('base.min.js'))
    .pipe(terser())
    .pipe(dest(root))

  cb()
}

function styles (cb) {
  src([
    `${root}/css/import.scss`,
    `${root}/normalize.css`,
    `${root}/css/base.scss`
  ])
    .pipe(sass())
    .pipe(concat('all.min.css'))
    .pipe(cleancss({
      advanced: false,
      processImport: false,
      keepSpecialComments: false
    }))
    .pipe(dest(root))

  cb()
}

exports.default = parallel(scripts, styles)
