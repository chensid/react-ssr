const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 客户端的webpack
module.exports = {
  mode: "development",
  // 客户端入口
  entry: "./client/index.js",
  // 客户端输出
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
    publicPath: "/",
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.csr.html",
      template: "src/index.csr.html",
      inject: true,
    }),
  ],
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
        test: /\.css$/i,
        use: [
          {
            loader: "style-loader",
            options: {
              esModule: false,
              injectType: "singletonStyleTag",
            },
          },
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
