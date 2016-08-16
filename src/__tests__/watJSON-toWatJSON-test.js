/* global document */
'use strict';

const Constants = require('./Constants');

describe('watJSON.toWatJSON(obj, opt);', () => {
  describe('object 가 아닌 primitive type variable 을 전달인자로 받았을 때', () => {
    it('string 을 전달인자로 toWatJSON 실행 시, 기대된 형태의 json object 를 리턴해야 한다.', () => {
      const watJSON = require('../WatJSON');
      var sampleObject = 'string';
      var result = watJSON.toWatJSON(sampleObject);
      expect(result).toEqual({
        '__STRING__': 'string',
      });
    });
    it('number 를 전달인자로 toWatJSON 실행 시, 기대된 형태의 json object 를 리턴해야 한다.', () => {
      const watJSON = require('../WatJSON');
      var sampleObject = 123;
      var result = watJSON.toWatJSON(sampleObject);
      expect(result).toEqual({
        '__NUMBER__': 123,
      });
    });
    it('boolean 을 전달인자로 toWatJSON 실행 시, 기대된 형태의 json object 를 리턴해야 한다.', () => {
      const watJSON = require('../WatJSON');
      var sampleObject = true;
      var result = watJSON.toWatJSON(sampleObject);
      expect(result).toEqual({
        '__BOOLEAN__': true,
      });
    });
    it('null 을 전달인자로 toWatJSON 실행 시, 기대된 형태의 json object 를 리턴해야 한다.', () => {
      const watJSON = require('../WatJSON');
      var sampleObject = null;
      var result = watJSON.toWatJSON(sampleObject);
      expect(result).toEqual({
        '__NULL__': null,
      });
    });
  });

  describe('Array object 를 전달인자로 받았을 때', () => {
    it('array 를 전달인자로 toWatJSON 실행 시, 기대된 형태의 json object 를 리턴해야 한다.', () => {
      const watJSON = require('../WatJSON');
      var sampleObject = [ 1,2,3 ];
      debugger;
      var result = watJSON.toWatJSON(sampleObject);
      expect(result).toEqual({
        '__ARRAY__': [ 1,2,3 ],
      });
    });
    iit('array 를 전달인자로 자기참조 상태에서 toWatJSON 실행 시, 기대된 형태의 json object 를 리턴해야 한다.', () => {
      const watJSON = require('../WatJSON');
      var sampleObject = [ 1,2,3 ];
      sampleObject[sampleObject.length] = sampleObject;
      var result = watJSON.toWatJSON(sampleObject);

      /*
       * {
       *   __ARRAY__: [
       *     1,
       *     2,
       *     3,
       *     {
       *       __OBJLINK__: "001"
       *     }
       *   ],
       *   __OBJALIAS__: "001"
       * }
       */
      expect(result.__ARRAY__).toBeDefined();
      expect(result.__ARRAY__[0]).toEqual(1);
      expect(result.__ARRAY__[1]).toEqual(2);
      expect(result.__ARRAY__[2]).toEqual(3);
      expect(result.__ARRAY__[3]).toBeDefined();
      expect(result.__ARRAY__[3].__OBJLINK__).toBeDefined();
      expect(result.__OBJALIAS__).toBeDefined();
      expect(result.__OBJALIAS__).toEqual(result.__ARRAY__[3].__OBJLINK__);
    });
    iit('array 를 전달인자로 순환참조 상태에서 toWatJSON 실행 시, 기대된 형태의 json object 를 리턴해야 한다.', () => {
      const watJSON = require('../WatJSON');
      var sampleObject = new (function () {})();
      sampleObject.a = [ 1,2,3 ];
      sampleObject.b = [ 1,2,3 ];
      sampleObject.a[sampleObject.a.length] = sampleObject.b;
      sampleObject.b[sampleObject.b.length] = sampleObject.a;
      var result = watJSON.toWatJSON(sampleObject);

      /*
       * {
       *   a: {
       *     __ARRAY__: [
       *       1,
       *       2,
       *       3,
       *       {
       *         __OBJLINK__: "002"
       *       }
       *     ],
       *     __OBJALIAS__: "001"
       *   },
       *   b: {
       *     __ARRAY__: [
       *       1,
       *       2,
       *       3,
       *       {
       *         __OBJLINK__: "001"
       *       }
       *     ],
       *     __OBJALIAS__: "002"
       *   }
       * }
       */
      expect(result.a).toBeDefined();
      expect(result.a.__ARRAY__).toBeDefined();
      expect(result.a.__ARRAY__[0]).toEqual(1);
      expect(result.a.__ARRAY__[1]).toEqual(2);
      expect(result.a.__ARRAY__[2]).toEqual(3);
      expect(result.b).toBeDefined();
      expect(result.b.__ARRAY__).toBeDefined();
      expect(result.b.__ARRAY__[0]).toEqual(1);
      expect(result.b.__ARRAY__[1]).toEqual(2);
      expect(result.b.__ARRAY__[2]).toEqual(3);

      expect(result.a.__ARRAY__[3].__OBJLINK__).toBeDefined();
      expect(result.b.__OBJALIAS__).toBeDefined();
      expect(result.b.__OBJALIAS__).toEqual(result.a.__ARRAY__[3].__OBJLINK__);
      expect(result.b.__ARRAY__[3].__OBJLINK__).toBeDefined();
      expect(result.a.__OBJALIAS__).toBeDefined();
      expect(result.a.__OBJALIAS__).toEqual(result.b.__ARRAY__[3].__OBJLINK__);
    });
  });

  describe('JSON Object 를 전달인자로 받았을 때', () => {
    it('기본 옵션으로 toWatJSON 실행 시, 기대된 형태의 json object를 리턴해야 한다.', () => {
      const watJSON = require('../WatJSON');
      var sampleObject = Constants.sample.toWatJSON.JSONObject.available;
      var result = watJSON.toWatJSON(sampleObject);
      expect(result).toEqual(Constants.sample.fromWatJSON.JSONObject.default);
    });
    it('모든 파싱 가능한 요소들을 추가한 옵션으로 toWatJSON 실행 시, 기대된 형태의 json object를 리턴해야 한다.', () => {
      const watJSON = require('../WatJSON');
      var sampleObject = Constants.sample.toWatJSON.JSONObject.available;
      var result = watJSON.toWatJSON(sampleObject, Constants.options.available);
      expect(result).toEqual(Constants.sample.fromWatJSON.JSONObject.available);
    });
  });

  describe('Javascript Object 를 전달인자로 받았을 때', () => {
    it('기본 옵션으로 toWatJSON 실행 시, 기대된 형태의 json object 를 리턴해야 한다.', () => {
      const watJSON = require('../WatJSON');
      var sampleObject = Constants.sample.toWatJSON.inst.available;
      document.body.innerHTML = Constants.sample.bodyString;
      sampleObject.htmlElement = document.getElementsByClassName('container')[0];
      sampleObject.htmlCollection = document.getElementsByClassName('btn-test');
      var result = watJSON.toWatJSON(sampleObject);
      expect(result).toEqual(Constants.sample.fromWatJSON.inst.default);
    });
    it('모든 파싱 가능한 요소들을 추가한 옵션으로 toWatJSON 실행 시, 기대된 형태의 json object 를 리턴해야 한다.', () => {
      const watJSON = require('../WatJSON');
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
      expect(result.__PROTO__.$$CONSTRUCTOR$$.__FUNCTION__ instanceof Object).toBe(true);
      expect(result.__PROTO__.$$CONSTRUCTOR$$.__FUNCTION__.ast instanceof Object).toBe(true);
      expect(result.__PROTO__.func.__FUNCTION__ instanceof Object).toBe(true);
      expect(result.__PROTO__.func.__FUNCTION__.ast instanceof Object).toBe(true);
      expect(result.__PROTO__.__PROTO__.__ROOTPROTO__).toBe(true);
    });
    it('상호 참조하는 객체에 대해 모든 파싱 가능한 요소들을 추가한 옵션으로 toWatJSON 실행 시, 기대된 형태의 json object 를 리턴해야 한다.', () => {
      const watJSON = require('../WatJSON');
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
      expect(result.__PROTO__.$$CONSTRUCTOR$$.__FUNCTION__ instanceof Object).toBe(true);
      expect(result.__PROTO__.$$CONSTRUCTOR$$.__FUNCTION__.ast instanceof Object).toBe(true);
      expect(result.__PROTO__.func.__FUNCTION__ instanceof Object).toBe(true);
      expect(result.__PROTO__.func.__FUNCTION__.ast instanceof Object).toBe(true);
      expect(result.__PROTO__.__PROTO__.__ROOTPROTO__).toBe(true);
    });
  });

  describe('Class Instance 를 전달인자로 받았을 때', () => {
    it('기본 옵션으로 toWatJSON 실행 시, 기대된 형태의 json object 를 리턴해야 한다.', () => {
      const watJSON = require('../WatJSON');
      var sampleObject = Constants.sample.toWatJSON.classInst.available;
      document.body.innerHTML = Constants.sample.bodyString;
      sampleObject.htmlElement = document.getElementsByClassName('container')[0];
      sampleObject.htmlCollection = document.getElementsByClassName('btn-test');
      var result = watJSON.toWatJSON(sampleObject);
      expect(result).toEqual(Constants.sample.fromWatJSON.classInst.default);
    });
    it('모든 파싱 가능한 요소들을 추가한 옵션으로 toWatJSON 실행 시, 기대된 형태의 json object 를 리턴해야 한다.', () => {
      const watJSON = require('../WatJSON');
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
      expect(result.__PROTO__.$$CONSTRUCTOR$$.__FUNCTION__ instanceof Object).toBe(true);
      expect(result.__PROTO__.$$CONSTRUCTOR$$.__FUNCTION__.ast instanceof Object).toBe(true);
      expect(result.__PROTO__.func.__FUNCTION__ instanceof Object).toBe(true);
      expect(result.__PROTO__.func.__FUNCTION__.ast instanceof Object).toBe(true);
      expect(result.__PROTO__.__PROTO__.__ROOTPROTO__).toBe(true);
    });
    it('JSON 스펙에 의거한 속성만을 파싱하도록 옵션을 주고 toWatJSON 실행 시, 기대된 형태의 json object 를 리턴해야 한다.', () => {
      const watJSON = require('../WatJSON');
      var sampleObject = Constants.sample.toWatJSON.classInst.available;
      document.body.innerHTML = Constants.sample.bodyString;
      sampleObject.htmlElement = document.getElementsByClassName('container')[0];
      sampleObject.htmlCollection = document.getElementsByClassName('btn-test');
      var result = watJSON.toWatJSON(sampleObject, Constants.options.minimized);
      expect(result).toEqual(Constants.sample.fromWatJSON.classInst.minimized);
    });
  });
});
