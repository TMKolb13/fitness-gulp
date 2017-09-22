'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var validate = require('gulp-w3c-css');
var htmlhint = require("gulp-htmlhint");
var babel = require('gulp-babel');
var beautify = require('gulp-beautify');
var about = require('gulp-about');
var cat = require('gulp-cat');
var cssscss = require('gulp-css-scss');


gulp.task('sass', function() {
  return gulp.src('./assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./assets/css/'));
});

gulp.task('watch', function () {
  gulp.watch('./assets/sass/**/*.scss', ['sass']);
});

gulp.task('validate', function() {
  return gulp.src('./assets/css/*.css')
  .pipe(validate())
  .pipe(gulp.dest('./output/validate_css'))
});

gulp.task('htmlhint', function(){
    return gulp.src('./*html')
    .pipe(htmlhint())
    .pipe(htmlhint.reporter())
})

gulp.task('babel', function(){
    return gulp.src('./assets/js/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./output/babel'))
})

gulp.task('beautify', function(){
    return gulp.src('./assets/js/*.js')
    .pipe(beautify())
    .pipe(gulp.dest('./output/beautify_js'))
})

gulp.task('about', function(){
    return gulp.src('package.json')
    .pipe(about())
    .pipe(gulp.dest('./output'))
})

gulp.task('cat', function(){
    return gulp.src('package.json')
    .pipe(cat())
})

gulp.task('cssscss', function(){
    return gulp.src('./assets/css/animate.css')
    .pipe(cssscss())
    .pipe(gulp.dest('./output/css_to_scss'))
})

gulp.task('default', ['jstasks', 'csstasks', 'htmltasks']);

gulp.task('jstasks', ['babel', 'beautify']);
gulp.task('csstasks', ['sass', 'watch', 'validate']);
gulp.task('htmltasks', ['htmlhint'])