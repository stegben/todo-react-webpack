module.exports = {
  'parser': 'babel-eslint', // transform class properties
  'extends': 'airbnb',
  'plugins': [
    'react',
    'jsx-a11y',
    'import',
  ],
  'rules': {
    'react/jsx-filename-extension': 0,
    'react/no-unused-prop-types': 0,
  },
  'env': {
    'browser': true, // let 'window', 'document' defined
  }
};
