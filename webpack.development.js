var env = process.env.NODE_ENV
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack')
var path = require('path')
var rucksack = require('rucksack-css')
var autoprefixer = require('autoprefixer')
var includes = [
  path.resolve(__dirname, 'client'),
  // path.resolve(__dirname, 'platforms')
]

module.exports = {
  name: 'backend dev hot middlware',
  entry: {
      client: ['eventsource-polyfill',
          'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
          './client/client.js']
  },
  output: {
    path: path.join(__dirname, '/public/static'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/zzz/'
  },
  // resolve: {
  //   modulesDirectories: ['node_modules', path.join(__dirname, '/node_modules')],
  //   extensions: ['', '.js', '.jsx']
  // },
  //
  // resolveLoader: {
  //   modulesDirectories: ['node_modules', path.join(__dirname, '/node_modules')]
  // },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: includes,
        loader: 'babel-loader',
        query: {
          presets: ['react','es2015','react-hmre'],
            plugins: ['transform-runtime', 'add-module-exports']
            // env: {
            //     'development': {
            //         'presets': ['react-hmre']
            //     }
            // }
        }
      }, {
        test: /\.css$/,
        //loader: 'style!css'
            //loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            //test: /\.css$/,
            //loader: ExtractTextPlugin.extract('style', 'css?modules&camelCase&importLoaders=1&localIdentName=[hash:base64:8]')
            loaders: [
                'style',
                'css?modules&camelCase&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:8]',
                'sass'
            ]
        }, {
        test: /\.less$/,
        include: includes,
        loader: 'style!css!less!postcss'
      },
      { test: /\.woff2?$/, loader: 'url?limit=10000&minetype=application/font-woff' },
      { test: /\.ttf$/, loader: 'url?limit=10000&minetype=application/octet-stream' },
      { test: /\.eot$/, loader: 'file' },
      { test: /\.svg$/, loader: 'url?limit=10000&minetype=image/svg+xml' },
      { test: /\.(png|jpg|jpeg|gif)$/i, loader: 'url?limit=10000&name=[name].[ext]' },
      { test: /\.json$/, loader: 'json' },
        {
            test: /\.html$/,
            loader: 'html?minimize=false'
        }
    ]
  },
    // postcss: [
    //     // small sugar for CSS
    //     require('postcss-font-magician'),
    //     require('autoprefixer'),
    // ],
  // postcss: [
  //   rucksack(),
  //   autoprefixer({
  //     browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8']
  //   })
  // ],
    resolve: {extensions: ['', '.js', '.json', '.css']},
  plugins: [
      // new ExtractTextPlugin('common.css', {
      //     allChunks: true
      // }),
      // new webpack.DefinePlugin({
      //     'process.env.NODE_ENV': JSON.stringify(env)
      // }),
    //new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
          filename: './views/dev/home.html',
          template: './views/tpl/home.tpl.html'
      }),
      new webpack.NoErrorsPlugin()
  ]
}

