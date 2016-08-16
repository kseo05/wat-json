'use strict';

const JSONObjectPathManager = require('../JSONObjectPathManager');


describe('JSONObjectPathManager', () => {
  it('init();', () => {
    var objPathMgr = new JSONObjectPathManager();
    objPathMgr.init();
    expect(objPathMgr.getCurrentPath()).toEqual('$.0');
  });
  it('increaseDepth();', () => {
    var objPathMgr = new JSONObjectPathManager();
    objPathMgr.init();
    expect(objPathMgr.getCurrentPath()).toEqual('$.1');
  });
});
