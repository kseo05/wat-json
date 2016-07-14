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
const watDomJSON: any = require('./vendor/watDomJSON');
const commonUtils: any = require('./commonUtils');
/* import modules - end */

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

/**
 * An `Window` object represents an open window in a browser.
 * @static
 * @ignore
 */
var win: any = window || null;  // eslint-disable-line no-undef

/**
 * watJSON Constants.
 * @static
 * @ignore
 */
const watJSONConstants: Object = {
  defOptions: {
    extTypes: {
      undef: true,
      nan: true,
      infinity: true,
      date: true,
      regexp: true,
      func: false,
      constructorFunc: false,
      functionValue: false,
      nativeFunction: false,
      htmlElement: false,
      htmlCollection: false,
      proto: true,
      rootPrototype: false,
      unknownObject: true,
      errorObject: true,
    },
    useWatDomJSON: true,
    useFunctionAST: false,
  },
  escKeynameMap: {
    'constructor': '__CONSTRUCTOR__',
  },
  unescKeynameMap: {},  // initialize dynamically.
  extTypeMap: {
    string: '__STRING__',
    number: '__NUMBER__',
    bool: '__BOOLEAN__',
    nul: '__NULL__',
    array: '__ARRAY__',

    undef: '__UNDEFINED__',
    nan: '__NAN__',
    infinity: '__INFINITY__',
    date: '__DATE__',
    regexp: '__REGEXP__',
    func: '__FUNCTION__',
    nativeFunction: '__NATIVEFUNC__',
    htmlElement: '__HTMLELEMENT__',
    htmlCollection: '__HTMLCOLLECTION__',
    rootPrototype: '__ROOTPROTO__',
    proto: '__PROTO__',
    unknownObject: '__UNKNOWN__',
    errorObject: '__ERROR__',
    ignoredProp: '__IGNOREDPROP__',
    constructorFunc: '__CONSTRUCTOR__',
  },
  watDomJSON: {
    options: {
      toWatJSON: {
        metadata: false,
        stringify: false,
      },
      fromWatJSON: {
        metadata: false,
        noMeta: true,
        stringify: false,
      },
      stringify: {
        metadata: false,
        stringify: true,
      },
      parse: {
        metadata: false,
        noMeta: true,
        stringify: true,
      },
    },
  },
  functionAst: {
    options: { sourceType: 'module' },
  },
};

// Initialize watJSONConstants.escKeynameMap.
Object.keys(watJSONConstants.escKeynameMap).forEach(function (key: string) {
  watJSONConstants.unescKeynameMap[watJSONConstants.escKeynameMap[key]] = key;
});

/* private methods - begin */
/**
 * The main function for `watJSON.fromWatJSON(obj, opt)` and `watJson.parse(str, opt)`.
 * @param  {any} obj
 * @param  {watJSON.Options} opt
 * @param  {Object=} context
 * @return {any}
 * @static
 * @private
 * @ignore
 */
var _fromWatJSON: Function = function (obj: any, opt: Options, context: Object|null): any {
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
    result = [];
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
        result = Infinity;
      } else {
        result = getIgnoredProp();
      }

    } else if (obj[watJSONConstants.extTypeMap.func]) {
      if (opt.extTypes.func) {
        if (opt.useFunctionAST) {
          result = escodegen.generate(obj[watJSONConstants.extTypeMap.func].ast, watJSONConstants.functionAst.options);
          result = result.substring('export default '.length);
          result = eval(`[${result}][0]`);
        } else {
          result = eval(`[${obj[watJSONConstants.extTypeMap.func].str}][0]`);
        }
      } else {
        result = getIgnoredProp();
      }

    } else if (obj[watJSONConstants.extTypeMap.nativeFunction]) {
      if (opt.extTypes.nativeFunction) {
        result = eval('[function () { console.warn("native function"); }][0]');
      } else {
        result = getIgnoredProp();
      }

    } else if (obj[watJSONConstants.extTypeMap.date]) {
      if (opt.extTypes.date) {
        // TODO : implement
        result = eval(obj[watJSONConstants.extTypeMap.date]);
      } else {
        result = getIgnoredProp();
      }

    } else if (obj[watJSONConstants.extTypeMap.regexp]) {
      if (opt.extTypes.regexp) {
        result = eval(obj[watJSONConstants.extTypeMap.regexp]);
      } else {
        result = getIgnoredProp();
      }

    } else if (obj[watJSONConstants.extTypeMap.undef]) {
      if (opt.extTypes.undef) {
        result = undefined;
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
        } else if (win) {
          result = win.document.createElement('div');
          result.innerHTML = obj[watJSONConstants.extTypeMap.htmlElement];
          result = result.firstChild;
          result.parentElement.removeChild(result);
        } else if (opt.extTypes.errorObject) {
          result = {};
          result[watJSONConstants.extTypeMap.errorObject] = _toWatJSON(new Error('Could not get windows global object.', watJSONConstants.defOptions));
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
          } else if (win) {
            result[i] = win.document.createElement('div');
            result[i].innerHTML = obj[watJSONConstants.extTypeMap.htmlCollection][i];
            result[i] = result[i].firstChild;
            result[i].parentElement.removeChild(result[i]);
          } else if (opt.extTypes.errorObject) {
            result = {};
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
        result = Object.prototype;
      } else {
        return getIgnoredProp();
      }

    } else {
      // Handle object and prototype.
      if (obj[watJSONConstants.extTypeMap.proto]) {
        if (opt.extTypes.proto) {
          result = new (function (): Function {
            var object: Function = function () {};
            object.prototype = _fromWatJSON(obj[watJSONConstants.extTypeMap.proto], opt);
            return object;
          }())();
        } else {
          result = {};
        }
      } else {
        result = {};
      }

      const keyList: Array = Object.getOwnPropertyNames(obj);
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
};


/**
 * the main function for `watJSON.toWatJSON(obj, opt)` and `watJson.stringify(obj, opt)`.
 * @param  {any} obj
 * @param  {watJSON.Options} opt
 * @return {any}
 * @static
 * @private
 * @ignore
 */
var _toWatJSON: Function = function (obj: any, opt: Options): any {
  var result: any;
  var dataType: string = typeof obj;
  var extendedType: string|null;

  // Handle JSON standard types without object type.
  if (dataType === 'string') {
    result = obj;

  } else if (dataType === 'number') {
    if (Number.isNaN(obj)) {
      if (opt.extTypes.nan) {
        extendedType = watJSONConstants.extTypeMap.nan;
        result = true;
      } else {
        return getIgnoredProp();
      }
    } else if (!Number.isFinite(obj)) {
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
    const length: number = obj.length;
    result = [];
    let value: any;
    for (let i: number = 0; i < length; i++) {
      value = _toWatJSON(obj[i], opt);
      if (!isIgnoredProp(value)) {
        result[result.length] = value;
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

  } else if (obj === undefined) {
    if (opt.extTypes.undef) {
      extendedType = watJSONConstants.extTypeMap.undef;
      result = true;
    } else {
      return getIgnoredProp();
    }

  } else if (win && win.HTMLElement && obj instanceof win.HTMLElement) {
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

  } else if (win && win.HTMLCollection && obj instanceof win.HTMLCollection) {
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

  // Handle root prototype.
  } else if (obj.isPrototypeOf && obj.isPrototypeOf(Object)) {
    if (opt.extTypes.rootPrototype) {
      extendedType = watJSONConstants.extTypeMap.rootPrototype;
      result = true;
    } else {
      return getIgnoredProp();
    }

  // Handle object and prototype.
  } else if (dataType === 'object') {
    result = {};
    const keyList: Array = Object.getOwnPropertyNames(obj);
    const proto: any = Object.getPrototypeOf(obj);
    let jsonProto: Object|null;

    if (proto) {
      if (opt.extTypes.proto) {
        jsonProto = _toWatJSON(proto, opt);
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
              result = {};
              result[watJSONConstants.extTypeMap.errorObject] = _toWatJSON(e, watJSONConstants.defOptions);
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
    result = {};
    result[extendedType] = tempResult;
  }

  return result;
};

/**
 * Create an object that means 'ignore converting this value'.
 * @return {Object}
 * @static
 * @private
 * @ignore
 */
var getIgnoredProp = function (): Object {
  var result: Object = {};
  result[watJSONConstants.extTypeMap.ignoredProp] = true;
  return result;
};

/**
 * Return `true` if 'val' is the returned value from `watJSON.getIgnoredProp()`
 * @param {any}
 * @return {boolean}
 * @static
 * @private
 * @ignore
 */
var isIgnoredProp = function (val: any): boolean {
  return !!(val && val[watJSONConstants.extTypeMap.ignoredProp]);
};
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
var toWatJSON = function (obj: any, options?: Options): WatJSONObject {
  var opt: Object = commonUtils.extend(watJSONConstants.defOptions, options);
  if (options) {
    opt.extTypes = commonUtils.extend(watJSONConstants.defOptions.extTypes, options.extTypes);
  }

  var result: WatJSONObject|null;
  var rawResult: any = _toWatJSON(obj, opt);
  var dataType: string = typeof rawResult;

  if (dataType === 'string') {
    result = {};
    result[watJSONConstants.extTypeMap.string] = rawResult;
  } else if (dataType === 'number') {
    result = {};
    result[watJSONConstants.extTypeMap.number] = rawResult;
  } else if (dataType === 'boolean') {
    result = {};
    result[watJSONConstants.extTypeMap.bool] = rawResult;
  } else if (obj === null) {
    result = {};
    result[watJSONConstants.extTypeMap.nul] = rawResult;
  } else if (obj instanceof Array) {
    result = {};
    result[watJSONConstants.extTypeMap.array] = rawResult;
  } else {
    result = rawResult;
  }

  return result;
};

/**
 * Convert an watJSON an object to an original object.
 * @param {watJSON.WatJSONObject} obj an watJSON object to convert.
 * @param {watJSON.Options=} options converting options.
 * @return {any} converted original object.
 * @static
 */
var fromWatJSON = function (obj: WatJSONObject, options?: Options): any {
  var opt: Object = commonUtils.extend(watJSONConstants.defOptions, options);
  if (options) {
    opt.extTypes = commonUtils.extend(watJSONConstants.defOptions.extTypes, options.extTypes);
  }

  var object: any;
  if (obj[watJSONConstants.extTypeMap.string] !== undefined) {
    object = obj[watJSONConstants.extTypeMap.string];
  } else if (obj[watJSONConstants.extTypeMap.number] !== undefined) {
    object = obj[watJSONConstants.extTypeMap.number];
  } else if (obj[watJSONConstants.extTypeMap.bool] !== undefined) {
    object = obj[watJSONConstants.extTypeMap.bool];
  } else if (obj[watJSONConstants.extTypeMap.nul] !== undefined) {
    object = obj[watJSONConstants.extTypeMap.nul];
  } else if (obj[watJSONConstants.extTypeMap.array] !== undefined) {
    object = obj[watJSONConstants.extTypeMap.array];
  } else {
    object = obj;
  }

  return _fromWatJSON(object, opt);
};
/* public methods - end */

/* export module - begin */
module.exports.toWatJSON = toWatJSON;
module.exports.fromWatJSON = fromWatJSON;
/* export module - end */
