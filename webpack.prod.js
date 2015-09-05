var path = require('path');
var webpack = require('webpack');
var pkg = require('./package.json');

module.exports = {
  entry: [
    './sandbox/index'
  ],
  output: {
    path: path.join(__dirname, './build'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: ['node_modules']
  },
  module: {
    loaders: [{
      test: /\.jsx$/,
      loaders: ['babel'],
    }, {
      test: /\.css$/, 
      loaders: ['style-loader', 'css-loader'], 
    }]
  }
}
