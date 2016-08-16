/**
 * watJSON Constants.
 * @static
 * @ignore
 */
var watJSONConstants = {
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
    'constructor': '$$CONSTRUCTOR$$',
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

    constructorFunc: '$$CONSTRUCTOR$$',

    objectAlias: '__OBJALIAS__',
    objLink: '__OBJLINK__',
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
    },
  },
  functionAst: {
    options: {
      sourceType: 'module',
    },
  },
};

// Initialize watJSONConstants.escKeynameMap.
Object.keys(watJSONConstants.escKeynameMap).forEach(function (key) {
  watJSONConstants.unescKeynameMap[watJSONConstants.escKeynameMap[key]] = key;
});

module.exports = watJSONConstants;
