/* global __dirname */
'use strict';

var del = require('del');
var gulp = require('gulp');
var gulpBabel = require('gulp-babel');
var gulpConcat = require('gulp-concat');
var gulpJsdoc2md = require('gulp-jsdoc-to-markdown');
var gulpRename = require('gulp-rename');
var gulpShell = require('gulp-shell');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackDevServerConfig = require('./webpack.browser.devserver.config');
var path = require('path');

var paths = {
  src: [
    'src/watJSON.js',
  ],
  dist: [
    'dist/*',
  ],
  docs: {
    badges: './docs/badges.md',
    api: './docs/api.md',
    install: './docs/install.md',
    examples: './docs/examples.md',
    license: './LICENSE.md',
    readme: 'README.md',
    dest: './docs',
  },
  config: {
    umdBuild: 'webpack.umd.config.js',
    umdBuildeMin: 'webpack.umd.min.config.js',
    browserBuild: 'webpack.browser.config.js',
    browserBuildeMin: 'webpack.browser.min.config.js',
  },
};

// Clean tasks.
gulp.task('clean', function () {
  return del(paths.dist);
});

// Documentation tasks.
gulp.task('docs:api', function () {
  return gulp.src(paths.src)
    .pipe(gulpBabel())
		.pipe(gulpJsdoc2md())
    .pipe(gulpRename(function (pathInfo) {
      pathInfo.basename = 'api';
      pathInfo.extname = '.md';
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

// Dev & Demo Server tasks.
var runDevServer = function (contentBase, port) {
  webpackDevServerConfig.output.path = path.join(__dirname, contentBase);

  var filename = 'watJSON.browser.js';
  var compiler = webpack(webpackDevServerConfig);
  var server = new WebpackDevServer(compiler, {
    contentBase: contentBase,
    // contentBase: '/', //web root path
    // or: contentBase: "http://localhost/",

    hot: true,
    // Enable special support for Hot Module Replacement
    // Page is no longer updated, but a "webpackHotUpdate" message is send to the content
    // Use "webpack/hot/dev-server" as additional module in your entry point
    // Note: this does _not_ add the `HotModuleReplacementPlugin` like the CLI option does.

    // Set this as true if you want to access dev server from arbitrary url.
    // This is handy if you are using a html5 router.
    historyApiFallback: true,

    // Set this if you want to enable gzip compression for assets
    compress: false,

    // Set this if you want webpack-dev-server to delegate a single path to an arbitrary server.
    // Use "*" to proxy all paths to the specified server.
    // This is useful if you want to get rid of 'http://localhost:8080/' in script[src],
    // and has many other use cases (see https://github.com/webpack/webpack-dev-server/pull/127 ).
    // proxy: {
    //   '*': 'http://localhost:9090',
    // },

    // pass [static options](http://expressjs.com/en/4x/api.html#express.static) to inner express server
    staticOptions: {
    },

    // webpack-dev-middleware options
    quiet: false,
    noInfo: false,
    lazy: false,
    filename: filename,

    headers: {
      'Access-Control-Allow-Origin': '*',
    },

    inline: true,
  });

  server.listen(port, 'localhost', function (err, result) {
    /* eslint-disable no-console, no-undef */
    if (err) {
      console.log(err);
    }

    console.log(`Listening at http://localhost:${port}/webpack-dev-server/`);
    console.log(`Listening at http://localhost:${port}/${filename}`);
    /* eslint-enable no-console, no-undef */

    // server.close();
  });
};
gulp.task('browser:demo:basic', function () {
  runDevServer('demo/basic', 3333);
});
gulp.task('browser:demo:object-explorer', function () {
  runDevServer('demo/object-explorer', 3333);
});

// Default tasks.
gulp.task('default', ['all:build:min']);
