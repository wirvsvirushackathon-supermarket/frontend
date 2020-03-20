module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 9,
    jsx: true,
    sourceType: 'module',
    useJSXTextNode: true,
    ecmaFeatures: {
      modules: true
    },
    pragma: 'React'
  },
  plugins: ['react', 'prettier'],
  env: {
    browser: true,
    node: true,
    es2017: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': [
      2,
      {
        varsIgnorePattern: '^React$',
        argsIgnorePattern: '^_.*?$'
      }
    ],
    '@typescript-eslint/semi': [2, 'never'],
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/member-delimiter-style': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/ban-ts-ignore': 0,
    'react/prop-types': 0
  }
}
