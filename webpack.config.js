const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
  mode: 'development',
  entry: './example/index.tsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    // libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?/,
        loader: 'babel-loader',
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },
  resolve: {
    // 用于查找模块的目录
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  // externals: {
  //   'react': 'react',
  //   'react-dom': 'react-dom'
  // },
  devServer: {
    port: 3005,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './example/index.html'),
      filename: './index.html',
    })
  ]
}