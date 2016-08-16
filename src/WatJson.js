/**
 * A library to convert general javascript objects to JSON objects and vice versa.
 * @file
 * @module watJSON
 * @version 0.0.1
 * @author Jae-Yeop Kim <kseo05com@gmail.com>
 * @license MIT
 * @copyright (c) web-uhee.com 2016
 * @see {@link http://git.web-uhee.com/lib/watJSON|watJSON}
 */
// @flow

/* import modules - begin */
const acorn: any = require('acorn');
const escodegen: any = require('escodegen');
const watDomJSON: Object = require('./vendor/WatDomJSON');
const commonUtils: Object = require('./CommonUtils');
const watJSONConstants: Object = require('./WatJSONConstants');
const WatJSONObjectPathManager: Function = require('./WatJSONObjectPathManager');
const WatObjectReferenceManager: Function = require('./WatObjectReferenceManager');
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
 * @property {boolean} extTypes.infinity=true Use `true` if you wanna convert `infinity` objects.
 * @property {boolean} extTypes.func=false Use `true` if you wanna convert function objects.
 * @property {boolean} extTypes.constructorFunc=false Use `true` if you wanna convert the `constructor` of instances.
 * @property {boolean} extTypes.functionValue=false Use `true` if you wanna convert between the `function` source code and a string when converting function objects.
 * @property {boolean} extTypes.nativeFunction=false Use `true` if you wanna convert native function objects. But, watJSON cannot restore them by `parse` or `fromWatJSON`.
 * @property {boolean} extTypes.htmlElement=false Use `true` if you wanna convert `HTMLElement` objects. It is just used in a web browser.
 * @property {boolean} extTypes.htmlCollection=false Use `true` if you wanna convert `HTMLCollection` objects. It is just used in a web browser.
 * @property {boolean} extTypes.proto=true Use `true` if you wanna convert the prototype of objects until the converter reaches the instance of `Object`.
 * @property {boolean} extTypes.rootPrototype=false Use `true` if you wanna convert `objectPrototypeNative`.
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

type WatJSONObjectPathManager = Object;
type WatObjectReferenceManager = Object;
/* define custom object type - end */

/* private variables - begin */
var objectPrototypeNative: any = Object.prototype;
var InfinityNative: number = Infinity;
var undefinedNative: null = undefined;

var inNaNNative: Function = Number.isNaN;
var isFiniteNative: Function = Number.isFinite;
var evalNative: Function = eval;
var getOwnPropertyNamesNative: Function = Object.getOwnPropertyNames;
var getPrototypeOfNative: Function = Object.getPrototypeOf;

/**
 * An `Window` object represents an open window in a browser.
 * @static
 * @ignore
 */
var windowNative: Object|null = window || null;  // eslint-disable-line no-undef
var HTMLDocumentNative: Function|null = windowNative ? windowNative.HTMLDocument : null;
var HTMLCollectionNative: Function|null = windowNative ? windowNative.HTMLCollection : null;
var HTMLElementNative: Function|null = windowNative ? windowNative.HTMLElement : null;
var createElementNative: Function|null = windowNative ? windowNative.document.createElement : null;

/**
 * Javascript object constructor.
 * @static
 * @ignore
 */
var Ctor: Function = commonUtils.Ctor;

/**
 * JSON object path manager for watJSON to support javascript objects which contains self/circular references.
 * @static
 * @ignore
 */
var objPathManager: WatJSONObjectPathManager = new WatJSONObjectPathManager();

/**
 * Javascript object reference manager for watJSON to support javascript objects which contains self/circular references.
 * @static
 * @ignore
 */
var objRefManager: WatObjectReferenceManager = new WatObjectReferenceManager();

/**
 * the main function for `watJSON.toWatJSON(obj, opt)` and `watJson.stringify(obj, opt)`.
 * @param {any} obj
 * @param {watJSON.Options} opt
 * @param {any=} prototype
 * @return {any}
 * @static
 * @private
 * @ignore
 */
function _toWatJSON (obj: any, opt: Options, prototype: any): any {
  var result: any;
  var dataType: string = typeof obj;
  var extendedType: string|null;

  // Handle JSON standard types without object type.
  if (dataType === 'string') {
    result = obj;
  } else if (dataType === 'number') {
    if (inNaNNative(obj)) {
      if (opt.extTypes.nan) {
        extendedType = watJSONConstants.extTypeMap.nan;
        result = true;
      } else {
        return getIgnoredProp();
      }
    } else if (!isFiniteNative(obj)) {
      if (opt.extTypes.infinity) {
        extendedType = watJSONConstants.extTypeMap.infinity;
        result = true;
      } else {
        return getIgnoredProp();
      }
    } else {
      result = obj;
    }
  } else if (dataType === 'boolean') {
    result = obj;
  } else if (obj === null) {
    result = null;
  } else if (obj instanceof Array) {
    result = new Ctor();
    let value: any = objRefManager.getIdByObject(obj);

    if (value) {
      result[watJSONConstants.extTypeMap.objLink] = value;
    } else {
      const length: number = obj.length;
      result[watJSONConstants.extTypeMap.array] = [];
      result[watJSONConstants.extTypeMap.objectAlias] = objPathManager.generatePath();
      objRefManager.registerObject(result[watJSONConstants.extTypeMap.objectAlias], result, obj);

      let array: Array = result[watJSONConstants.extTypeMap.array];
      for (let i: number = 0; i < length; i++) {
        value = _toWatJSON(obj[i], opt);
        if (!isIgnoredProp(value)) {
          array[result.length] = value;
        }
      }
    }
  // Handle built-in objects.
  } else if (obj instanceof Function) {
    if (opt.extTypes.func) {
      extendedType = watJSONConstants.extTypeMap.func;
      if (opt.extTypes.functionValue) {
        result = obj.toString();
        if (result.endsWith('{ [native code] }')) {
          if (opt.extTypes.nativeFunction) {
            extendedType = watJSONConstants.extTypeMap.nativeFunction;
            result = true;
          } else {
            return getIgnoredProp();
          }
        } else {
          if (opt.useFunctionAST) {
            result = {
              'ast': acorn.parse('export default ' + result, watJSONConstants.functionAst.options),
            };
            result.ast.body[0].id = null;
          } else {
            result = { 'str': result };
          }
        }
      } else {
        result = null;
      }
    } else {
      return getIgnoredProp();
    }
  } else if (obj instanceof Date) {
    if (opt.extTypes.date) {
      extendedType = watJSONConstants.extTypeMap.date;
      result = 'new Date(' + obj.getTime() + ')';
    } else {
      return getIgnoredProp();
    }
  } else if (obj instanceof RegExp) {
    if (opt.extTypes.regexp) {
      extendedType = watJSONConstants.extTypeMap.regexp;
      result = 'new RegExp("' + commonUtils.escapeJSON(obj.source) + '","' + obj.flags + '")';
    } else {
      return getIgnoredProp();
    }
  } else if (obj === undefinedNative) {
    if (opt.extTypes.undef) {
      extendedType = watJSONConstants.extTypeMap.undef;
      result = true;
    } else {
      return getIgnoredProp();
    }
  } else if (HTMLElementNative && obj instanceof HTMLElementNative) {
    if (opt.extTypes.htmlElement) {
      extendedType = watJSONConstants.extTypeMap.htmlElement;
      if (opt.useWatDomJSON) {
        result = watDomJSON.toJSON(obj, watJSONConstants.watDomJSON.options.toWatJSON);
      } else {
        result = obj.outerHTML;
      }
    } else {
      return getIgnoredProp();
    }
  } else if (HTMLCollectionNative && obj instanceof HTMLCollectionNative) {
    if (opt.extTypes.htmlCollection) {
      extendedType = watJSONConstants.extTypeMap.htmlCollection;
      const length: number = obj.length;
      result = new Array(length);
      for (let i: number = 0; i < length; i++) {
        if (opt.useWatDomJSON) {
          result[i] = watDomJSON.toJSON(obj[i], watJSONConstants.watDomJSON.options.toWatJSON);
        } else {
          result[i] = obj[i].outerHTML;
        }
      }
    } else {
      return getIgnoredProp();
    }
  } else if (prototype && HTMLDocumentNative && obj instanceof HTMLDocumentNative) {
    return getIgnoredProp();
  // Handle root prototype.
  } else if (prototype && prototype.isPrototypeOf && prototype.isPrototypeOf(Object)) {
    if (opt.extTypes.rootPrototype) {
      extendedType = watJSONConstants.extTypeMap.rootPrototype;
      result = true;
    } else {
      return getIgnoredProp();
    }
  // Handle object and prototype.
  } else if (dataType === 'object') {
    result = new Ctor();
    const keyList: Array = getOwnPropertyNamesNative(prototype || obj);
    const proto: any = getPrototypeOfNative(prototype || obj);
    let jsonProto: Object|null;

    if (proto) {
      if (opt.extTypes.proto) {
        jsonProto = _toWatJSON(obj, opt, proto);
      } else {
        jsonProto = getIgnoredProp();
      }

      keyList.forEach(function (key: string, idx: number) {
        var escapedKey: string = key;
        var value: any;

        if (!opt.extTypes.constructorFunc && key === 'constructor') {
          value = getIgnoredProp();
        } else {
          try {
            value = _toWatJSON(obj[key], opt);
          } catch (e) {
            if (opt.extTypes.errorObject) {
              value = new Ctor();
              value[watJSONConstants.extTypeMap.errorObject] = _toWatJSON(e, watJSONConstants.defOptions);
            }
          }
        }
        if (!isIgnoredProp(value)) {
          escapedKey = watJSONConstants.escKeynameMap[key] || key;
          result[escapedKey] = value;
        }
      }, this);

      if (!isIgnoredProp(jsonProto)) {
        result[watJSONConstants.extTypeMap.proto] = jsonProto;
      }
    }
  } else {
    if (opt.extTypes.unknownObject) {
      extendedType = watJSONConstants.extTypeMap.unknownObject;
      result = true;
    } else {
      return getIgnoredProp();
    }
  }
  if (extendedType) {
    var tempResult = result;
    result = new Ctor();
    result[extendedType] = tempResult;
  }

  return result;
}

/**
 * The main function for `watJSON.fromWatJSON(obj, opt)` and `watJson.parse(str, opt)`.
 * @param {any} obj
 * @param {watJSON.Options} opt
 * @return {any}
 * @static
 * @private
 * @ignore
 */
function _fromWatJSON (obj: any, opt: Options): any {
  var result: any;
  var dataType: string = typeof obj;

  // Handle JSON standard types without object type.
  if (dataType === 'string') {
    result = obj;
  } else if (dataType === 'number') {
    result = obj;
  } else if (dataType === 'boolean') {
    result = obj;
  } else if (obj === null) {
    result = null;
  } else if (obj instanceof Array) {
    const length: number = obj.length;
    result = new Array();
    let value: any;
    for (let i: number = 0; i < length; i++) {
      value = _fromWatJSON(obj[i], opt);
      if (!isIgnoredProp(value)) {
        result[result.length] = value;
      }
    }
  } else { // dataType === 'object'
    if (obj[watJSONConstants.extTypeMap.nan]) {
      if (opt.extTypes.nan) {
        result = NaN;
      } else {
        result = getIgnoredProp();
      }
    } else if (obj[watJSONConstants.extTypeMap.infinity]) {
      if (opt.extTypes.infinity) {
        result = InfinityNative;
      } else {
        result = getIgnoredProp();
      }
    } else if (obj[watJSONConstants.extTypeMap.func]) {
      if (opt.extTypes.func) {
        if (opt.useFunctionAST) {
          result = escodegen.generate(obj[watJSONConstants.extTypeMap.func].ast, watJSONConstants.functionAst.options);
          result = result.substring('export default '.length);
          result = evalNative(`[${result}][0]`);
        } else {
          result = evalNative(`[${obj[watJSONConstants.extTypeMap.func].str}][0]`);
        }
      } else {
        result = getIgnoredProp();
      }
    } else if (obj[watJSONConstants.extTypeMap.nativeFunction]) {
      if (opt.extTypes.nativeFunction) {
        result = evalNative('[function () { console.warn("native function"); }][0]');
      } else {
        result = getIgnoredProp();
      }
    } else if (obj[watJSONConstants.extTypeMap.date]) {
      if (opt.extTypes.date) {
        // TODO : implement
        result = evalNative(obj[watJSONConstants.extTypeMap.date]);
      } else {
        result = getIgnoredProp();
      }
    } else if (obj[watJSONConstants.extTypeMap.regexp]) {
      if (opt.extTypes.regexp) {
        result = evalNative(obj[watJSONConstants.extTypeMap.regexp]);
      } else {
        result = getIgnoredProp();
      }
    } else if (obj[watJSONConstants.extTypeMap.undef]) {
      if (opt.extTypes.undef) {
        result = undefinedNative;
      } else {
        result = getIgnoredProp();
      }
    } else if (obj[watJSONConstants.extTypeMap.htmlElement]) {
      if (opt.extTypes.htmlElement) {
        if (opt.useWatDomJSON) {
          result = watDomJSON.toDOM(
            obj[watJSONConstants.extTypeMap.htmlElement],
            watJSONConstants.watDomJSON.options.fromWatJSON
          ).children[0];
        } else if (windowNative) {
          result = createElementNative('div');
          result.innerHTML = obj[watJSONConstants.extTypeMap.htmlElement];
          result = result.firstChild;
          result.parentElement.removeChild(result);
        } else if (opt.extTypes.errorObject) {
          result = new Ctor();
          result[watJSONConstants.extTypeMap.errorObject] = _toWatJSON(new Error('Could not get window global object.'), watJSONConstants.defOptions);
        } else {
          result = getIgnoredProp();
        }
      } else {
        result = getIgnoredProp();
      }
    } else if (obj[watJSONConstants.extTypeMap.htmlCollection]) {
      if (opt.extTypes.htmlCollection) {
        const length: number = obj[watJSONConstants.extTypeMap.htmlCollection].length;
        result = new Array(length);

        for (let i: number = 0; i < length; i++) {
          if (opt.useWatDomJSON) {
            result[i] = watDomJSON.toDOM(
              obj[watJSONConstants.extTypeMap.htmlCollection][i],
              watJSONConstants.watDomJSON.options.fromWatJSON
            ).children[0];
          } else if (windowNative) {
            result[i] = createElementNative('div');
            result[i].innerHTML = obj[watJSONConstants.extTypeMap.htmlCollection][i];
            result[i] = result[i].firstChild;
            result[i].parentElement.removeChild(result[i]);
          } else if (opt.extTypes.errorObject) {
            result = new Ctor();
            result[watJSONConstants.extTypeMap.errorObject] = _fromWatJSON(new Error('Could not get windows global object.', watJSONConstants.defOptions));
          }
        }
      } else {
        result = getIgnoredProp();
      }
    } else if (obj[watJSONConstants.extTypeMap.unknownObject]) {
      return getIgnoredProp();
    } else if (obj[watJSONConstants.extTypeMap.errorObject]) {
      return commonUtils.clone(obj);
    // Handle root prototype.
    } else if (obj[watJSONConstants.extTypeMap.rootPrototype]) {
      if (opt.extTypes.rootPrototype) {
        result = objectPrototypeNative;
      } else {
        return getIgnoredProp();
      }
    } else {
      // Handle object and prototype.
      if (obj[watJSONConstants.extTypeMap.proto]) {
        if (opt.extTypes.proto) {
          result = (function (): Object {
            var ctor: Function = function () {};
            ctor.prototype = _fromWatJSON(obj[watJSONConstants.extTypeMap.proto], opt);
            return new ctor();
          })();
        } else {
          result = new Ctor();
        }
      } else {
        result = new Ctor();
      }

      const keyList: Array = getOwnPropertyNamesNative(obj);
      keyList.forEach(function (key: string, idx: number) {
        var unescapedKey: string = key;
        var value: any;

        if (! opt.extTypes.constructorFunc && key === watJSONConstants.extTypeMap.constructorFunc) {
          value = getIgnoredProp();
        } else if (key === watJSONConstants.extTypeMap.proto) {
          value = getIgnoredProp();
        } else {
          value = _fromWatJSON(obj[key], opt);
        }
        if (!isIgnoredProp(value)) {
          unescapedKey = watJSONConstants.unescKeynameMap[key] || key;
          result[unescapedKey] = value;
        }
      }, this);
    }
  }

  return result;
}

/**
 * Create an object that means 'ignore converting this value'.
 * @return {Object}
 * @static
 * @private
 * @ignore
 */
function getIgnoredProp (): Object {
  var result: Object = new Ctor();
  result[watJSONConstants.extTypeMap.ignoredProp] = true;
  return result;
}

/**
 * Return `true` if 'val' is the returned value from `watJSON.getIgnoredProp()`
 * @param {any}
 * @return {boolean}
 * @static
 * @private
 * @ignore
 */
function isIgnoredProp (val: any): boolean {
  return !!(val && val[watJSONConstants.extTypeMap.ignoredProp]);
}
/* private methods - end */


/* public methods - begin */
/**
 * Convert an object to an watJSON object.
 * Object (obj) can have a veriety of types. (Javascript/JSON Object, HTMLElement, HTMLCollection)
 * It can contain objects which has types mentioned above as JSON Object.
 * @param {any} obj an object to convert.
 * @param {watJSON.Options=} options converting options.
 * @return {watJSON.WatJSONObject} converted watJSON object.
 * @static
 */
function toWatJSON (obj: any, options?: Options): WatJSONObject {
  var opt: Object = commonUtils.extend(watJSONConstants.defOptions, options);
  if (options) {
    opt.extTypes = commonUtils.extend(watJSONConstants.defOptions.extTypes, options.extTypes);
  }

  var result: WatJSONObject|null;
  var rawResult: any = _toWatJSON(obj, opt);
  var dataType: string = typeof rawResult;
  var extTypeMap: Object = watJSONConstants.extTypeMap;

  if (dataType === 'string') {
    result = new Ctor();
    result[extTypeMap.string] = rawResult;
  } else if (dataType === 'number') {
    result = new Ctor();
    result[extTypeMap.number] = rawResult;
  } else if (dataType === 'boolean') {
    result = new Ctor();
    result[extTypeMap.bool] = rawResult;
  } else if (obj === null) {
    result = new Ctor();
    result[extTypeMap.nul] = rawResult;
  } else if (obj instanceof Array) {
    result = new Ctor();
    result[extTypeMap.array] = rawResult;
  } else {
    result = rawResult;
  }

  return result;
}

/**
 * Convert an watJSON an object to an original object.
 * @param {watJSON.WatJSONObject} obj an watJSON object to convert.
 * @param {watJSON.Options=} options converting options.
 * @return {any} converted original object.
 * @static
 */
function fromWatJSON (obj: WatJSONObject, options?: Options): any {
  var opt: Object = commonUtils.extend(watJSONConstants.defOptions, options);
  if (options) {
    opt.extTypes = commonUtils.extend(watJSONConstants.defOptions.extTypes, options.extTypes);
  }

  var object: any;
  var extTypeMap: Object = watJSONConstants.extTypeMap;
  if (obj[extTypeMap.string] !== undefinedNative) {
    object = obj[extTypeMap.string];
  } else if (obj[extTypeMap.number] !== undefinedNative) {
    object = obj[extTypeMap.number];
  } else if (obj[extTypeMap.bool] !== undefinedNative) {
    object = obj[extTypeMap.bool];
  } else if (obj[extTypeMap.nul] !== undefinedNative) {
    object = obj[extTypeMap.nul];
  } else if (obj[extTypeMap.array] !== undefinedNative) {
    object = obj[extTypeMap.array];
  } else {
    object = obj;
  }

  return _fromWatJSON(object, opt);
}
/* public methods - end */

/* export module - begin */
module.exports.toWatJSON = toWatJSON;
module.exports.fromWatJSON = fromWatJSON;
/* export module - end */
