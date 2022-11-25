// eslint-disable-next-line import/no-extraneous-dependencies -- Only used for dev scanning
module.exports = {
  // eslint-disable-next-line global-require,import/no-extraneous-dependencies
  ...require('@dwp/eslint-config-base'),
  plugins: ['cucumber'],
  rules: {
    'cucumber/expression-type': 'error',
    'cucumber/no-arrow-functions': 'error',
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['world'] }],
    'prefer-arrow-callback': 'off',
    'import/extensions': ['error', { mjs: 'always' }],
  },
  settings: {
    'import/resolver': {
      node: {
        extension: ['.js', '.cjs', '.mjs'],
      },
    },
  },
};
