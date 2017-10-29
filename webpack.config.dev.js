const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CompressionPlugin = require('compression-webpack-plugin')
const common = require('./webpack.config.js')
const path = require('path')

const distPath = path.join(__dirname, '/dist')
const dataPath = path.join(__dirname, '/data')

module.exports = merge(common, {
  watch: true,
  devtool: '#cheap-module-eval-source-map',
  output: {
    path: distPath,
    filename: '[name].[chunkhash].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: dataPath + '/alza.template.ejs',
      inject: 'body',
    }),
  ],
})
