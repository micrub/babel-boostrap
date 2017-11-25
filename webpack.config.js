/* eslint quotes:0 */
/* eslint semi:0 */
/* eslint spaced-comment:0 */
/* eslint no-unused-vars:0 */

//let CopyWebpackPlugin = require("copy-webpack-plugin");

const OUT_DIR = "dist";

const path = require("path");
//const fs = require("fs");
//const webpack = require("webpack");

//let WebpackBeforeBuildPlugin = require("before-build-webpack");

//let packageJson = require("./package.json");

//const copyOptions = [
  //{ from: "resources/assets/" }
//];

module.exports = {
  entry: "./src/index.js",
  devtool: "source-map",
  output: {
    // export itself to a global var
    libraryTarget: "var",
    // TODO pull name from package and prepare to be used as global var
    library: "Core",
    path: path.resolve(__dirname, OUT_DIR),
    filename: "index.js"
  },
  plugins: [
    //new webpack.ProvidePlugin({
      //$: "jquery",
      //jQuery: "jquery"
    //})
    //new CopyWebpackPlugin(copyOptions)
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components|resources)/,
        loader: "babel-loader",
        options: {
          //cacheDirectory: true,
          presets: ["env"],
          plugins: [
            require("babel-plugin-transform-runtime"),
            require("babel-plugin-transform-async-to-generator")
          ]
        }
      }
    ]
  }
};
