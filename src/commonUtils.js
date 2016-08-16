// @flow

/**
 * Javascript object constructor.
 * @static
 * @ignore
 */
function Ctor (): null {}

/**
 * Same as _.extend. shallow-copy.
 * @param  {Object} obj target.
 * @param  {...Object} sources sources.
 * @return {Object} extended target.
 */
function extend (obj: Object): Object {
  if (!arguments.length) {
    return obj || new Ctor();
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
}

/**
 * Same as _.clone. shallow-copy.
 * @param  {Object} obj target
 * @return {Object} shallow-copied object.
 */
function clone (obj: Object): Object {
  return extend(new Ctor(), obj);
}

/**
 * Get JSON-escaped string.
 * @param  {string} str string to escape.
 * @return {string} escaped string.
 */
function escapeJSON (str: string): string {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')  // Linefeed
    .replace(/\r/g, '\\r')  // Carriage Return
    .replace(/\t/g, '\\t')  // Horizontal Tab
    .replace(/\v/g, '\\v')  // Vertical Tab
    .replace(/[\b]/g, '\\b')  // Backspace
    .replace(/\f/g, '\\f')  // Formfeed
    .replace(/"/g, '\\"');  // Doucle Quote
}

/**
 * Evaluate in context.
 * @param {string} code Javascript code to evaluate.
 * @param {any} context
 */
function evalInContext (code: string, context: any): any {
  return (function (): any {
    return eval(code);
  }).call(context);
}

/**
 * Generate Unique ID that is combination.
 * @param  {number} len The length of Unique ID.
 * @return {string} Generated Unique ID.
 */
function uid (len: number = 7): string {
  return Math.random().toString(35).substr(2, len);
}

module.exports = {
  Ctor,
  extend,
  clone,
  escapeJSON,
  evalInContext,
  uid,
};
