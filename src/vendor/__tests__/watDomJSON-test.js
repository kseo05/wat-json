/* global document, __dirname */
'use strict';

const Constants = require('../../__tests__/Constants');

describe('watDomJSON.toJSON(obj);', () => {
  it('일반 HTML Element 를 전달인자로 실행했을 때, 기대된 형태의 JSON Object 를 반환해야 한다.', () => {
    const $ = require('jquery');
    const watDomJSON = require('../watDomJSON');

    document.body.innerHTML = Constants.sample.bodyString;

    var json = watDomJSON.toJSON($('.container').get(0), {});

    // domjson
    expect(json.node.tagName).toEqual('DIV');
    expect(json.node.attributes.class).toEqual('container');
    expect(json.node.childNodes[0].tagName).toEqual('SPAN');
    expect(json.node.childNodes[0].attributes.id).toEqual('username');
    expect(json.node.childNodes[0].childNodes[0].nodeType).toEqual(3);
    expect(json.node.childNodes[0].childNodes[0].nodeValue).toEqual('1234');
    expect(json.node.childNodes[1].tagName).toEqual('BUTTON');
    expect(json.node.childNodes[1].attributes.id).toEqual('button');
    expect(json.node.childNodes[1].attributes.class).toEqual('btn-test');
    expect(json.node.childNodes[1].attributes.style).toEqual('width:30px;height:20px');
    // console.log(JSON.stringify(json, null, 2));
  });

  it('SVG Document 가 포함된 HTML Element 를 전달인자로 실행했을 때, 기대된 형태의 JSON Object 를 반환해야 한다.', function (done) {
    // jsdom 이 svg doucment 를 지원하지 않으므로, phantomjs 를 이용해서 테스트를 동작시킨다.
    // 해당 phantomjs 의 경로는 /scripts/phantomjs/test/watDomJSON-toJSON.js 이다.
    const path = require('path');
    const childProcess = require('child_process');
    const phantomjs = require('phantomjs-prebuilt');
    const binPath = phantomjs.path;

    var childArgs = [
      path.join(__dirname, '../../../scripts/phantomjs/test/watDomJSON-toJSON.js'),
    ];

    childProcess.execFile(binPath, childArgs, function (err, stdout, stderr) {
      if (!err) {
        done();
      }
    });
  }, 10000);

});

describe('watDomJSON.toDOM(obj);', () => {
  it('일반 HTML Element 의 JSON Object 를 전달인자로 실행했을 때, 기대된 형태의 HTML Element 를 반환해야 한다.', () => {
    const $ = require('jquery');
    const watDomJSON = require('../watDomJSON');

    document.body.innerHTML = Constants.sample.bodyString;

    var dom = watDomJSON.toDOM(
      {
        'nodeType': 1,
        'tagName': 'BUTTON',
        'attributes': {
          'id': 'button2',
          'class': 'btn-test',
          'style': 'width:50px;height:50px',
        },
        'childNodes': [],
      }, {
        'metadata': false,
        'noMeta': true,
      }
    );
    expect($('#button2').length).toBe(0);

    $('.container').get(0).appendChild(dom);

    expect($('#button2').length).toBe(1);
    expect($('#button2').css('width')).toBe('50px');
    expect($('#button2').css('height')).toBe('50px');
  });

  it('SVG Document 가 포함된 HTML Element 의 JSON Object 를 전달인자로 실행했을 때, 기대된 형태의 HTML Element 를 반환해야 한다.', function (done) {
    // jsdom 이 svg doucment 를 지원하지 않으므로, phantomjs 를 이용해서 테스트를 동작시킨다.
    // 해당 phantomjs 의 경로는 /scripts/phantomjs/test/watDomJSON-toDOM.js 이다.
    const path = require('path');
    const childProcess = require('child_process');
    const phantomjs = require('phantomjs-prebuilt');
    const binPath = phantomjs.path;

    var childArgs = [
      path.join(__dirname, '../../../scripts/phantomjs/test/watDomJSON-toDOM.js'),
    ];

    childProcess.execFile(binPath, childArgs, function (err, stdout, stderr) {
      if (!err) {
        done();
      }
    });
  }, 10000);
});
