const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const commonPaths = require('./paths')

module.exports = {
  mode: 'development',
  output: {
    filename: '[name].js',
    path: commonPaths.outputPath,
    chunkFilename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      }
    ]
  },
  devServer: {
    contentBase: commonPaths.outputPath,
    compress: true,
    hot: true,
    historyApiFallback: true,
    port: 8080
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/template.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}
