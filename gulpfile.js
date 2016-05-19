'use strict';

var del = require('del');
var gulp = require('gulp');
var gulpBabel = require('gulp-babel');
var gulpConcat = require('gulp-concat');
var gulpJsdoc2md = require('gulp-jsdoc-to-markdown');
var gulpRename = require('gulp-rename');
var gulpShell = require('gulp-shell');
var webpack = require('webpack'); // eslint-disable-line no-unused-vars

var paths = {
  'src': [
    'src/watJSON.js',
  ],
  'dist': [
    'dist/*',
  ],
  'docs': {
    'badges': './docs/badges.md',
    'api': './docs/api.md',
    'install': './docs/install.md',
    'examples': './docs/examples.md',
    'license': './LICENSE.md',
    'readme': 'README.md',
    'dest': './docs',
  },
  'config': {
    'umdBuild': 'webpack.umd.config.js',
    'umdBuildeMin': 'webpack.umd.min.config.js',
    'browserBuild': 'webpack.browser.config.js',
    'browserBuildeMin': 'webpack.browser.min.config.js',
    'devserver': './webpack.devserver.config',
  },
}

// Clean tasks.
gulp.task('clean', function () {
  return del(paths.dist);
});

// Documentation tasks.
gulp.task('docs:api', function () {
  return gulp.src(paths.src)
    .pipe(gulpBabel())
		.pipe(gulpJsdoc2md())
    .pipe(gulpRename(function (path) {
      path.basename = 'api';
      path.extname = '.md';
    }))
		.pipe(gulp.dest(paths.docs.dest));
});
gulp.task('docs', ['docs:api'], function () {
  return gulp.src([ paths.docs.badges, paths.docs.api, paths.docs.install, paths.docs.examples, paths.docs.license ])
		.pipe(gulpConcat(paths.docs.readme))
		.pipe(gulp.dest('./'));
});

// Build tasks.
gulp.task('umd:build', [ 'clean', 'docs' ], gulpShell.task([
  `webpack --config ${paths.config.umdBuild}`,
]));
gulp.task('umd:build:min', ['umd:build'], gulpShell.task([
  `webpack --config ${paths.config.umdBuildeMin}`,
]));
gulp.task('browser:build', [ 'clean', 'docs' ], gulpShell.task([
  `webpack --config ${paths.config.browserBuild}`,
]));
gulp.task('browser:build:min', ['browser:build'], gulpShell.task([
  `webpack --config ${paths.config.browserBuildeMin}`,
]));
gulp.task('all:build', [ 'umd:build', 'browser:build' ]);
gulp.task('all:build:min', [ 'umd:build:min', 'browser:build:min' ]);

// Default tasks.
gulp.task('default', ['all:build:min']);
