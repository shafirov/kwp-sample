/* eslint-env node */
/* eslint-disable no-var */
/* eslint-disable modules/no-cjs */
/* eslint-disable vars-on-top */

var webpack = require('webpack');
var path = require('path');
var argv = require('minimist')(process.argv);

var HtmlWebpackPlugin = require('html-webpack-plugin');
var AnyBarWebpackPlugin = require('anybar-webpack');

var isDevelop = argv.d !== undefined;

var webpackConfig = {
  entry: {
    index: './index.js'
  },
  output: {
    path: './dist',
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.gradle\?.*$/,
        loaders: [
          './build/kwp/kwp'
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new webpack.ProvidePlugin({
      Kotlin: path.join(__dirname, 'build/kwp/kotlin-js-library-1.0.2-1.js')
    })
  ],
  devtool: 'source-map',
  devServer: {
    stats: {
      assets: false,
      children: false,
      chunks: false,
      hash: false,
      version: false
    }
  }
};

if (isDevelop) {
  webpackConfig.plugins.push(new AnyBarWebpackPlugin());
} else {
  webpackConfig.plugins.push(new webpack.DefinePlugin({
    // This has effect on the react lib size
    'process.env.NODE_ENV': '"production"'
  }));
}

module.exports = webpackConfig;
