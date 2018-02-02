/**
 * @author zhuyaqin thea.zhu@foxmail.com
 */

const path = require('path'); // 为了得到项目根路径
const webpack = require('webpack'); // webpack核心
const CopyWebpackPlugin = require('copy-webpack-plugin');
const babelQuery = require('./babelConfig');

const APP_PATH = path.resolve(__dirname, 'src');
const APP_FILE = path.resolve(APP_PATH, 'index');
const BUILD_PATH = path.resolve(__dirname, 'dist');

module.exports = {
  entry: {
    app: APP_FILE
  },
  output: {
    path: BUILD_PATH,
    publicPath: '',
    filename: 'bundle.js',
    chunkFilename: '[name].chunk.js'
  },
  // devtool: 'source-map',  // 与UglifyJsPlugin冲突
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      use: [
        {
          loader: 'babel-loader',
          options: babelQuery
        }
      ],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.less$/,
      loader: 'style-loader!css-loader!less-loader'
    }, {
      test: /\.(eot|woff|svg|ttf|woff2|gif|appcache|mp3)(\?|$)/,
      exclude: /node_modules/,
      loader: 'file-loader?name=[name].[ext]'
    }, {
      test: /\.(png|jpg|gif)$/,
      exclude: /node_modules/,
      loader: 'url-loader?limit=8192&name=[hash:8].[name].[ext]'
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.LoaderOptionsPlugin({
      debug: false,
      options: {
        postcss: [
          prefixer()
        ]
      }
    }),
    new CopyWebpackPlugin([{
      from: './src/assets/images/dynamic',
      to: './assets/images/dynamic'
    }]),
    new webpack.optimize.CommonsChunkPlugin({
      minChunks: 2,
      async: true,
      name: 'vendor',
      filename: 'vendor.min.js'
    }), // 将依赖提取到一个js
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      compress: {
        warnings: false, // 不输出警告信息
        sequences: true,
        dead_code: true,
        conditionals: true,
        booleans: true,
        unused: true,
        if_return: true,
        join_vars: true,
        drop_console: true
      }
    })
    // new webpack.optimize.OccurenceOrderPlugin()  // 配置给最常用的id分配最简短的id, webpack 1.x 需要
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.less', '.css']
  }
};
