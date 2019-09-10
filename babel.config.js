// babel.config.js
module.exports = {
  presets: [
    ['@babel/preset-env', {
      useBuiltIns: 'usage',
      corejs: { version: 3 },
    },
    ],
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    'dynamic-import-node',
  ],
}
