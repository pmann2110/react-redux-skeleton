const webpack = require('webpack');
const helpers = require('./helpers');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const METADATA = {
  title: 'React Redux',
  baseUrl: '/',
  isDevServer: helpers.isWebpackDevServer()
};

/*
* Plugin: HtmlWebpackPlugin
* Description: Simplifies creation of HTML files to serve your webpack bundles.
* This is especially useful for webpack bundles that include a hash in the filename
* which changes every compilation.
*
* See: https://github.com/ampedandwired/html-webpack-plugin
*/
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: helpers.root('public/index.html'),
  title: METADATA.title,
  metadata: METADATA,
  hash: false,
  inject: 'body'
});

module.exports = require('./webpack.config.shared')({
  output: {
    path: helpers.root('public'),
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
       {
        test: /\.s?css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]'
            }
          },
          {
            loader: 'sass-loader',
            options: {
              modules: true,
              localIdentName: '[local]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    htmlWebpackPlugin,
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'cheap-module-source-map',
  devServer: {
    port: 8080,
    host: 'localhost',
    hot: true,
    historyApiFallback: true,
    contentBase: helpers.root('public'),
    inline: true,
    stats: 'errors-only',
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: /node_modules/
    }
  }
});
