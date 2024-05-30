'use strict';

const gulp = require('gulp');
const cache = require('gulp-cache');
const build = require('@microsoft/sp-build-web');

gulp.task('cache-clear', function (done) {
  return cache.clearAll(done);
});

build.initialize(gulp);
