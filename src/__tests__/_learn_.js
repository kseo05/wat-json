'use strict';

describe('jsesc', () => {
  it('jsesc();', () => {
    const jsesc = require('jsesc');
    var escapedString = jsesc('Lorem ipsum "dolor" sit \'amet\' etc.', { 'quotes': 'single' });
    expect(escapedString).toBe('Lorem ipsum "dolor" sit \\\'amet\\\' etc.');
  });
});

describe('md5', () => {
  it('md5();', () => {
    const md5 = require('md5');
    var md5HashedString = md5('손으로 하늘을 가릴 수 없다.');
    expect(md5HashedString).toBe('d40a3950ccb6c9d82303c3a5e5f74f8b');
  });
});

describe('extend', () => {
  it('extend(); shallow', () => {
    const extend = require('extend');
    var result = extend({
      'a': 'a',
      'b': 'b',
      'c': 'c',
      'd': {
        'a': 'aa',
        'b': 'bb',
      },
    }, {
      'a': 'aa',
      'b': 'b',
      'd': {
        'b': 'bbb',
      },
    });
    expect(result).toEqual({
      'a': 'aa',
      'b': 'b',
      'c': 'c',
      'd': {
        'b': 'bbb',
      },
    });
  });
  it('extend(); deep', () => {
    const extend = require('extend');
    var result = extend(true,{
      'a': 'a',
      'b': 'b',
      'c': 'c',
      'd': {
        'a': 'aa',
        'b': 'bb',
      },
    }, {
      'a': 'aa',
      'b': 'b',
      'd': {
        'b': 'bbb',
      },
    });
    expect(result).toEqual({
      'a': 'aa',
      'b': 'b',
      'c': 'c',
      'd': {
        'a': 'aa',
        'b': 'bbb',
      },
    });
  });
});

describe('acorn & escodegen', () => {
  it('acorn.parse();', () => {
    const acorn = require('acorn');

    // console.log(
    //   JSON.stringify(
    //     acorn.parse('if (x) { (function () {})(); } else { var test = 123; }', { sourceType: 'script' }), null, 2
    //   )
    // );
    // console.log(
    //   JSON.stringify(
    //     acorn.parse('export var answer = 42', { sourceType: 'module' }), null, 2
    //   )
    // );
    // console.log(
    //   JSON.stringify(
    //     acorn.parse('export default { test: function () { return 0; }}', { sourceType: 'module' }), null, 2
    //   )
    // );
    // console.log(
    //   JSON.stringify(
    //     acorn.parse('export default function () {};', { sourceType: 'module' }), null, 2
    //   )
    // );
  });

  it('escodegen.generate();', () => {
    const acorn = require('acorn');
    const escodegen = require('escodegen');
    // console.log(
    //   escodegen.generate(
    //     acorn.parse('if (x) { (function () {})(); } else { var test = 123; }', { sourceType: 'script' })
    //   )
    // );
    // console.log(
    //   escodegen.generate(
    //     acorn.parse('export default function () {};', { sourceType: 'module' })
    //   )
    // );
  });
});

describe('built file "watJSON.min.js"', () => {
  it('should return expected value - watJSON.toWatJSON()', () => {
    const Constants = require('./Constants');
    const watJSON = require('../../dist/watJSON.min');

    document.body.innerHTML = Constants.sample.bodyString;
    var htmlElement = document.getElementsByClassName('container')[0];

    console.log(watJSON.toWatJSON(htmlElement, Constants.options.available));
  });
});
