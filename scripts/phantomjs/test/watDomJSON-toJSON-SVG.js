/* global phantom, document, console */
/* eslint-disable no-console */
'use strict';

try {
  var svgString = '<div class=\'container\'>' +
      '  <span id=\'username\'>1234</span>' +
      '  <button id=\'button\' class=\'btn-test\' style=\'width:30px;height:20px\'></button>' +
      '  <div id=\'svg-container\'>' +
      '    <svg width=\'100\' height=\'100\'>' +
      '      <circle cx=\'50\' cy=\'50\' r=\'40\' stroke=\'green\' stroke-width=\'4\' fill=\'yellow\' />' +
      '      Sorry, your browser does not support inline SVG.' +
      '    </svg>' +
      '  </div>' +
      '</div>';

  var watJSONConstants = require('../../../src/watJSONConstants');
  var page = require('webpage').create();
  page.content = svgString;

  page.injectJs('../../../src/vendor/watDomJSON.js');
  var result = page.evaluate(function (optionsAsString) {
    /* eslint-disable */
    var result = null;
    var json = watDomJSON.toJSON(document.getElementsByClassName('container')[0], JSON.parse(optionsAsString));
    // console.log('return value of watDomJSON.toJSON(svgContainer) = ', JSON.stringify(json));

    // assert
    if (json.childNodes[2].childNodes[0].nodeName !== 'svg') {
      result = 1;
    } else if (json.childNodes[2].childNodes[0].childNodes[0].nodeName !== 'circle') {
      result = 2;
    }
    return result;
    /* eslint-enable */
  }, JSON.stringify(watJSONConstants.watDomJSON.options.toWatJSON));
  phantom.exit(result);
} catch (e) {
  console.log(e);
  phantom.exit(-1);
}
