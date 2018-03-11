const webpack = require('webpack')
const path = require('path')

const srcPath = path.join(__dirname, '..', '/src')

module.exports = {
  cache: true,
  entry: {
    app: srcPath + '/index.js',
  },
  resolve: {
    modules: ['node_modules'],
    alias: {
      jquery: path.resolve(__dirname, '../lib/jquery.js'),
    },
  },
  module: {
    rules: [
      {
        include: [srcPath],
        test: /\.js$/,
        loader: require.resolve('babel-loader'),
      },
    ],
  },
}
