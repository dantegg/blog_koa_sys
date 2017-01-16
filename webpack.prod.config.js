/**
 * Created by dantegg on 17-1-16.
 */
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var vendorArray= ['react','react-dom','redux','react-redux']

module.exports = {
    entry: {
        'bundle'     : path.join(__dirname,'/client/client.js'),
        'vendor'    : vendorArray,
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/static/',
        filename: "[name].[chunkhash:8].js",
        library: '[name]',
        chunckFilename:'chunk.[name].[chunkhash:8].js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style', 'css?modules&camelCase&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:8]')
            },
            { test: /\.less$/, loader: 'style-loader!css!less' },
            { test: /\.png$/, loader: "url-loader?mimetype=image/png" },
            { test: /\.woff$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf$/,  loader: "url-loader?limit=10000&mimetype=application/octet-stream" },
            { test: /\.eot$/,  loader: "url-loader" },
            {test: /\.json$/,   loader: 'json-loader'},
            { test: /\.svg$/,  loader: "url-loader?limit=10000&mimetype=image/svg+xml" },
            {
                test: /\.(jpeg|gif)$/,
                loader: 'file-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets:['react','es2015']
                }
            },
            {
                test: /\.html$/,
                loader: 'html?minimize=false'
            }
        ]
    },
    resolve:{
        extensions:['','.js','.json','.css','.less'],
        modulesDirectories: [
            'node_modules'
        ]
    },
    plugins: [
        new ExtractTextPlugin("dist/bundle.css"),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name:['vendor'],
            minChunks: Infinity,
            filename:'[name].[chunkhash:8].js'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings:false
            },
            output: {
                comments: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new HtmlWebpackPlugin({
            filename: './views/prod/home.html',
            template: './views/tpl/home.tpl.html'
        }),
    ]
};