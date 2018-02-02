const path = require('path');
const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');
const prefixer = require('autoprefixer');
const babelQuery = require('./babelConfig');

const BUILD_PATH = path.resolve(__dirname, 'dist');

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js',
    publicPath: ''
  },
  devtool: 'eval',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [{
          loader: 'babel-loader',
          options: babelQuery
        }],
        include: path.join(__dirname, 'src')
      }, {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }, {
        test: /\.less$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader!less-loader'
      }, {
        test: /\.(eot|woff|svg|ttf|woff2|gif|appcache|mp3)(\?|$)/,
        exclude: /node_modules/,
        loader: 'file-loader?name=[name].[ext]'
      }, {
        test: /\.(png|jpg|gif)$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=8192'
      }
    ]
  },
  plugins: [
    new DashboardPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: false,
      options: {
        postcss: [
          prefixer()
        ]
      }
    })
  ],
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css', '.less']
  }
};
