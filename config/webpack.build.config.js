var path = require('path')
var merge = require('webpack-merge')
var webpack = require('webpack')

var baseConfig = require('./webpack.base.config.js')

module.exports = [
  merge(baseConfig, {
    entry: [
      path.join(__dirname, '../src/plugin.js')
    ],
    output: {
      publicPath: '/',
      path: path.join(__dirname, '../dist'),
      filename: 'vue-listbox.min.js',
      libraryTarget: 'window',
      library: 'VueListbox'
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
        output: {
          comments: false
        },
        compress: {
          warnings: false
        },
        parallel: true
      })
    ]
  }),
  merge(baseConfig, {
    entry: [
      path.join(__dirname, '../src/VueListbox.vue')
    ],
    output: {
      publicPath: '/',
      path: path.join(__dirname, '../dist'),
      filename: 'vue-listbox.js',
      library: 'VueListbox',
      libraryTarget: 'umd',
      umdNamedDefine: true
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
        output: {
          comments: false
        },
        compress: {
          warnings: false
        },
        parallel: true
      })
    ]
  })
]
