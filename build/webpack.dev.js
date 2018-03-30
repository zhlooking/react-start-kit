const path = require('path')
const webpack = require('webpack')
const configs = require('./config')
const DefinePlugin      = webpack.DefinePlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const toDefine = (configs) => {
  const option = {}
  for (let key in configs) {
    option[key] = JSON.stringify(configs[key])
  }
  return option
}

module.exports = {
  // devtool: 'eval',
  entry: [
    'react-hot-loader/patch',
    './src'
  ],

  // entry: './src',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'index.html' }),
    new DefinePlugin(toDefine(configs)),
    new ExtractTextPlugin(`[name].css`),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.join(__dirname, './')
    }
  },
  node: {
    fs: 'empty',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['next']
          }
        },
      }, {
        test: /\.[s]?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
    ]
  },
  devtool: 'source-map',
  devServer: {
    port: 3009,
    publicPath: '/',
    contentBase: './',
    historyApiFallback: true
  },
}
