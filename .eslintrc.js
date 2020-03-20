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
  plugins: ['react', '@typescript-eslint', 'prettier'],
  env: {
    browser: true,
    node: true,
    es2017: true,
    es6: true
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/react',
    'plugin:prettier/recommended'
  ],
  rules: {
    'prettier/prettier': 'off',
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
    'react/prop-types': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    quotes: [
      'error',
      'single',
      { avoidEscape: true, allowTemplateLiterals: true }
    ]
  }
}
