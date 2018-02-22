var opn = require('opn')
var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')

var webpackDevConfig = require('../config/webpack.dev.config.js')
var config = require('../config/config.js')

var webpackDevServerConfig = {
  clientLogLevel: 'warning',
  historyApiFallback: true,
  hot: true,
  overlay: {
    warnings: false,
    errors: true
  },
  stats: {
    colors: true,
    modules: false
  }
}

var compiler = webpack(webpackDevConfig)
var server = new WebpackDevServer(compiler, webpackDevServerConfig)
server.listen(config.dev.port, config.dev.host, function () {})

var uri = 'http://' + config.dev.host + ':' + config.dev.port
opn(uri)
