module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    es6: true,
    node: true,
    mocha: true,
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "no-console": "off",
    "indent": "off", // dando conflito com a identação do typescript parser 
    "class-methods-use-this": "off",
    "import/no-unresolved": "off",
  },
  overrides: [{
    files: [ "./build" ],
    rules: {
      "no-unused-expressions": 0,
      accessors : 'off',
    }
  }]

};
