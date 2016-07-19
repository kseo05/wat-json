'use strict';

var sample = {};
sample.toWatJSON = {};
sample.toWatJSON.string = 'string';
sample.toWatJSON.number = 123;
sample.toWatJSON.bool = true;
sample.toWatJSON.nul = null;
sample.toWatJSON.array = [ 1,2,3 ];
sample.toWatJSON.JSONObject = {};
sample.toWatJSON.inst = {};
sample.toWatJSON.classInst = {};
sample.toWatJSON.JSONObject.default = {
  'a':'a',
  'b':123,
  'c':true,
  'd':null,
  'e':{
    'a':'b',
  },
  'f': [ 1, 2, 3 ],
};
sample.toWatJSON.JSONObject.available = JSON.parse(JSON.stringify(sample.toWatJSON.JSONObject.default));
sample.toWatJSON.JSONObject.minimized = JSON.parse(JSON.stringify(sample.toWatJSON.JSONObject.default));
sample.toWatJSON.inst.default = (function () {
  var Clazz = function () {};

  var inst = new Clazz();

  inst.str = 'Hello';
  inst.undef = undefined;
  inst.nan = NaN;
  inst.infinity = Infinity;
  inst.date = new Date(1234);
  inst.regexp = new RegExp('test', 'g');

  return inst;
})();
sample.toWatJSON.inst.available = (function () {
  var Clazz = function () {
    this.str = 'Hello';
    this.undef = undefined;
    this.nan = NaN;
    this.infinity = Infinity;
    this.date = new Date(1234);
    this.regexp = new RegExp('test', 'g');
    this.htmlElement = null;
    this.htmlCollection = null;
    this.memberFunc = function () {
      this.str = 'Hello Member Function';
    };
  };

  Clazz.prototype.func = function () {
    this.str = 'Hello Function';
  }

  return new Clazz();
})();
sample.toWatJSON.inst.minimized = {
  'str': 'Hello',
};
sample.toWatJSON.classInst.default = (function () {
  class Clazz {}

  var inst = new Clazz();

  inst.str = 'Hello';
  inst.undef = undefined;
  inst.nan = NaN;
  inst.infinity = Infinity;
  inst.date = new Date(1234);
  inst.regexp = new RegExp('test', 'g');

  return inst;
})();
sample.toWatJSON.classInst.available = (function () {
  class Clazz {
    constructor () {
      this.str = 'Hello';
      this.undef = undefined;
      this.nan = NaN;
      this.infinity = Infinity;
      this.date = new Date(1234);
      this.regexp = new RegExp('test', 'g');
      this.htmlElement = null;
      this.htmlCollection = null;
      this.memberFunc = function () {
        this.str = 'Hello Member Function';
      };
    }
    func () {
      this.str = 'Hello Function';
    }
    static staticFunc () {}
  }

  return new Clazz();
})();
sample.toWatJSON.classInst.minimized = {
  'str': 'Hello',
};

sample.fromWatJSON = {};
sample.fromWatJSON.string = {
  '__STRING__': 'string',
};
sample.fromWatJSON.number = {
  '__NUMBER__': 123,
};
sample.fromWatJSON.bool = {
  '__BOOLEAN__': true,
};
sample.fromWatJSON.nul = {
  '__NULL__': null,
};
sample.fromWatJSON.array = {
  '__ARRAY__': [ 1,2,3 ],
};
sample.fromWatJSON.JSONObject = {};
sample.fromWatJSON.inst = {};
sample.fromWatJSON.classInst = {};
sample.fromWatJSON.JSONObject.default = {
  'a':'a',
  'b':123,
  'c':true,
  'd':null,
  'e':{
    'a':'b',
  },
  'f': [ 1, 2, 3 ],
};
sample.fromWatJSON.JSONObject.available = {
  'a':'a',
  'b':123,
  'c':true,
  'd':null,
  'e':{
    'a':'b',
    '__PROTO__':{
      '__ROOTPROTO__': true,
    },
  },
  '__PROTO__':{
    '__ROOTPROTO__': true,
  },
  'f': [ 1, 2, 3 ],
};
sample.fromWatJSON.JSONObject.minimized = {
  'a':'a',
  'b':123,
  'c':true,
  'd':null,
  'e':{
    'a':'b',
  },
  'f': [ 1, 2, 3 ],
};
sample.fromWatJSON.inst.default = {
  'str':'Hello',
  'undef':{ '__UNDEFINED__':true },
  'nan':{ '__NAN__':true },
  'infinity':{ '__INFINITY__':true },
  'date':{ '__DATE__':'new Date(1234)' },
  'regexp':{
    '__REGEXP__':'new RegExp("test","g")',
  },
  '__PROTO__':{
  },
};
sample.fromWatJSON.inst.available = {
  'str':'Hello',
  'undef':{ '__UNDEFINED__':true },
  'nan':{ '__NAN__':true },
  'infinity':{ '__INFINITY__':true },
  'date':{ '__DATE__':'new Date(1234)' },
  'regexp':{
    '__REGEXP__':'new RegExp("test","g")',
  },
  'htmlElement': {
    '__HTMLELEMENT__': {
      'nodeType': 1,
      'tagName': 'DIV',
      'attributes': {
        'class': 'container',
      },
      'childNodes': [
        {
          'nodeType': 1,
          'tagName': 'SPAN',
          'attributes': {
            'id': 'username',
          },
          'childNodes': [
            {
              'nodeType': 3,
              'nodeValue': '1234',
              'childNodes': [],
            },
          ],
        },
        {
          'nodeType': 1,
          'tagName': 'BUTTON',
          'attributes': {
            'id': 'button',
            'class': 'btn-test',
            'style': 'width:30px;height:20px',
          },
          'childNodes': [],
        },
      ],
    },
  },
  'htmlCollection': {
    '__HTMLCOLLECTION__': [
      {
        'nodeType': 1,
        'tagName': 'BUTTON',
        'attributes': {
          'id': 'button',
          'class': 'btn-test',
          'style': 'width:30px;height:20px',
        },
        'childNodes': [],
      },
    ],
  },
  'memberFunc': {
    '__FUNCTION__': {
      'ast': {
        'type': 'Program',
        'body': [
          {
            'type': 'ExportDefaultDeclaration',
            'declaration': {
              'type': 'FunctionDeclaration',
              'id': null,
              'params': [],
              'defaults': [],
              'body': {
                'type': 'BlockStatement',
                'body': [
                  {
                    'type': 'ExpressionStatement',
                    'expression': {
                      'type': 'AssignmentExpression',
                      'operator': '=',
                      'left': {
                        'type': 'MemberExpression',
                        'computed': false,
                        'object': {
                          'type': 'ThisExpression',
                        },
                        'property': {
                          'type': 'Identifier',
                          'name': 'str',
                        },
                      },
                      'right': {
                        'type': 'Literal',
                        'value': 'Hello Member Function',
                        'raw': '\'Hello Member Function\'',
                      },
                    },
                  },
                ],
              },
              'generator': false,
              'expression': false,
            },
          },
        ],
        'sourceType': 'module',
      },
    },
  },
  '__PROTO__':{
    '__CONSTRUCTOR__':{
      '__FUNCTION__':{
        'ast': {
          'type': 'Program',
          'body': [
            {
              'type': 'ExportDefaultDeclaration',
              'declaration': {
                'type': 'FunctionDeclaration',
                'id': null,
                // 'id': {
                //   'type': 'Identifier',
                //   'name': 'Clazz',
                // },
                'params': [],
                'defaults': [],
                'body': {
                  'type': 'BlockStatement',
                  'body': [
                    {
                      'type': 'ExpressionStatement',
                      'expression': {
                        'type': 'AssignmentExpression',
                        'operator': '=',
                        'left': {
                          'type': 'MemberExpression',
                          'computed': false,
                          'object': {
                            'type': 'ThisExpression',
                          },
                          'property': {
                            'type': 'Identifier',
                            'name': 'str',
                          },
                        },
                        'right': {
                          'type': 'Literal',
                          'value': 'Hello',
                          'raw': '\'Hello\'',
                        },
                      },
                    },
                    {
                      'type': 'ExpressionStatement',
                      'expression': {
                        'type': 'AssignmentExpression',
                        'operator': '=',
                        'left': {
                          'type': 'MemberExpression',
                          'computed': false,
                          'object': {
                            'type': 'ThisExpression',
                          },
                          'property': {
                            'type': 'Identifier',
                            'name': 'undef',
                          },
                        },
                        'right': {
                          'type': 'Identifier',
                          'name': 'undefined',
                        },
                      },
                    },
                    {
                      'type': 'ExpressionStatement',
                      'expression': {
                        'type': 'AssignmentExpression',
                        'operator': '=',
                        'left': {
                          'type': 'MemberExpression',
                          'computed': false,
                          'object': {
                            'type': 'ThisExpression',
                          },
                          'property': {
                            'type': 'Identifier',
                            'name': 'nan',
                          },
                        },
                        'right': {
                          'type': 'Identifier',
                          'name': 'NaN',
                        },
                      },
                    },
                    {
                      'type': 'ExpressionStatement',
                      'expression': {
                        'type': 'AssignmentExpression',
                        'operator': '=',
                        'left': {
                          'type': 'MemberExpression',
                          'computed': false,
                          'object': {
                            'type': 'ThisExpression',
                          },
                          'property': {
                            'type': 'Identifier',
                            'name': 'infinity',
                          },
                        },
                        'right': {
                          'type': 'Identifier',
                          'name': 'Infinity',
                        },
                      },
                    },
                    {
                      'type': 'ExpressionStatement',
                      'expression': {
                        'type': 'AssignmentExpression',
                        'operator': '=',
                        'left': {
                          'type': 'MemberExpression',
                          'computed': false,
                          'object': {
                            'type': 'ThisExpression',
                          },
                          'property': {
                            'type': 'Identifier',
                            'name': 'date',
                          },
                        },
                        'right': {
                          'type': 'NewExpression',
                          'callee': {
                            'type': 'Identifier',
                            'name': 'Date',
                          },
                          'arguments': [
                            {
                              'type': 'Literal',
                              'value': 1234,
                              'raw': '1234',
                            },
                          ],
                        },
                      },
                    },
                    {
                      'type': 'ExpressionStatement',
                      'expression': {
                        'type': 'AssignmentExpression',
                        'operator': '=',
                        'left': {
                          'type': 'MemberExpression',
                          'computed': false,
                          'object': {
                            'type': 'ThisExpression',
                          },
                          'property': {
                            'type': 'Identifier',
                            'name': 'regexp',
                          },
                        },
                        'right': {
                          'type': 'NewExpression',
                          'callee': {
                            'type': 'Identifier',
                            'name': 'RegExp',
                          },
                          'arguments': [
                            {
                              'type': 'Literal',
                              'value': 'test',
                              'raw': '\'test\'',
                            },
                            {
                              'type': 'Literal',
                              'value': 'g',
                              'raw': '\'g\'',
                            },
                          ],
                        },
                      },
                    },
                    {
                      'type': 'ExpressionStatement',
                      'expression': {
                        'type': 'AssignmentExpression',
                        'operator': '=',
                        'left': {
                          'type': 'MemberExpression',
                          'computed': false,
                          'object': {
                            'type': 'ThisExpression',
                          },
                          'property': {
                            'type': 'Identifier',
                            'name': 'htmlElement',
                          },
                        },
                        'right': {
                          'type': 'Literal',
                          'value': null,
                          'raw': 'null',
                        },
                      },
                    },
                    {
                      'type': 'ExpressionStatement',
                      'expression': {
                        'type': 'AssignmentExpression',
                        'operator': '=',
                        'left': {
                          'type': 'MemberExpression',
                          'computed': false,
                          'object': {
                            'type': 'ThisExpression',
                          },
                          'property': {
                            'type': 'Identifier',
                            'name': 'htmlCollection',
                          },
                        },
                        'right': {
                          'type': 'Literal',
                          'value': null,
                          'raw': 'null',
                        },
                      },
                    },
                    {
                      'type': 'ExpressionStatement',
                      'expression': {
                        'type': 'AssignmentExpression',
                        'operator': '=',
                        'left': {
                          'type': 'MemberExpression',
                          'computed': false,
                          'object': {
                            'type': 'ThisExpression',
                          },
                          'property': {
                            'type': 'Identifier',
                            'name': 'memberFunc',
                          },
                        },
                        'right': {
                          'type': 'FunctionExpression',
                          'id': null,
                          'params': [],
                          'defaults': [],
                          'body': {
                            'type': 'BlockStatement',
                            'body': [
                              {
                                'type': 'ExpressionStatement',
                                'expression': {
                                  'type': 'AssignmentExpression',
                                  'operator': '=',
                                  'left': {
                                    'type': 'MemberExpression',
                                    'computed': false,
                                    'object': {
                                      'type': 'ThisExpression',
                                    },
                                    'property': {
                                      'type': 'Identifier',
                                      'name': 'str',
                                    },
                                  },
                                  'right': {
                                    'type': 'Literal',
                                    'value': 'Hello Member Function',
                                    'raw': '\'Hello Member Function\'',
                                  },
                                },
                              },
                            ],
                          },
                          'generator': false,
                          'expression': false,
                        },
                      },
                    },
                  ],
                },
                'generator': false,
                'expression': false,
              },
            },
          ],
          'sourceType': 'module',
        },
      },
    },
    'func':{
      '__FUNCTION__':{
        'ast': {
          'type': 'Program',
          'body': [
            {
              'type': 'ExportDefaultDeclaration',
              'declaration': {
                'type': 'FunctionDeclaration',
                'id': null,
                'params': [],
                'defaults': [],
                'body': {
                  'type': 'BlockStatement',
                  'body': [
                    {
                      'type': 'ExpressionStatement',
                      'expression': {
                        'type': 'AssignmentExpression',
                        'operator': '=',
                        'left': {
                          'type': 'MemberExpression',
                          'computed': false,
                          'object': {
                            'type': 'ThisExpression',
                          },
                          'property': {
                            'type': 'Identifier',
                            'name': 'str',
                          },
                        },
                        'right': {
                          'type': 'Literal',
                          'value': 'Hello Function',
                          'raw': '\'Hello Function\'',
                        },
                      },
                    },
                  ],
                },
                'generator': false,
                'expression': false,
              },
            },
          ],
          'sourceType': 'module',
        },
      },
    },
    '__PROTO__':{
      '__ROOTPROTO__': true,
    },
  },
};
sample.fromWatJSON.inst.minimized = {
  'str':'Hello',
};
sample.fromWatJSON.classInst.default = {
  'str':'Hello',
  'undef':{ '__UNDEFINED__':true },
  'nan':{ '__NAN__':true },
  'infinity':{ '__INFINITY__':true },
  'date':{ '__DATE__':'new Date(1234)' },
  'regexp':{
    '__REGEXP__':'new RegExp("test","g")',
  },
  '__PROTO__':{
  },
};
sample.fromWatJSON.classInst.available = {
  'str':'Hello',
  'undef':{ '__UNDEFINED__':true },
  'nan':{ '__NAN__':true },
  'infinity':{ '__INFINITY__':true },
  'date':{ '__DATE__':'new Date(1234)' },
  'regexp':{
    '__REGEXP__':'new RegExp("test","g")',
  },
  'htmlElement': {
    '__HTMLELEMENT__': {
      'nodeType': 1,
      'tagName': 'DIV',
      'attributes': {
        'class': 'container',
      },
      'childNodes': [
        {
          'nodeType': 1,
          'tagName': 'SPAN',
          'attributes': {
            'id': 'username',
          },
          'childNodes': [
            {
              'nodeType': 3,
              'nodeValue': '1234',
              'childNodes': [],
            },
          ],
        },
        {
          'nodeType': 1,
          'tagName': 'BUTTON',
          'attributes': {
            'id': 'button',
            'class': 'btn-test',
            'style': 'width:30px;height:20px',
          },
          'childNodes': [],
        },
      ],
    },
  },
  'htmlCollection': {
    '__HTMLCOLLECTION__': [
      {
        'nodeType': 1,
        'tagName': 'BUTTON',
        'attributes': {
          'id': 'button',
          'class': 'btn-test',
          'style': 'width:30px;height:20px',
        },
        'childNodes': [],
      },
    ],
  },
  'memberFunc': {
    '__FUNCTION__': {
      'ast': {
        'type': 'Program',
        'body': [
          {
            'type': 'ExportDefaultDeclaration',
            'declaration': {
              'type': 'FunctionDeclaration',
              'id': null,
              'params': [],
              'defaults': [],
              'body': {
                'type': 'BlockStatement',
                'body': [
                  {
                    'type': 'ExpressionStatement',
                    'expression': {
                      'type': 'AssignmentExpression',
                      'operator': '=',
                      'left': {
                        'type': 'MemberExpression',
                        'computed': false,
                        'object': {
                          'type': 'ThisExpression',
                        },
                        'property': {
                          'type': 'Identifier',
                          'name': 'str',
                        },
                      },
                      'right': {
                        'type': 'Literal',
                        'value': 'Hello Member Function',
                        'raw': '\'Hello Member Functio\'',
                      },
                    },
                  },
                ],
              },
              'generator': false,
              'expression': false,
            },
            'id': null,
          },
        ],
        'sourceType': 'module',
      },
    },
  },
  '__PROTO__':{
    '__CONSTRUCTOR__':{
      '__FUNCTION__':{
        'ast': {
          'type': 'Program',
          'body': [
            {
              'type': 'ExportDefaultDeclaration',
              'declaration': {
                'type': 'FunctionDeclaration',
                'id': {
                  'type': 'Identifier',
                  'name': 'Clazz',
                },
                'params': [],
                'defaults': [],
                'body': {
                  'type': 'BlockStatement',
                  'body': [
                    {
                      'type': 'ExpressionStatement',
                      'expression': {
                        'type': 'CallExpression',
                        'callee': {
                          'type': 'Identifier',
                          'name': '_classCallCheck',
                        },
                        'arguments': [
                          {
                            'type': 'ThisExpression',
                          },
                          {
                            'type': 'Identifier',
                            'name': 'Clazz',
                          },
                        ],
                      },
                    },
                    {
                      'type': 'ExpressionStatement',
                      'expression': {
                        'type': 'AssignmentExpression',
                        'operator': '=',
                        'left': {
                          'type': 'MemberExpression',
                          'computed': false,
                          'object': {
                            'type': 'ThisExpression',
                          },
                          'property': {
                            'type': 'Identifier',
                            'name': 'str',
                          },
                        },
                        'right': {
                          'type': 'Literal',
                          'value': 'Hello',
                          'raw': '\'Hello\'',
                        },
                      },
                    },
                    {
                      'type': 'ExpressionStatement',
                      'expression': {
                        'type': 'AssignmentExpression',
                        'operator': '=',
                        'left': {
                          'type': 'MemberExpression',
                          'computed': false,
                          'object': {
                            'type': 'ThisExpression',
                          },
                          'property': {
                            'type': 'Identifier',
                            'name': 'undef',
                          },
                        },
                        'right': {
                          'type': 'Identifier',
                          'name': 'undefined',
                        },
                      },
                    },
                    {
                      'type': 'ExpressionStatement',
                      'expression': {
                        'type': 'AssignmentExpression',
                        'operator': '=',
                        'left': {
                          'type': 'MemberExpression',
                          'computed': false,
                          'object': {
                            'type': 'ThisExpression',
                          },
                          'property': {
                            'type': 'Identifier',
                            'name': 'nan',
                          },
                        },
                        'right': {
                          'type': 'Identifier',
                          'name': 'NaN',
                        },
                      },
                    },
                    {
                      'type': 'ExpressionStatement',
                      'expression': {
                        'type': 'AssignmentExpression',
                        'operator': '=',
                        'left': {
                          'type': 'MemberExpression',
                          'computed': false,
                          'object': {
                            'type': 'ThisExpression',
                          },
                          'property': {
                            'type': 'Identifier',
                            'name': 'infinity',
                          },
                        },
                        'right': {
                          'type': 'Identifier',
                          'name': 'Infinity',
                        },
                      },
                    },
                    {
                      'type': 'ExpressionStatement',
                      'expression': {
                        'type': 'AssignmentExpression',
                        'operator': '=',
                        'left': {
                          'type': 'MemberExpression',
                          'computed': false,
                          'object': {
                            'type': 'ThisExpression',
                          },
                          'property': {
                            'type': 'Identifier',
                            'name': 'date',
                          },
                        },
                        'right': {
                          'type': 'NewExpression',
                          'callee': {
                            'type': 'Identifier',
                            'name': 'Date',
                          },
                          'arguments': [
                            {
                              'type': 'Literal',
                              'value': 1234,
                              'raw': '1234',
                            },
                          ],
                        },
                      },
                    },
                    {
                      'type': 'ExpressionStatement',
                      'expression': {
                        'type': 'AssignmentExpression',
                        'operator': '=',
                        'left': {
                          'type': 'MemberExpression',
                          'computed': false,
                          'object': {
                            'type': 'ThisExpression',
                          },
                          'property': {
                            'type': 'Identifier',
                            'name': 'regexp',
                          },
                        },
                        'right': {
                          'type': 'NewExpression',
                          'callee': {
                            'type': 'Identifier',
                            'name': 'RegExp',
                          },
                          'arguments': [
                            {
                              'type': 'Literal',
                              'value': 'test',
                              'raw': '\'test\'',
                            },
                            {
                              'type': 'Literal',
                              'value': 'g',
                              'raw': '\'g\'',
                            },
                          ],
                        },
                      },
                    },
                    {
                      'type': 'ExpressionStatement',
                      'expression': {
                        'type': 'AssignmentExpression',
                        'operator': '=',
                        'left': {
                          'type': 'MemberExpression',
                          'computed': false,
                          'object': {
                            'type': 'ThisExpression',
                          },
                          'property': {
                            'type': 'Identifier',
                            'name': 'htmlElement',
                          },
                        },
                        'right': {
                          'type': 'Literal',
                          'value': null,
                          'raw': 'null',
                        },
                      },
                    },
                    {
                      'type': 'ExpressionStatement',
                      'expression': {
                        'type': 'AssignmentExpression',
                        'operator': '=',
                        'left': {
                          'type': 'MemberExpression',
                          'computed': false,
                          'object': {
                            'type': 'ThisExpression',
                          },
                          'property': {
                            'type': 'Identifier',
                            'name': 'htmlCollection',
                          },
                        },
                        'right': {
                          'type': 'Literal',
                          'value': null,
                          'raw': 'null',
                        },
                      },
                    },
                    {
                      'type': 'ExpressionStatement',
                      'expression': {
                        'type': 'AssignmentExpression',
                        'operator': '=',
                        'left': {
                          'type': 'MemberExpression',
                          'computed': false,
                          'object': {
                            'type': 'ThisExpression',
                          },
                          'property': {
                            'type': 'Identifier',
                            'name': 'memberFunc',
                          },
                        },
                        'right': {
                          'type': 'FunctionExpression',
                          'id': null,
                          'params': [],
                          'defaults': [],
                          'body': {
                            'type': 'BlockStatement',
                            'body': [
                              {
                                'type': 'ExpressionStatement',
                                'expression': {
                                  'type': 'AssignmentExpression',
                                  'operator': '=',
                                  'left': {
                                    'type': 'MemberExpression',
                                    'computed': false,
                                    'object': {
                                      'type': 'ThisExpression',
                                    },
                                    'property': {
                                      'type': 'Identifier',
                                      'name': 'str',
                                    },
                                  },
                                  'right': {
                                    'type': 'Literal',
                                    'value': 'Hello Member Function',
                                    'raw': '\'Hello Member Function\'',
                                  },
                                },
                              },
                            ],
                          },
                          'generator': false,
                          'expression': false,
                        },
                      },
                    },
                  ],
                },
                'generator': false,
                'expression': false,
              },
              'id': null,
            },
          ],
          'sourceType': 'module',
        },
      },
    },
    'func':{
      '__FUNCTION__':{
        'ast': {
          'type': 'Program',
          'body': [
            {
              'type': 'ExportDefaultDeclaration',
              'declaration': {
                'type': 'FunctionDeclaration',
                'id': {
                  'type': 'Identifier',
                  'name': 'func',
                },
                'params': [],
                'defaults': [],
                'body': {
                  'type': 'BlockStatement',
                  'body': [
                    {
                      'type': 'ExpressionStatement',
                      'expression': {
                        'type': 'AssignmentExpression',
                        'operator': '=',
                        'left': {
                          'type': 'MemberExpression',
                          'computed': false,
                          'object': {
                            'type': 'ThisExpression',
                          },
                          'property': {
                            'type': 'Identifier',
                            'name': 'str',
                          },
                        },
                        'right': {
                          'type': 'Literal',
                          'value': 'Hello Function',
                          'raw': '\'Hello Function\'',
                        },
                      },
                    },
                  ],
                },
                'generator': false,
                'expression': false,
              },
              'id': null,
            },
          ],
          'sourceType': 'module',
        },
      },
    },
    '__PROTO__':{
      '__ROOTPROTO__': true,
    },
  },
};
sample.fromWatJSON.classInst.minimized = {
  'str':'Hello',
};

sample.bodyString = '<div class=\'container\'>' +
  '  <span id=\'username\'>1234</span>' +
  '  <button id=\'button\' class=\'btn-test\' style=\'width:30px;height:20px\' />' +
  '</div>';

module.exports = {
  sample: sample,
  options: {
    available: {
      extTypes: {
        undef: true,
        nan: true,
        infinity: true,
        date: true,
        regexp: true,
        func: true,
        constructorFunc: true,
        functionValue: true,
        nativeFunction: true,
        htmlElement: true,
        htmlCollection: true,
        proto: true,
        rootPrototype: true,
        unknownObject: true,
        errorObject: true,
      },
      useWatDomJSON: true,
      useFunctionAST: true,
    },
    minimized: {
      extTypes: {
        undef: false,
        nan: false,
        infinity: false,
        date: false,
        regexp: false,
        func: false,
        constructorFunc: false,
        functionValue: false,
        nativeFunction: false,
        htmlElement: false,
        htmlCollection: false,
        proto: false,
        rootPrototype: false,
        unknownObject: false,
        errorObject: false,
      },
      useWatDomJSON: false,
      useFunctionAST: false,
    },
  },
};
