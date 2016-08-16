'use strict';

const Constants = require('./Constants');

describe('watJSON.fromWatJSON(json, opt);', () => {
  describe('object 가 아닌 primitive type variable 의 변환 결과를 전달인자로 받았을 때', () => {
    it('string 을 전달인자로 fromWatJSON 실행 시, 기대된 형태의 리턴값을 얻어야 한다.', () => {
      const watJSON = require('../WatJSON');
      var sampleObject = {
        '__STRING__': 'string',
      };
      var result = watJSON.fromWatJSON(sampleObject);
      expect(result).toEqual('string');
    });
    it('number 를 전달인자로 fromWatJSON 실행 시, 기대된 형태의 리턴값을 얻어야 한다.', () => {
      const watJSON = require('../WatJSON');
      var sampleObject = {
        '__NUMBER__': 123,
      };
      var result = watJSON.fromWatJSON(sampleObject);
      expect(result).toEqual(123);
    });
    it('boolean 을 전달인자로 fromWatJSON 실행 시, 기대된 형태의 리턴값을 얻어야 한다.', () => {
      const watJSON = require('../WatJSON');
      var sampleObject = {
        '__BOOLEAN__': true,
      };
      var result = watJSON.fromWatJSON(sampleObject);
      expect(result).toEqual(true);
    });
    it('null 을 전달인자로 fromWatJSON 실행 시, 기대된 형태의 리턴값을 얻어야 한다.', () => {
      const watJSON = require('../WatJSON');
      var sampleObject = {
        '__NULL__': null,
      };
      var result = watJSON.fromWatJSON(sampleObject);
      expect(result).toEqual(null);
    });
  });

  describe('Array object 의 변환 결과를 전달인자로 받았을 때', () => {
    it('array 를 전달인자로 fromWatJSON 실행 시, 기대된 형태의 리턴값을 얻어야 한다.', () => {
      const watJSON = require('../WatJSON');
      var sampleObject = {
        '__ARRAY__': [ 1,2,3 ],
      };
      var result = watJSON.fromWatJSON(sampleObject);
      expect(result).toEqual([ 1,2,3 ]);
    });
    iit('array 를 전달인자로 자기참조 상태에서 fromWatJSON 실행 시, 기대된 형태의 리턴값을 얻어야 한다.', () => {
      const watJSON = require('../WatJSON');
      var sampleObject = {
        '__ARRAY__': [ 1,2,3,{ '__OBJLINK__': 1, } ],
        '__OBJALIAS__': 1,
      };
      var result = watJSON.fromWatJSON(sampleObject);
      expect(result[0]).toEqual(1);
      expect(result[1]).toEqual(2);
      expect(result[2]).toEqual(3);
      expect(result[3]).toBe(result);
    });
    iit('array 를 전달인자로 순환참조 상태에서 fromWatJSON 실행 시, 기대된 형태의 리턴값을 얻어야 한다.', () => {
      const watJSON = require('../WatJSON');
      var sampleObject = {
        'a': {
          '__ARRAY__': [ 1,2,3,{ '__OBJLINK__': 2, } ],
          '__OBJALIAS__': 1,
        },
        'b': {
          '__ARRAY__': [ 1,2,3,{ '__OBJLINK__': 1, } ],
          '__OBJALIAS__': 2,
        },
      };
      var result = watJSON.fromWatJSON(sampleObject);
      expect(result.a).toBeDefined();
      expect(result.a[0]).toEqual(1);
      expect(result.a[1]).toEqual(2);
      expect(result.a[2]).toEqual(3);
      expect(result.b).toBeDefined();
      expect(result.b[0]).toEqual(1);
      expect(result.b[1]).toEqual(2);
      expect(result.b[2]).toEqual(3);

      expect(result.a[3]).toBe(result.b);
      expect(result.b[3]).toBe(result.a);
    });
  });

  describe('JSON Object 에 대한 WatJSONObject 를 전달인자로 받았을 때', () => {
    it('기본 옵션으로 toWatJSON 실행 시, 기대된 형태의 object 를 리턴해야 한다.', () => {
      const watJSON = require('../WatJSON');
      var sampleObject = Constants.sample.fromWatJSON.JSONObject.default;
      var result = watJSON.fromWatJSON(sampleObject);
      expect(result).toEqual(Constants.sample.toWatJSON.JSONObject.default);
    });
    it('모든 파싱 가능한 요소들을 추가한 옵션으로 fromWatJSON 실행 시, 기대된 형태의 object 를 리턴해야 한다.', () => {
      const watJSON = require('../WatJSON');
      var sampleObject = Constants.sample.fromWatJSON.JSONObject.available;
      var result = watJSON.fromWatJSON(sampleObject, Constants.options.available);
      expect(result).toEqual(Constants.sample.toWatJSON.JSONObject.available);
    });
  });

  describe('Javascript Object 에 대한 WatJSONObject 를 전달인자로 받았을 때', () => {
    it('기본 옵션으로 fromWatJSON 실행 시, 기대된 형태의 object 를 리턴해야 한다.', () => {
      const watJSON = require('../WatJSON');
      var sampleObject = Constants.sample.fromWatJSON.inst.default;
      var result = watJSON.fromWatJSON(sampleObject);
      expect(typeof result).toEqual('object');
      expect(result.str).toEqual('Hello');
      expect(result.undef).toEqual(undefined);
      expect(result.nan).toEqual(NaN);
      expect(result.infinity).toEqual(Infinity);
      expect(result.date).toEqual(new Date(1234));
      expect(result.regexp).toEqual(new RegExp('test', 'g'));
      var proto = Object.getPrototypeOf(result);
      expect(proto).toEqual({});
    });
    it('모든 파싱 가능한 요소들을 추가한 옵션으로 fromWatJSON 실행 시, 기대된 형태의 object 를 리턴해야 한다.', () => {
      const $ = require('jquery');
      const watJSON = require('../WatJSON');
      var sampleObject = Constants.sample.fromWatJSON.inst.available;
      var result = watJSON.fromWatJSON(sampleObject, Constants.options.available);
      expect(typeof result).toEqual('object');
      expect(result.str).toEqual('Hello');
      expect(result.undef).toEqual(undefined);
      expect(result.nan).toEqual(NaN);
      expect(result.infinity).toEqual(Infinity);
      expect(result.date).toEqual(new Date(1234));
      expect(result.regexp).toEqual(new RegExp('test', 'g'));
      expect($(result.htmlElement).hasClass('container')).toBe(true);
      expect($(result.htmlElement).children().eq(0).text()).toEqual('1234');
      expect($(result.htmlElement).children().eq(1).hasClass('btn-test')).toBe(true);
      expect($(result.htmlCollection[0]).hasClass('btn-test')).toBe(true);
      var proto = Object.getPrototypeOf(result);
      expect(typeof proto).toEqual('object');
      expect(typeof proto.func).toEqual('function');
      expect(typeof proto.constructor).toEqual('function');
      var rootProto = Object.getPrototypeOf(proto);
      expect(rootProto).toBe(Object.prototype);
    });
  });

  describe('Class Instance 에 대한 WatJSONObject 를 전달인자로 받았을 때', () => {
    it('기본 옵션으로 fromWatJSON 실행 시, 기대된 형태의 object 를 리턴해야 한다.', () => {
      const watJSON = require('../WatJSON');
      var sampleObject = Constants.sample.fromWatJSON.classInst.default;
      var result = watJSON.fromWatJSON(sampleObject);
      expect(typeof result).toEqual('object');
      expect(result.str).toEqual('Hello');
      expect(result.undef).toEqual(undefined);
      expect(result.nan).toEqual(NaN);
      expect(result.infinity).toEqual(Infinity);
      expect(result.date).toEqual(new Date(1234));
      expect(result.regexp).toEqual(new RegExp('test', 'g'));
      var proto = Object.getPrototypeOf(result);
      expect(proto).toEqual({});
    });
    it('모든 파싱 가능한 요소들을 추가한 옵션으로 fromWatJSON 실행 시, 기대된 형태의 object 를 리턴해야 한다.', () => {
      const $ = require('jquery');
      const watJSON = require('../WatJSON');
      var sampleObject = Constants.sample.fromWatJSON.classInst.available;
      var result = watJSON.fromWatJSON(sampleObject, Constants.options.available);
      expect(typeof result).toEqual('object');
      expect(result.str).toEqual('Hello');
      expect(result.undef).toEqual(undefined);
      expect(result.nan).toEqual(NaN);
      expect(result.infinity).toEqual(Infinity);
      expect(result.date).toEqual(new Date(1234));
      expect(result.regexp).toEqual(new RegExp('test', 'g'));
      expect($(result.htmlElement).hasClass('container')).toBe(true);
      expect($(result.htmlElement).children().eq(0).text()).toEqual('1234');
      expect($(result.htmlElement).children().eq(1).hasClass('btn-test')).toBe(true);
      expect($(result.htmlCollection[0]).hasClass('btn-test')).toBe(true);
      var proto = Object.getPrototypeOf(result);
      expect(typeof proto).toEqual('object');
      expect(typeof proto.func).toEqual('function');
      expect(typeof proto.constructor).toEqual('function');
      var rootProto = Object.getPrototypeOf(proto);
      expect(rootProto).toBe(Object.prototype);
    });
    it('JSON 스펙에 의거한 속성만을 파싱하도록 옵션을 주고 fromWatJSON 실행 시, 기대된 형태의 object 를 리턴해야 한다.', () => {
      const watJSON = require('../WatJSON');
      var sampleObject = Constants.sample.fromWatJSON.classInst.available;
      var result = watJSON.fromWatJSON(sampleObject, Constants.options.minimized);
      expect(result).toEqual({
        'str': 'Hello',
      });
    });
  });
});
