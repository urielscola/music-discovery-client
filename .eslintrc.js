module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  extends: [
    'eslint:recommended',
    'airbnb',
    'prettier',
    'prettier/react',
    'plugin:import/warnings'
  ],
  settings: {
    "import/resolver": {
      "node": {
        "paths": ["src"]
      }
    }
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module',
    extends: 'standard',
    parser: 'babel-eslint'
  },
  plugins: ['react', 'prettier', 'jsx-a11y'],
  rules: {
    'react/forbid-prop-types': 0,
    'react/prop-types': 0,
    'import/no-extraneous-dependencies': 0,
    'import/prefer-default-export': 0,
    'import/no-absolute-path': 0,
    'camelcase': 0,
    'no-underscore-dangle': 0,
    'react/jsx-filename-extension': 0,
    'no-return-assign': 0,
    'react/react-in-jsx-scope': 0,
    'react/require-default-props': 0,
    'class-methods-use-this': 0,
    'react/jsx-props-no-spreading': 0,
    'no-plusplus': 0,
    'no-unused-expressions': ['error', { allowTaggedTemplates: true }],
    'no-underscore-dangle': 0,
    'react/no-unused-prop-types': 0,
    'no-await-in-loop': 0,
    'no-param-reassign': 0,
    'consistent-return': 0,
    'react-hooks/exhaustive-deps': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'prettier/prettier': 'error',
    'react/destructuring-assignment': 0
  }
};