const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: "./src/scripts/index.js",

  output: {
    filename: "[name].[hash].js",
    path: path.resolve(__dirname, "dist")
  },

  mode: "development",

  devtool: 'inline-source-map',

  devServer: {
    contentBase: './dist',
    open: true
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader"
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
          options: {
            minimize: false,
            removeComments: false,
            collapseWhitespace: false
          }
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "images/",
              publicPath: "images/"
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),

    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),

    new CleanWebpackPlugin('dist')
  ]
};
