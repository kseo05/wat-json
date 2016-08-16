'use strict';

describe('watStack', () => {
  it('push() & size() & pop()', () => {
    const Stack = require('../WatStack');

    var stack = new Stack();

    expect(stack.size()).toEqual(0);
    stack.push(1);
    stack.push(2);
    stack.push(3);
    stack.push(4);
    stack.push(5);
    expect(stack.size()).toEqual(5);
    expect(stack.pop()).toEqual(5);
    expect(stack.size()).toEqual(4);
    expect(stack.pop()).toEqual(4);
    expect(stack.size()).toEqual(3);
    expect(stack.pop()).toEqual(3);
    expect(stack.size()).toEqual(2);
    expect(stack.pop()).toEqual(2);
    expect(stack.size()).toEqual(1);
    expect(stack.pop()).toEqual(1);
    expect(stack.size()).toEqual(0);
    expect(stack.pop).toThrowError(TypeError);

    stack.push('a');
    stack.push('b');
    stack.push('c');
    stack.push('d');
    stack.push('e');
    expect(stack.size()).toEqual(5);
    expect(stack.pop()).toEqual('e');
    expect(stack.size()).toEqual(4);
    expect(stack.pop()).toEqual('d');
    expect(stack.size()).toEqual(3);
    expect(stack.pop()).toEqual('c');
    expect(stack.size()).toEqual(2);
    expect(stack.pop()).toEqual('b');
    expect(stack.size()).toEqual(1);
    expect(stack.pop()).toEqual('a');
    expect(stack.size()).toEqual(0);
    expect(stack.pop).toThrowError(TypeError);

  });
  it('indexOf()', () => {
    const Stack = require('../watStack');

    var stack = new Stack();
    stack.push('a');
    stack.push('b');
    stack.push('c');
    stack.push('d');
    stack.push('e');
    expect(stack.indexOf('a')).toEqual(0);
    expect(stack.indexOf('b')).toEqual(1);
    expect(stack.indexOf('c')).toEqual(2);
    expect(stack.indexOf('d')).toEqual(3);
    expect(stack.indexOf('e')).toEqual(4);

    stack.push('a');
    expect(stack.indexOf('a')).toEqual(0);
  });
});
