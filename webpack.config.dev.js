const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CompressionPlugin = require('compression-webpack-plugin')
const common = require('./webpack.config.js')
const path = require('path')
const fs = require('fs')

const distPath = path.join(__dirname, '/dist')
const dataPath = path.join(__dirname, '/templates')

let htmlPlugins = []

fs.readdirSync(dataPath).forEach(file => {
  // ignore MacOS temp file
  if (file !== '.DS_Store') {
    htmlPlugins.push(
      new HtmlWebpackPlugin({
        template: dataPath + '/' + file,
        inject: 'body',
        filename: path.join(distPath, file.split('.')[0] + '.html'),
      })
    )
  }
})

module.exports = merge(common, {
  watch: true,
  devtool: '#cheap-module-eval-source-map',
  output: {
    path: distPath,
    filename: '[name].[chunkhash].js',
  },
  plugins: [...htmlPlugins],
})
