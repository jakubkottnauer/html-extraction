const webpack = require('webpack')
const merge = require('webpack-merge')
const CompressionPlugin = require('compression-webpack-plugin')
const common = require('./webpack.config.js')
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const distPath = path.join(__dirname, '..', '/dist')

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: distPath,
    filename: 'html_extract.js',
    chunkFilename: 'html_extract_[name].js',
  },
  plugins: [
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
      threshold: 1024,
      minRatio: 0.8,
    }),
  ],
})
