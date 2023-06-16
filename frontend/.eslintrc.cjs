module.exports = {
  env: {
    es6: true,
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'no-console': 0,
    'react/react-in-jsx-scope': 0,
    'default-param-last': 0,
    'react/prop-types': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'react/jsx-props-no-spreading': 0,
    'no-use-before-define': 0,
    'react/no-children-prop': 0,
    'prettier/prettier': 'error',
  },
};
