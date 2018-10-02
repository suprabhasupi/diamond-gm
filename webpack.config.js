const webpack = require("webpack");
const process = require('process');
const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const PUBLIC_PATH='/assets/';
const OUTPUT_DIRECTORY = __dirname + `/public/${PUBLIC_PATH}`;

const BABEL_PRESET = {
  loader: 'babel-loader',
  options: {
    presets: ['es2015']
  }
};

// const ENV = process.env.NODE_ENV;

module.exports = {
    entry: {
      app: "./app/client/app.js",
      style: "./app/stylesheets/style.scss"
    },
    output: {
        path: OUTPUT_DIRECTORY,
        filename: `[name].js`,
        publicPath: PUBLIC_PATH,
    },
    devServer: {
      index: 'views/home/index.ejs',
      host: '0.0.0.0',
      port: 9394,
      inline: true,
      hot: true,
      contentBase: 'public',
      stats: {
        chunks: false
      },
    },

    module: {
      rules: [
        { test: /\.jsx?$/, exclude: /node_modules/, use: BABEL_PRESET },
        { test: /\.jsx?$/, include: /node_modules\/quintype-toddy-libs/, use: BABEL_PRESET },
        { test: /\.(sass|scss)$/, use:[{loader: MiniCssExtractPlugin.loader},"css-loader"]},
        { test: /\.(jpeg|gif|png|svg|woff|ttf|wav|mp3)$/,
          use: {
            loader: "file-loader",
            query: {
              context: './app/assets',
              name: "[name].[ext]"
            }
          }
       },
      ]
    },
    plugins: [new MiniCssExtractPlugin({ filename: "[name].css" }),
    new webpack.HotModuleReplacementPlugin()]
};
