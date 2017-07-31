module.exports = {
  parser: 'babel-eslint',
  extends: [
    'standard',
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  plugins: [
    'react'
  ],
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console': process.env.NODE_ENV === 'production' ? 1 : 0
  }
}
