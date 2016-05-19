'use strict';

const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  parser: 'babel-eslint',
  env: {
    es6: true,
    commonjs: true,
    jest: true,
  },
  plugins: [
    'flowtype',
  ],
  'rules': {
    'array-bracket-spacing': [WARNING, 'always', {'singleValue': false}],
    'brace-style': [ERROR, '1tbs'],
    'comma-dangle': [ERROR, 'always-multiline'],
    'consistent-return': ERROR,
    'dot-location': [ERROR, 'property'],
    'dot-notation': ERROR,
    'default-case': WARNING,
    'eol-last': ERROR,
    'eqeqeq': [ERROR, 'allow-null'],
    'func-names': OFF,
    'guard-for-in': WARNING,
    'id-length': OFF,
    'indent': [ERROR, 2, {'SwitchCase': 1}],
    'keyword-spacing': ERROR,
    'max-len': [0, 100],
    'no-bitwise': OFF,
    'no-console': ERROR,
    'no-else-return': WARNING,
    'no-mixed-spaces-and-tabs': ERROR,
    'no-multi-spaces': ERROR,
    'no-param-reassign': WARNING,
    'no-restricted-syntax': [ERROR, 'WithStatement'],
    'no-throw-literal': OFF,
    'no-shadow': ERROR,
    'no-undef': ERROR,
    'no-underscore-dangle': OFF,
    'no-unused-expressions': ERROR,
    'no-unused-vars': [ERROR, {'args': 'none'}],
    'object-curly-spacing': [WARNING, 'always'],
    'quotes': [ERROR, 'single', 'avoid-escape'],
    'space-before-blocks': ERROR,
    'space-before-function-paren': [ERROR, 'always'],
    'flowtype/require-parameter-type': WARNING,
    'flowtype/require-return-type': [WARNING, 'always', {'annotateUndefined': 'never'} ],
    'flowtype/space-after-type-colon': [WARNING, 'always'],
    'flowtype/space-before-type-colon': [WARNING, 'never'],
    'flowtype/type-id-match': [WARNING, "^([A-Z][a-z0-9]*)+$"],
  },
  settings: {
    flowtype: {
      'onlyFilesWithFlowAnnotation': true,
    },
  },
};
