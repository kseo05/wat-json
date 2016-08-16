/**
 * An implementation of stack data structure.
 * @file
 * @module watStack
 * @version 0.1.0
 * @author Jae-Yeop Kim <kseo05com@gmail.com>
 * @license MIT
 * @copyright (c) web-uhee.com 2016
 * @see {@link http://git.web-uhee.com/lib/watStack|watStack}
 */
 // @flow

class Stack {
  _arr: Array;
  _length: number;

  /**
   * Stack instance constructor.
   */
  constructor () {
    this._arr = new Array();
    this._length = 0;
  }

  /**
   * Push an item into the stack.
   * @param  {any} item An item to push.
   */
  push (item: any) {
    this._arr[this._length] = item;
    this._length++;
  }

  /**
   * Remove and return the item at the top(last) of the stack.
   * @return {any} The item at the top of the stack.
   */
  pop (): any {
    this._length--;
    return this._arr[this._length];
  }

  /**
   * Return the size of the stack.
   * @return {number} The size of the stack.
   */
  size (): number {
    return this._length;
  }

  /**
   * Same as Array.prototype.indexOf().
   * @param  {any} Target item to find index of the stack.
   * @return {number} The first index of the item in the stack. If not found, result value is -1.
   */
  indexOf (item: any): number {
    return this._arr.indexOf(item);
  }
};

module.exports = Stack;
