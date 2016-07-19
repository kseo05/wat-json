describe('watDomJSON.toJSON(svgObj);', () => {
  var originalTimeout;

  beforeEach(function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  it('SVG Document/Element 가 포함된 HTML Element 를 전달인자로 실행했을 때, 기대된 형태의 JSON Object 를 반환해야 한다.', function (done) {
    // jsdom 이 svg document 를 지원하지 않으므로, phantomjs 를 이용해서 테스트를 동작시킨다.
    // 해당 phantomjs 의 경로는 scripts/phantomjs/test/watDomJSON-toJSON-SVG.js 이다.
    const path = require('path');
    const childProcess = require('child_process');
    const phantomjs = require('phantomjs-prebuilt');
    const binPath = phantomjs.path;
    var child;

    var childArgs = [
      path.join(__dirname, '../../../scripts/phantomjs/test/watDomJSON-toJSON-SVG.js'),
    ];

    try {
      child = childProcess.execFile(binPath, childArgs, function (err, stdout, stderr) {
        child.kill();
        if (!err) {
          done();
        } else {
          console.log(`err = ${err}`);
          console.log(`stdout = ${stdout}`);
          console.log(`stderr = ${stderr}`);
        }
      });
    } catch (e) {
      if (child) {
        child.kill();
      }
      console.log(`e = ${e}`);
    }
  });

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });
});

describe('watDomJSON.toDOM(svgObj);', () => {
  var originalTimeout;

  beforeEach(function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  it('SVG Document/Element 가 포함된 HTML Element 의 JSON Object 를 전달인자로 실행했을 때, 기대된 형태의 HTML Element 를 반환해야 한다.', function (done) {
    // jsdom 이 svg document 를 지원하지 않으므로, phantomjs 를 이용해서 테스트를 동작시킨다.
    // 해당 phantomjs 의 경로는 scripts/phantomjs/test/watDomJSON-toDOM-SVG.js 이다.
    const path = require('path');
    const childProcess = require('child_process');
    const phantomjs = require('phantomjs-prebuilt');
    const binPath = phantomjs.path;
    var child;

    var childArgs = [
      path.join(__dirname, '../../../scripts/phantomjs/test/watDomJSON-toDOM-SVG.js'),
    ];

    try {
      child = childProcess.execFile(binPath, childArgs, function (err, stdout, stderr) {
        child.kill();
        if (!err) {
          console.log(`stdout = ${stdout}`);
          done();
        } else {
          console.log(`err = ${err}`);
          console.log(`stdout = ${stdout}`);
          console.log(`stderr = ${stderr}`);
        }
      });
    } catch (e) {
      if (child) {
        child.kill();
      }
      console.log(`e = ${e}`);
    }
  });

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });
});
