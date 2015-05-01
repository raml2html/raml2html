'use strict';

var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');
var mqpacker = require('css-mqpacker');
var csswring = require('csswring');
var cssvars = require('postcss-custom-properties');
var nested = require('postcss-nested');
var cssimport = require('postcss-import');
var cssmerge = require('postcss-merge-rules');
var raml2html = require('./');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var babelify = require('babelify');
var riotify = require('riotify');

gulp.task('css', function() {
  var processors = [
    cssimport(),
    nested(),
    cssvars(),
    cssmerge(),
    autoprefixer({browsers: ['last 2 versions']}),
    mqpacker(),
    csswring()
  ];

  return gulp.src('./css/main.css')
    .pipe(postcss(processors))
    .pipe(gulp.dest('./angular')); // TODO!
});

gulp.task('js', function() {
  var b = browserify({
    entries: './js/main.js',
    debug: false,
    transform: [babelify, riotify]
  });

  return b.bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./lib'));
});

gulp.task('watch', ['css'], function() {
  gulp.watch('./css/*.css', ['css']);
  //gulp.watch('./js/*.js', ['js']);
  //gulp.watch('./js/*.tag', ['js']);
});

gulp.task('test', function() {
  var config = {
    processRamlObj: function(ramlObj) {
      var Q = require('q');
      return Q.fcall(function() {
        return JSON.stringify(ramlObj);
      });
    }
  };

  return gulp.src('./examples/*.raml')
    .pipe(raml2html.renderStream(config))
    .pipe(gulp.dest('./build'));
});
