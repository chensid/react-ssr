const path = require("path");
const nodeExternals = require("webpack-node-externals");
// 服务端的webpack
module.exports = {
  target: "node",
  mode: "development",
  entry: "./server/index.js",
  externalsPresets: { node: true },
  externals: [nodeExternals()],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // 才能支持import 支持jsx
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react", ["@babel/preset-env"]],
        },
      },
      {
        test: /\.css$/,
        use: [
          "isomorphic-style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                auto: true,
                localIdentName: "[name]__[local]--[hash:base64:5]",
              },
              importLoaders: 1,
              esModule: false,
            },
          },
        ],
      },
    ],
  },
};
