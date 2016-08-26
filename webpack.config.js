/* eslint-env node */
/* eslint-disable no-var */
/* eslint-disable modules/no-cjs */
/* eslint-disable vars-on-top */

var webpack = require('webpack');
var path = require('path');
var argv = require('minimist')(process.argv);

var HtmlWebpackPlugin = require('html-webpack-plugin');
var AnyBarWebpackPlugin = require('anybar-webpack');
var KotlinWebpackPlugin = require('./build/kwp/kwp')

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

    kwp: {
        buildFile: './build.gradle',
        project: 'showcase',
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
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

webpackConfig.plugins.push(new KotlinWebpackPlugin(webpackConfig.kwp))

if (isDevelop) {
    webpackConfig.plugins.push(new AnyBarWebpackPlugin());
} else {
    webpackConfig.plugins.push(new webpack.DefinePlugin({
        // This has effect on the react lib size
        'process.env.NODE_ENV': '"production"'
    }));
}

module.exports = webpackConfig;
