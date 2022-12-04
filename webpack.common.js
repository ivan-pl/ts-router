const path = require("path");

module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    environment: {
      arrowFunction: false,
    },
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  devServer: {
    compress: true,
    port: 9000,
    watchFiles: ["*.html"],
  },
};
