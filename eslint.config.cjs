const antfu = require('@antfu/eslint-config').default

module.exports = antfu(
  {
    files: ['**/*.js', '**/*.ts', '**/*.vue', '**/*.jsx', '**/*.tsx'],
    rules: {
      'style/semi': ['error', 'always'],
      'no-console': 'warn',
      'node/prefer-global/process': 0,
    },
    ignores: [
      'dist',
      'node_modules',
    ],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  {
    ignores: [
      '.vscode',
    ],
  },
)
