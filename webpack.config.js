const path = require('path');
const webpack = require('webpack');
const Promise = require('es6-promise').Promise;

const glob = require('glob-all');
const PurifyCSSPlugin = require('purifycss-webpack');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "none",
  context: path.resolve(__dirname, './src'),
  // Map, Set, requestAnimationFrame <IE11 polyfill
  // entry: ['babel-polyfill', './index.jsx'],
  entry: ['./index.jsx'],
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: "dist/",
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js'
  },
  module: {
    rules: [
      // extractCSS
      {
        test: /\.scss$/,
        use: [
        MiniCssExtractPlugin.loader,
        // "style-loader", // creates style nodes from JS strings
        "css-loader", // translates CSS into CommonJS
        "sass-loader" // compiles Sass to CSS
        ]
      },
      // url loader
      {
        test: /\.(png|svg|jpg|otf|ttf)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000
          } // Convert images < 10k to base64 strings
        }]
      },
      // babel-loader
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      // babel jsx
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  externals : {
    React: 'react',
    ReactDOM: 'react-dom'
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "../[name].bundle.css",
      // chunkFilename: "[id].chunk.css"
    }),
    new PurifyCSSPlugin({
      // Give paths to parse for rules. These should be absolute!
      paths: glob.sync([
        path.join(__dirname, '*.html'),
        path.join(__dirname, 'src/components/*.jsx')
      ]),
      purifyOptions: {
        whitelist: [ '*:not*' ]
      },
      minimize: true
    })
  ],
  resolve: {
    modules: [
      '../node_modules',
    ]
  }
};