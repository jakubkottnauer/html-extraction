const webpack = require('webpack')
const path = require('path')

const srcPath = path.join(__dirname, '/src')

module.exports = {
  cache: true,
  devtool: '#cheap-module-eval-source-map',
  entry: {
    app: srcPath + '/index.js',
  },
  resolve: {
    modules: ['node_modules'],
  },
}
