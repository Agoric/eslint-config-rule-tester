module.exports = {
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  env: {
    es6: true, // supports new ES6 globals (e.g., new types such as Set)
    mocha: true,
  },
  rules: {
    'implicit-arrow-linebreak': 'off',
    'function-paren-newline': 'off',
    'arrow-parens': 'off',
    strict: 'off',
    'no-console': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-return-assign': 'off',
    'no-param-reassign': 'off',
    'no-restricted-syntax': ['off', 'ForOfStatement'],
  },
};
