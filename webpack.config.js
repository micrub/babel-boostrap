/* eslint quotes:0 */
/* eslint semi:0 */
/* eslint spaced-comment:0 */
/* eslint no-unused-vars:0 */


const OUT_DIR = "dist";

const path = require("path");
const plugins = [
  require("@babel/plugin-transform-class-properties"),
]

const presets = ["@babel/preset-env"]

module.exports = {
  entry: "./src/index.js",
  devtool: "source-map",
  output: {
    // export itself to a global var
    libraryTarget: "var",
    // TODO globall should be less generic to avoid shadowing
    library: "Core",
    path: path.resolve(__dirname, OUT_DIR),
    filename: "index.js"
  },
  plugins: [
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            //cacheDirectory: true,
            presets
            plugins
          }
        }
      }
    ]
  }
};
