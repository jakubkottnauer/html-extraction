const webpack = require('webpack')
const path = require('path')

const srcPath = path.join(__dirname, '/src')

module.exports = {
  cache: true,
  entry: {
    app: srcPath + '/index.js',
  },
  resolve: {
    modules: ['node_modules'],
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.js$/,
            loader: require.resolve('babel-loader'),
            query: {
              presets: ['env', 'stage-2'],
            },
          },
        ],
      },
    ],
  },
}
