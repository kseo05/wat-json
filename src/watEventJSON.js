/**
 * A library to convert javascript event objects to JSON objects and vice versa.
 * @file
 * @module watEventJSON
 * @version 0.0.1
 * @author Jae-Yeop Kim <kseo05com@gmail.com>
 * @license MIT
 * @copyright (c) web-uhee.com 2016
 * @see {@link http://git.web-uhee.com/lib/watJSON|watJSON}
 */
// @flow

/* import modules - begin */
const watDomJSON: any = require('./vendor/watDomJSON');
const commonUtils: any = require('./commonUtils');
/* import modules - end */

/* define custom object type - begin */
/**
 * JSON-friendly object type.
 * You can handle it as a JSON-formatted object.
 * `WatJSONObject` object contains the data of object as much as possible.
 * @typedef {Object} WatJSONObject
 * @static
 */
type WatJSONObject = JSONObject;
type JSONObject = { [key:string]: JSONValue };
type JSONValue = string|number|boolean|null|JSONObject|JSONArray;
type JSONArray = Array<JSONValue>;

/**
 * Common converting options.
 * @typedef {Object} Options
 * @property {Object} extTypes Options about converting objects which JSON global object cannot convert.
 * @property {boolean} extTypes.undef=true Use `true` if you wanna convert `undefined` objects.
 * @property {boolean} extTypes.nan=true Use `true` if you wanna convert `NaN` objects.
 * @property {boolean} extTypes.infinity=true Use `true` if you wanna convert `Infinity` objects.
 * @property {boolean} extTypes.func=false Use `true` if you wanna convert function objects.
 * @property {boolean} extTypes.constructorFunc=false Use `true` if you wanna convert the `constructor` of instances.
 * @property {boolean} extTypes.functionValue=false Use `true` if you wanna convert between the `function` source code and a string when converting function objects.
 * @property {boolean} extTypes.nativeFunction=false Use `true` if you wanna convert native function objects. But, watJSON cannot restore them by `parse` or `fromWatJSON`.
 * @property {boolean} extTypes.htmlElement=false Use `true` if you wanna convert `HTMLElement` objects. It is just used in a web browser.
 * @property {boolean} extTypes.htmlCollection=false Use `true` if you wanna convert `HTMLCollection` objects. It is just used in a web browser.
 * @property {boolean} extTypes.proto=true Use `true` if you wanna convert the prototype of objects until the converter reaches the instance of `Object`.
 * @property {boolean} extTypes.rootPrototype=false Use `true` if you wanna convert `Object.prototype`.
 * @property {boolean} extTypes.unknownObject=true Use `true` if you wanna convert objects when watJSON could not find out its type.
 * @property {boolean} extTypes.errorObject=true Use `true` if you wanna get conversion error objects.
 * @property {boolean} useWatDomJSON=true You can use watDomJSON library when you convert between `HTMLElement`/`HTMLCollection` object and `WatDomJSON` object. If you don't use this option, parsed result will be a html string.
 * @property {boolean} useFunctionAST=false Use `true` if you wanna convert between the `function` source code and a `AST`, not a string.
 * @static
 */
type Options = {
  extTypes: {
    undef: boolean,
    nan: boolean,
    infinity: boolean,
    func: boolean,
    constructorFunc: boolean,
    functionValue: boolean,
    nativeFunction: boolean,
    htmlElement: boolean,
    htmlCollection: boolean,
    proto: boolean,
    rootPrototype: boolean,
    unknownObject: boolean,
    errorObject: boolean,
  },
  useWatDomJSON: boolean,
  useFunctionAST: boolean,
};
/* define custom object type - end */

/* private methods - begin */
/**
 * An `Window` object represents an open window in a browser.
 * @static
 * @ignore
 */
var win: any = window || null;  // eslint-disable-line no-undef

function _fromWatJSON (obj: any, opt: options): any {
  return null;
}

function _toWatJSON (obj: any, opt: Options, prototype: any): any {
  return null;
}
/* private methods - end */

/* public methods - begin */
function toWatJSON (obj: any, options?: Options): WatJSONObject {
  return null;
}

function fromWatJSON (obj: WatJSONObject, options?: Options): any {
  return null;
}
/* public methods - end */

/* export module - begin */
module.exports.toWatJSON = toWatJSON;
module.exports.fromWatJSON = fromWatJSON;
/* export module - end */
