/* global document */
'use strict';

const Constants = require('./Constants');

describe('watJSON.toWatJSON(obj, opt);', () => {
  it('string 을 전달인자로 toWatJSON 실행 시, 기대된 형태의 json object 를 리턴해야 한다.', () => {
    const watJSON = require('../watJSON');
    var sampleObject = Constants.sample.toWatJSON.string;
    var result = watJSON.toWatJSON(sampleObject);
    expect(result).toEqual(Constants.sample.fromWatJSON.string);
  });
  it('number 를 전달인자로 toWatJSON 실행 시, 기대된 형태의 json object 를 리턴해야 한다.', () => {
    const watJSON = require('../watJSON');
    var sampleObject = Constants.sample.toWatJSON.number;
    var result = watJSON.toWatJSON(sampleObject);
    expect(result).toEqual(Constants.sample.fromWatJSON.number);
  });
  it('boolean 을 전달인자로 toWatJSON 실행 시, 기대된 형태의 json object 를 리턴해야 한다.', () => {
    const watJSON = require('../watJSON');
    var sampleObject = Constants.sample.toWatJSON.bool;
    var result = watJSON.toWatJSON(sampleObject);
    expect(result).toEqual(Constants.sample.fromWatJSON.bool);
  });
  it('null 을 전달인자로 toWatJSON 실행 시, 기대된 형태의 json object 를 리턴해야 한다.', () => {
    const watJSON = require('../watJSON');
    var sampleObject = Constants.sample.toWatJSON.nul;
    var result = watJSON.toWatJSON(sampleObject);
    expect(result).toEqual(Constants.sample.fromWatJSON.nul);
  });
  it('array 를 전달인자로 toWatJSON 실행 시, 기대된 형태의 json object 를 리턴해야 한다.', () => {
    const watJSON = require('../watJSON');
    var sampleObject = Constants.sample.toWatJSON.array;
    var result = watJSON.toWatJSON(sampleObject);
    expect(result).toEqual(Constants.sample.fromWatJSON.array);
  });

  describe('JSON Object 를 전달인자로 받았을 때', () => {
    it('기본 옵션으로 toWatJSON 실행 시, 기대된 형태의 json object를 리턴해야 한다.', () => {
      const watJSON = require('../watJSON');
      var sampleObject = Constants.sample.toWatJSON.JSONObject.available;
      var result = watJSON.toWatJSON(sampleObject);
      expect(result).toEqual(Constants.sample.fromWatJSON.JSONObject.default);
    });
    it('모든 파싱 가능한 요소들을 추가한 옵션으로 toWatJSON 실행 시, 기대된 형태의 json object를 리턴해야 한다.', () => {
      const watJSON = require('../watJSON');
      var sampleObject = Constants.sample.toWatJSON.JSONObject.available;
      var result = watJSON.toWatJSON(sampleObject, Constants.options.available);
      expect(result).toEqual(Constants.sample.fromWatJSON.JSONObject.available);
    });
  });

  describe('Javascript Object 를 전달인자로 받았을 때', () => {
    it('기본 옵션으로 toWatJSON 실행 시, 기대된 형태의 json object 를 리턴해야 한다.', () => {
      const watJSON = require('../watJSON');
      var sampleObject = Constants.sample.toWatJSON.inst.available;
      document.body.innerHTML = Constants.sample.bodyString;
      sampleObject.htmlElement = document.getElementsByClassName('container')[0];
      sampleObject.htmlCollection = document.getElementsByClassName('btn-test');
      var result = watJSON.toWatJSON(sampleObject);
      expect(result).toEqual(Constants.sample.fromWatJSON.inst.default);
    });
    it('모든 파싱 가능한 요소들을 추가한 옵션으로 toWatJSON 실행 시, 기대된 형태의 json object 를 리턴해야 한다.', () => {
      const watJSON = require('../watJSON');
      var sampleObject = Constants.sample.toWatJSON.inst.available;
      document.body.innerHTML = Constants.sample.bodyString;
      sampleObject.htmlElement = document.getElementsByClassName('container')[0];
      sampleObject.htmlCollection = document.getElementsByClassName('btn-test');
      var result = watJSON.toWatJSON(sampleObject, Constants.options.available);
      expect(typeof result).toBe('object');
      expect(result.str).toEqual('Hello');
      expect(result.undef).toEqual({ '__UNDEFINED__':true });
      expect(result.nan).toEqual({ '__NAN__':true });
      expect(result.infinity).toEqual({ '__INFINITY__':true });
      expect(result.date).toEqual({ '__DATE__':'new Date(1234)' });
      expect(result.regexp).toEqual({ '__REGEXP__':'new RegExp("test","g")' });
      expect(result.htmlElement.__HTMLELEMENT__ instanceof Object).toBe(true);
      expect(result.htmlCollection.__HTMLCOLLECTION__ instanceof Array).toBe(true);
      expect(result.memberFunc.__FUNCTION__ instanceof Object).toBe(true);
      expect(result.memberFunc.__FUNCTION__.ast instanceof Object).toBe(true);
      expect(result.__PROTO__.__CONSTRUCTOR__.__FUNCTION__ instanceof Object).toBe(true);
      expect(result.__PROTO__.__CONSTRUCTOR__.__FUNCTION__.ast instanceof Object).toBe(true);
      expect(result.__PROTO__.func.__FUNCTION__ instanceof Object).toBe(true);
      expect(result.__PROTO__.func.__FUNCTION__.ast instanceof Object).toBe(true);
      expect(result.__PROTO__.__PROTO__.__ROOTPROTO__).toBe(true);
    });
  });

  describe('Class Instance 를 전달인자로 받았을 때', () => {
    it('기본 옵션으로 toWatJSON 실행 시, 기대된 형태의 json object 를 리턴해야 한다.', () => {
      const watJSON = require('../watJSON');
      var sampleObject = Constants.sample.toWatJSON.classInst.available;
      document.body.innerHTML = Constants.sample.bodyString;
      sampleObject.htmlElement = document.getElementsByClassName('container')[0];
      sampleObject.htmlCollection = document.getElementsByClassName('btn-test');
      var result = watJSON.toWatJSON(sampleObject);
      expect(result).toEqual(Constants.sample.fromWatJSON.classInst.default);
    });
    it('모든 파싱 가능한 요소들을 추가한 옵션으로 toWatJSON 실행 시, 기대된 형태의 json object 를 리턴해야 한다.', () => {
      const watJSON = require('../watJSON');
      var sampleObject = Constants.sample.toWatJSON.classInst.available;
      document.body.innerHTML = Constants.sample.bodyString;
      sampleObject.htmlElement = document.getElementsByClassName('container')[0];
      sampleObject.htmlCollection = document.getElementsByClassName('btn-test');
      var result = watJSON.toWatJSON(sampleObject, Constants.options.available);
      expect(typeof result).toBe('object');
      expect(result.str).toEqual('Hello');
      expect(result.undef).toEqual({ '__UNDEFINED__':true });
      expect(result.nan).toEqual({ '__NAN__':true });
      expect(result.infinity).toEqual({ '__INFINITY__':true });
      expect(result.date).toEqual({ '__DATE__':'new Date(1234)' });
      expect(result.regexp).toEqual({ '__REGEXP__':'new RegExp("test","g")' });
      expect(result.htmlElement.__HTMLELEMENT__ instanceof Object).toBe(true);
      expect(result.htmlCollection.__HTMLCOLLECTION__ instanceof Array).toBe(true);
      expect(result.memberFunc.__FUNCTION__ instanceof Object).toBe(true);
      expect(result.memberFunc.__FUNCTION__.ast instanceof Object).toBe(true);
      expect(result.__PROTO__.__CONSTRUCTOR__.__FUNCTION__ instanceof Object).toBe(true);
      expect(result.__PROTO__.__CONSTRUCTOR__.__FUNCTION__.ast instanceof Object).toBe(true);
      expect(result.__PROTO__.func.__FUNCTION__ instanceof Object).toBe(true);
      expect(result.__PROTO__.func.__FUNCTION__.ast instanceof Object).toBe(true);
      expect(result.__PROTO__.__PROTO__.__ROOTPROTO__).toBe(true);
    });
    it('JSON 스펙에 의거한 속성만을 파싱하도록 옵션을 주고 toWatJSON 실행 시, 기대된 형태의 json object 를 리턴해야 한다.', () => {
      const watJSON = require('../watJSON');
      var sampleObject = Constants.sample.toWatJSON.classInst.available;
      document.body.innerHTML = Constants.sample.bodyString;
      sampleObject.htmlElement = document.getElementsByClassName('container')[0];
      sampleObject.htmlCollection = document.getElementsByClassName('btn-test');
      var result = watJSON.toWatJSON(sampleObject, Constants.options.minimized);
      expect(result).toEqual(Constants.sample.fromWatJSON.classInst.minimized);
    });
  });
});
