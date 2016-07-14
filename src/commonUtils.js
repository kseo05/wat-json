// @flow

/**
 * Same as _.extend. shallow-copy.
 * @param  {Object} obj target.
 * @param  {...Object} sources sources.
 * @return {Object} extended target.
 */
var extend: Function = function (obj: Object): Object {
  if (!arguments.length) {
    return obj || {};
  }

  var result: Object = obj;
  var i: number = 1;
  var argLen: number = arguments.length;
  while (i < argLen) {
    var src: any = arguments[i];
    for (var prop: string in src) { // eslint-disable-line guard-for-in
      result[prop] = src[prop];
    }
    i++;
  }

  return result;
};

/**
 * Same as _.clone. shallow-copy.
 * @param  {Object} obj target
 * @return {Object} shallow-copied object.
 */
var clone: Function = function (obj: Object): Object {
  return extend({}, obj);
};

/**
 * Get JSON-escaped string.
 * @param  {string} str string to escape.
 * @return {string} escaped string.
 */
var escapeJSON: Function = function (str: string): string {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')  // Linefeed
    .replace(/\r/g, '\\r')  // Carriage Return
    .replace(/\t/g, '\\t')  // Horizontal Tab
    .replace(/\v/g, '\\v')  // Vertical Tab
    .replace(/[\b]/g, '\\b')  // Backspace
    .replace(/\f/g, '\\f')  // Formfeed
    .replace(/"/g, '\\"');  // Doucle Quote
};

/**
 * Evaluate in context.
 * @param {string} code Javascript code to evaluate.
 * @param {any} context
 */
var evalInContext: Function = function (code: string, context: any): any {
  return (function (): any {
    return eval(code);
  }).call(context);
};

module.exports = {
  extend,
  clone,
  escapeJSON,
  evalInContext,
};
