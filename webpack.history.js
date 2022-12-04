const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  entry: {
    app: path.join(__dirname, "examples", "history-router", "index.ts"),
  },
  output: {
    publicPath: "/",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./examples/history-router/index.html",
    }),
  ],
  devServer: {
    historyApiFallback: true,
  },
});
