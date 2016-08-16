'use strict';

const commonUtils = require('../CommonUtils');

describe('new commonUtils.Ctor();', () => {
  it('Javascript object constructor 로의 기능이 올바르게 동작해야 한다.', () => {
    const Ctor = commonUtils.Ctor;
    var obj = new Ctor();
    expect(typeof obj).toEqual('object');
    expect(obj instanceof Object).toBeTruthy();
  });
});

describe('commonUtils.extend(target, ...sources);', () => {
  var target, source1, source2;

  beforeEach(() => {
    target = {
      'a': 'a',
      'b': 1,
      'c': null,
      'd': { 'a': 'a' },
      'e': [ 1, 2, 3 ],
    };
    source1 = {
      'a': 'b',
      'd': { 'b': 'b' },
      'e': [ 1, 2 ],
    };
    source2 = {
      'b': 2,
      'd': { 'c': 'c' },
    };
  });

  it('다수의 source 전달인자로 실행 시, 기대된 값을 반환해야 한다.', () => {
    var result = commonUtils.extend(target, source1, source2);
    expect(result).toEqual({
      'a': 'b',
      'b': 2,
      'c': null,
      'd': { 'c': 'c' },
      'e': [ 1, 2 ],
    });
  });
});

describe('commonUtils.clone(obj);', () => {
  var object;

  beforeEach(() => {
    object = {
      'a': 'a',
      'b': 1,
      'c': null,
      'd': { 'a': 'a' },
      'e': [ 1, 2, 3 ],
    };
  });

  it('실행 시, 기대된 반환값이 shallow-copied object 여야 한다.', () => {
    var result = commonUtils.clone(object);
    result.a = 'b';
    result.e[0] = 2;

    expect(result).toEqual({
      'a': 'b',
      'b': 1,
      'c': null,
      'd': { 'a': 'a' },
      'e': [ 2, 2, 3 ],
    });

    expect(object).toEqual({
      'a': 'a',
      'b': 1,
      'c': null,
      'd': { 'a': 'a' },
      'e': [ 2, 2, 3 ],
    });
  });
});

describe('commonUtils.escapeJSON(str);', () => {
  var str = "\tNeque porro quisquam est qui dolorem ipsum quia \"dolor\" sit 'amet', 'consectetur', 'adipisci velit'...\n";

  it('실행 시, 문자로 감쌀 수 있는 형태의 json-escaped 문자열을 반환해야 한다.', () => {
    var result = commonUtils.escapeJSON(str);

    expect(result).toEqual("\\tNeque porro quisquam est qui dolorem ipsum quia \\\"dolor\\\" sit 'amet', 'consectetur', 'adipisci velit'...\\n");
  });
});

describe('commonUtils.evalInContext(code, context)', () => {
  it('실행 시, 의도된 context 로 javascript code 가 evaluate 되어야 한다.', () => {
    var object = (function () {
      var Clazz = function () {
        this.str = "Neque porro quisquam est qui dolorem ipsum quia dolor sit 'amet', 'consectetur', 'adipisci velit'...";
      };
      return new Clazz();
    })();
    object.getString = commonUtils.evalInContext('[function () { return this.str; }][0];', object);
    expect(object.getString()).toEqual("Neque porro quisquam est qui dolorem ipsum quia dolor sit 'amet', 'consectetur', 'adipisci velit'...");
  });
});
