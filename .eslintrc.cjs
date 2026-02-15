module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2024: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true }
  },
  plugins: [
    '@typescript-eslint',
    'import',
    'promise',
    'security',
    'unicorn',
    'jsdoc',
    'n',
    'react',
    'react-hooks',
    'jsx-a11y',
    'prettier'
  ],
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/recommended',
    'plugin:promise/recommended',
    'plugin:security/recommended',
    'plugin:unicorn/recommended',
    'plugin:jsdoc/recommended',
    'plugin:n/recommended',
    'plugin:prettier/recommended'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    /* Prettier */
    'prettier/prettier': 'error',

    /* React 17+ / 19 */
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',

    /* TypeScript */
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/consistent-type-imports': 'error',

    /* Import */
    'import/extensions': 'off',
    'import/no-unresolved': 'off',

    /* General */
    'no-console': 'warn',
    'class-methods-use-this': 'off'
  },
  ignorePatterns: ['dist', 'node_modules', '*.config.*']
}
