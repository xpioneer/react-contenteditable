const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const _PROD_ = process.env.NODE_ENV === 'production'

module.exports = {
  mode: _PROD_ ? 'production' : 'development',
  // devtool: '',
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?/,
        loader: 'babel-loader',
      },
      {
        test: /\.less$/,
        use: [
          _PROD_ ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'less-loader'
        ],
      },
    ],
  },
  resolve: {
    // 用于查找模块的目录
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  externals: {
    'react': 'react',
    'react-dom': 'react-dom'
  },
  devServer: {
    port: 3005,
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    _PROD_ ? new MiniCssExtractPlugin({
      filename: "./index.css",
    }) : new HtmlWebpackPlugin({
      template: path.join(__dirname, './example/index.html'),
      filename: './index.html',
    })
  ]
}