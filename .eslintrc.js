module.exports = {
  parser: 'babel-eslint',
  extends: ['plugin:jest/recommended', 'prettier'],
  env: {
    browser: true,
    node: true,
    mocha: true,
    es6: true,
    jest: true,
    jasmine: true,
    'jest/globals': true
  },
  plugins: ['import', 'jest', 'prettier'],
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  rules: {
    'prettier/prettier': [2, {
      printWidth: 100,
      trailingComma: 'es5',
      semi: false,
      singleQuote: true,
      jsxBracketSameLine: true,
    }],
  }
}
