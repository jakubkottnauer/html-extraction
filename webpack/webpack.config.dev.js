const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CompressionPlugin = require('compression-webpack-plugin')
const common = require('./webpack.config.js')
const path = require('path')
const fs = require('fs')
const glob = require('glob')

const distPath = path.join(__dirname, '..', '/dist')
const dataPath = path.join(__dirname, '..', '/templates')

const htmlPlugins = []
glob.sync(`${dataPath}/*/*.html`).forEach(file => {
  htmlPlugins.push(
    new HtmlWebpackPlugin({
      template: file,
      inject: 'body',
      filename: path.join(distPath, file.split('/')[file.split('/').length - 1]),
    })
  )
})

module.exports = merge(common, {
  watch: true,
  mode: 'development',
  output: {
    path: distPath,
    filename: '[name].[chunkhash].js',
  },
  plugins: [...htmlPlugins],
})
