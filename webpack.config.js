var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var srcPath = path.join(__dirname, "/src");
var distPath = path.join(__dirname, "/dist");
var dataPath = path.join(__dirname, "/data");

module.exports = {
  watch: true,
  cache: true,
  devtool: "#cheap-module-eval-source-map",
  entry: {
    app: srcPath + "/index.js"
  },
  output: {
    path: distPath,
    filename: "[name].[chunkhash].js"
  },
  resolve: {
    modules: ["node_modules"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: dataPath + '/alza.template.ejs',
      inject: 'body',
    })
  ]
};
