'use strict';

const babel = require('babel-core');
const jestPreset = require('babel-preset-jest');

module.exports = {
  'process': function (src, filename) {
    if (babel.util.canCompile(filename)) {
      // Ignore all files within node_modules
      // if (filename.indexOf('node_modules') === -1) {
      var transformedCode = babel.transform(src, {
        filename,
        'presets': [jestPreset],
        retainLines: true,
      }).code;
      return transformedCode;
      // }
    }

    return src;
  },
};
