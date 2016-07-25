'use strict';

var webpackConfig = {
  entry: {
    watJSON: ['./src/watJSON.js'],
  },
  node: {
    global: true,
  },
  devtool: '#cheap-module-source-map',
  output: {
    path: './dist',
    filename: '[name].browser.js',
    library: 'watJSON',
    libraryTarget: 'var',
  },
  module: {
    preLoaders: [
      {
        loaders: ['eslint-loader'],
        test: /\.js$/,
        excludes: [/node_modules/],
      },
    ],
    loaders: [
      {
        loaders: ['babel-loader'],
        test: /\.js$/,
        excludes: [/node_modules/],
      },
      {
        loaders: ['json-loader'],
        test: /\.json$/,
      },
      {
        include: [
          require.resolve('./src/watJSON'),
        ],
        loader: 'imports?this=>window',
      },
    ],
  },
};

module.exports = webpackConfig;
