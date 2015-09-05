var webpack = require('webpack');
var webpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var pkg = require('./package.json');

var server = new webpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
});

server.listen(pkg.server.port, 'localhost', function (err) {
  if (err) {
    console.log(err);
  }

  console.log('Magic happening at port:' + pkg.server.port);
})
