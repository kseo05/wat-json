/* global phantom, console */
/* eslint-disable no-console */
'use strict';

try {
  var watJSONConstants = require('../../../src/watJSONConstants');
  var page = require('webpage').create();

  page.injectJs('../../../src/vendor/watDomJSON.js');
  var result = page.evaluate(function (optionsAsString) {
    /* eslint-disable */
    var result = null;
    var watDomJSONAsString = '{"attributes":{"class":"container"},"childElementCount":3,"childNodes":[{"attributes":{"id":"username"},"childElementCount":0,"childNodes":[{"childNodes":[],"data":"1234","length":4,"nodeName":"#text","nodeType":3,"nodeValue":"1234"}],"clientHeight":0,"clientLeft":0,"clientTop":0,"clientWidth":0,"contentEditable":"inherit","draggable":false,"hidden":false,"id":"username","isContentEditable":false,"localName":"span","namespaceURI":"http://www.w3.org/1999/xhtml","nodeName":"SPAN","nodeType":1,"offsetHeight":19,"offsetLeft":8,"offsetTop":8,"offsetWidth":32,"scrollHeight":0,"scrollLeft":0,"scrollTop":0,"scrollWidth":0,"spellcheck":true,"tabIndex":-1,"tagName":"SPAN","translate":true,"webkitRegionOverset":"undefined"},{"attributes":{"class":"btn-test","id":"button","style":"width:30px;height:20px"},"autofocus":false,"childElementCount":0,"childNodes":[],"className":"btn-test","clientHeight":20,"clientLeft":0,"clientTop":0,"clientWidth":30,"contentEditable":"inherit","disabled":false,"draggable":false,"formNoValidate":false,"hidden":false,"id":"button","isContentEditable":false,"localName":"button","namespaceURI":"http://www.w3.org/1999/xhtml","nodeName":"BUTTON","nodeType":1,"offsetHeight":20,"offsetLeft":44,"offsetTop":9,"offsetWidth":30,"scrollHeight":20,"scrollLeft":0,"scrollTop":0,"scrollWidth":30,"spellcheck":true,"tabIndex":0,"tagName":"BUTTON","translate":true,"type":"submit","webkitRegionOverset":"undefined","willValidate":true},{"attributes":{"id":"svg-container"},"childElementCount":1,"childNodes":[{"attributes":{"height":"100","width":"100"},"childElementCount":1,"childNodes":[{"attributes":{"cx":"50","cy":"50","fill":"yellow","r":"40","stroke":"green","stroke-width":"4"},"childElementCount":0,"childNodes":[],"clientHeight":0,"clientLeft":0,"clientTop":0,"clientWidth":0,"localName":"circle","namespaceURI":"http://www.w3.org/2000/svg","nodeName":"circle","nodeType":1,"offsetHeight":0,"offsetLeft":0,"offsetTop":0,"offsetWidth":0,"scrollHeight":0,"scrollLeft":0,"scrollTop":0,"scrollWidth":0,"tagName":"circle","webkitRegionOverset":"undefined","xmlspace":"default"},{"childNodes":[],"data":"      Sorry, your browser does not support inline SVG.    ","length":58,"nodeName":"#text","nodeType":3,"nodeValue":"      Sorry, your browserdoes not support inline SVG.    "}],"clientHeight":100,"clientLeft":0,"clientTop":0,"clientWidth":100,"contentScriptType":"text/ecmascript","contentStyleType":"text/css","currentScale":1,"localName":"svg","namespaceURI":"http://www.w3.org/2000/svg","nodeName":"svg","nodeType":1,"offsetHeight":100,"offsetLeft":8,"offsetTop":29,"offsetWidth":100,"pixelUnitToMillimeterX":0.2645833194255829,"pixelUnitToMillimeterY":0.2645833194255829,"screenPixelToMillimeterX":0.2645833194255829,"screenPixelToMillimeterY":0.2645833194255829,"scrollHeight":100,"scrollLeft":0,"scrollTop":0,"scrollWidth":100,"tagName":"svg","useCurrentView":false,"webkitRegionOverset":"undefined","xmlspace":"default","zoomAndPan":2}],"clientHeight":100,"clientLeft":0,"clientTop":0,"clientWidth":384,"contentEditable":"inherit","draggable":false,"hidden":false,"id":"svg-container","isContentEditable":false,"localName":"div","namespaceURI":"http://www.w3.org/1999/xhtml","nodeName":"DIV","nodeType":1,"offsetHeight":100,"offsetLeft":8,"offsetTop":29,"offsetWidth":384,"scrollHeight":100,"scrollLeft":0,"scrollTop":0,"scrollWidth":384,"spellcheck":true,"tabIndex":-1,"tagName":"DIV","translate":true,"webkitRegionOverset":"undefined"}],"className":"container","clientHeight":121,"clientLeft":0,"clientTop":0,"clientWidth":384,"contentEditable":"inherit","draggable":false,"hidden":false,"isContentEditable":false,"localName":"div","namespaceURI":"http://www.w3.org/1999/xhtml","nodeName":"DIV","nodeType":1,"offsetHeight":121,"offsetLeft":8,"offsetTop":8,"offsetWidth":384,"scrollHeight":121,"scrollLeft":0,"scrollTop":0,"scrollWidth":384,"spellcheck":true,"tabIndex":-1,"tagName":"DIV","translate":true,"webkitRegionOverset":"undefined"}';
    var dom = watDomJSON.toDOM(watDomJSONAsString, JSON.parse(optionsAsString));

    // assert
    var expectedOuterHTML = '<div class="container" draggable="false" spellcheck="true" tabindex="-1" translate="yes"><span draggable="false" id="username" spellcheck="true" tabindex="-1" translate="yes">1234</span><button class="btn-test" draggable="false" id="button" spellcheck="true" tabindex="0" translate="yes" type="submit" style="width:30px;height:20px"></button><div draggable="false" id="svg-container" spellcheck="true" tabindex="-1" translate="yes"><svg height="100" width="100"><circle cx="50" cy="50" fill="yellow" r="40" stroke="green" stroke-width="4"></circle>      Sorry, your browserdoes not support inline SVG.    </svg></div></div>';
    if (expectedOuterHTML !== dom.firstChild.outerHTML) {
      result = 1;
    }
    return result;
    /* eslint-enable */
  }, JSON.stringify(watJSONConstants.watDomJSON.options.fromWatJSON));

  phantom.exit(result);
} catch (e) {
  console.log(e);
  phantom.exit(-1);
}
