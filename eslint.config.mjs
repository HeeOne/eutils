import config from 'eslint-config-standard'

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...[
    {
      root: true,
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
  ].concat(config),
]
