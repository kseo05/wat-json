'use strict';

var webpack = require('webpack');
var webpackConfig = require('./webpack.browser.config');

webpackConfig.output.filename = '[name].browser.min.js';
delete webpackConfig.devtool;

var plugins = [
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.AggressiveMergingPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    mangle: {
      eval: true,
      except: [ '$super', '$', 'exports', 'require' ],
    },
  }),
];

webpackConfig.plugins = (webpackConfig.plugins || []).concat(plugins);

module.exports = webpackConfig;
