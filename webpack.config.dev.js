const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CompressionPlugin = require('compression-webpack-plugin')
const common = require('./webpack.config.js')
var path = require("path");

var distPath = path.join(__dirname, "/dist");

module.exports = merge(common, {
  watch: true,
  output: {
    path: distPath,
    filename: "[name].[chunkhash].js"
  },
})
