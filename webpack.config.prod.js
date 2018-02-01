const webpack = require('webpack')
const merge = require('webpack-merge')
const CompressionPlugin = require('compression-webpack-plugin')
const common = require('./webpack.config.js')
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const distPath = path.join(__dirname, '/dist')

module.exports = merge(common, {
  output: {
    path: distPath,
    filename: 'prod.js',
  },
  plugins: [
    new UglifyJsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
      threshold: 1024,
      minRatio: 0.8,
    }),
  ],
})
