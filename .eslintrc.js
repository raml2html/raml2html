module.exports = {
  extends: [
    'eslint:recommended',
  ],
  plugins: [
    'prettier',
  ],
  env: {
    es6: true,
    browser: false,
    node: true,
    commonjs: true,
  },
  parserOptions: {
    ecmaVersion: 7,
  },
  rules: {
    'prettier/prettier': ['error', {trailingComma: 'es5', singleQuote: true}],
    'no-console': 'off',
    'prefer-const': 'error',
    'eqeqeq': 'error',
    'no-useless-return': 'error',
  }
};
