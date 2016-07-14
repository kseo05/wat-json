/* global phantom, document, console */
/* eslint-disable no-console */
'use strict';

const Constants = require('../../../src/__tests__/Constants');
const watDomJSON = require('../../../src/vendor/watDomJSON');

try {
  var page = require('webpage').create();
  page.content = Constants.sample.svgString;

  var json = page.evaluate(function () {
    return watDomJSON.toJSON(document.getElementsByClassName('container')[0], {});
  });
  console.log(json);

  phantom.exit();

} catch (e) {
  console.error(e);
  phantom.exit(-1);
}
