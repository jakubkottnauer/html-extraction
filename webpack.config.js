var webpack = require("webpack");
var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var srcPath = path.join(__dirname, "/src");
var dataPath = path.join(__dirname, "/data");

module.exports = {
  cache: true,
  devtool: "#cheap-module-eval-source-map",
  entry: {
    app: srcPath + "/index.js"
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
