/* global __dirname */

const path = require('path');
const webpack = require('webpack');
var webpackConfig = require('./webpack.browser.config');

webpackConfig.debug = true;
webpackConfig.devtool = 'eval-source-map';
webpackConfig.output = {
  path: path.join(__dirname, 'demo/basic'),
  filename: '[name].browser.js',
  library: 'watJSON',
  libraryTarget: 'var',
};
// webpackConfig.resolve = {
//   extensions: [ '', '.js' ],
//   alias: {
//     'watJSON': path.resolve(__dirname, './src'),
//   },
// };

var plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
];

webpackConfig.plugins = (webpackConfig.plugins || []).concat(plugins);

module.exports = webpackConfig;
