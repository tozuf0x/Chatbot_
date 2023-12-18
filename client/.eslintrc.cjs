/* eslint-env node */

module.exports = {
  env: { browser: true, es2022: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'htmlacademy/react-typescript',
    'plugin:sonarjs/recommended',
    'plugin:@conarti/feature-sliced/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: 'tsconfig.json'
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  plugins: [
    'react-refresh',
    'sonarjs',
    '@conarti/feature-sliced'
  ],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'sonarjs/cognitive-complexity': 'error',
    'sonarjs/no-identical-expressions': 'error'
  },
  overrides: [
    {
      files: ['*test*'],
      rules: { '@typescript-eslint/unbound-method': 'off' }
    },
  ],
}
