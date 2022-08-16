module.exports = {
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'prettier',
    '@antfu',
  ],
  rules: {
    'semi': ['error', 'never'],
    'no-console': 'off',
    'react/no-unknown-property': 'off',
    'no-new': 'off',
    'react/display-name': 'off',
    'no-debugger': 'off',
    'no-restricted-syntax': 'off',
    'react/prop-types': 'off',
  },
}
