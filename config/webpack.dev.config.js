var path = require('path')
var merge = require('webpack-merge')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var config = require('./config.js')
var baseConfig = require('./webpack.base.config.js')

module.exports = merge(baseConfig, {
  entry: [
    'webpack-dev-server/client?http://' + config.dev.host + ':' + config.dev.port + '/',
    'webpack/hot/dev-server',
    'babel-polyfill',
    path.join(__dirname, '../demo/main.js')
  ],
  output: {
    publicPath: '/',
    path: path.join(__dirname, '../dist'),
    filename: '[name].js'
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devtool: '#eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ]
})
