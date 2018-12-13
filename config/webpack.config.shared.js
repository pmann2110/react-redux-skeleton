const webpack = require('webpack');
const DefinePlugin = webpack.DefinePlugin;
const helpers = require('./helpers');

const HtmlElementsPlugin = require('./html-elements-plugin');

const definePlugins = new DefinePlugin({
  LOCAL: process.env.NODE_ENV === 'local',
  DEV: process.env.NODE_ENV === 'development',
  SIT: process.env.NODE_ENV === 'sit',
  UAT: process.env.NODE_ENV === 'uat',
  PROD: process.env.NODE_ENV === 'production'
});

const htmlElementsPlugin = new HtmlElementsPlugin({
  headTags: require('./head.config.common')
});

const shareEntries = [
  'babel-polyfill',
  helpers.root('src/index.jsx')
];

const shareRules = [
  {
    test: /\.js(x?)$/,
    exclude: /(node_modules)/,
    loaders: ['babel-loader']
  },
  {
    test: /\.(jpe?g|png|gif|ico)$/,
    exclude: /(node_modules)/,
    loader: 'url-loader?limit=100&name=assets/ex-images/[name].[ext]'
  },
  {
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'url-loader?limit=100&minetype=application/font-woff&name=assets/fonts/[name].[ext]'
  },
  {
    test: /\.(ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'url-loader?limit=100&name=assets/fonts/[name].[ext]'
  },
  {
    test: /\.json$/,
    loader: 'json-loader'
  },
  {
    // all SASS styles without manually importing them in each file
    test: /\.s?css$/,
    use: [
      {
        loader: 'sass-resources-loader',
        options: {
          resources: [
            './src/assets/css/sass/mixins.scss'
          ]
        }
      },
      'import-glob'
    ]
  }
];

/*
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = (options) => ({
  entry: options.entry ? options.entry.concat(shareEntries) : shareEntries,
  output: options.output,
  module: {
    rules: options.module && options.module.rules ? options.module.rules.concat(shareRules) : shareRules
  },
  stats: {
    children: false
  },
  plugins: options.plugins.concat([
    definePlugins,
    htmlElementsPlugin,
    new webpack.NamedModulesPlugin()
  ]),
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.js', '.css', '.scss', '.json'],
    alias: {
      // assets
      assets: helpers.root('src/assets'),
      // common
      common: helpers.root('src/common'),
      // i18n
      i18n: helpers.root('src/i18n'),
      // services
      services: helpers.root('src/services'),
      // store
      store: helpers.root('src/store')
    }
  },
  devtool: options.devtool,
  devServer: options.devServer
});

