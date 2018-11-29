const webpack = require('webpack');
const paths = require('path');
const helpers = require('./helpers');
const optimize = webpack.optimize;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const METADATA = {
    title: 'React Redux',
    baseUrl: '/'
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
    chunksSortMode: 'dependency',
    minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
    },
    inject: true
});

module.exports = require('./webpack.config.shared')({
    output: {
        path: helpers.root('dist'),
        filename: '[name]-bundle.[hash].js',
        chunkFilename: '[name]-chunk.[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: ExtractCssChunks.extract({
                    use: [
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
                })
            }
        ]
    },
    plugins: [
        new ExtractCssChunks(),
        new BundleAnalyzerPlugin(),
        htmlWebpackPlugin,
        new CopyWebpackPlugin(
            [{
                from: 'public/assets',
                to: 'assets'
            }],
            {
                // Doesn't copy any files with a txt extension
                ignore: ['*.txt'],
                copyUnmodified: true
            }
        ),
        new optimize.UglifyJsPlugin({
            minimize: true,
            compress: {
                drop_console: false,
                warnings: false,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true,
                negate_iife: false
            },
            mangle: {
                except: [
                    'exports',
                    'require'
                ]
            }
        }),
        // Generate a service worker script that will precache, and keep up to date,
        // the HTML & assets that are part of the Webpack build.
        new SWPrecacheWebpackPlugin({
            dontCacheBustUrlsMatching: /\.\w{8}\./,
            filename: 'service-worker.js',
            logger(message) {
                if (message.indexOf('Total precache size is') === 0) {
                    // This message occurs for every build and is a bit too noisy.
                    return;
                }
                if (message.indexOf('Skipping static resource') === 0) {
                    // This message obscures real errors so we ignore it.
                    // https://github.com/facebookincubator/create-react-app/issues/2612
                    return;
                }
                console.log(message);
            },
            minify: true,
            // For unknown URLs, fallback to the index page
            navigateFallback: '/index.html',
            // Ignores URLs starting from /__ (useful for Firebase):
            // https://github.com/facebookincubator/create-react-app/issues/2237#issuecomment-302693219
            navigateFallbackWhitelist: [/^(?!\/__).*/],
            // Don't precache sourcemaps (they're large) and build asset manifest:
            staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'all',
            minChunks(module) {
                return helpers.isExternal(module);
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            chunks: ['all'],
            minChunks: function (module, count) {
                const targets = ['babel-polyfill', 'core-js', 'lodash'];
                return helpers.checkChunk(module, targets)
                    || helpers.checkChunkByKeywords(module, targets)
                    || count >= 2;
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'react',
            chunks: ['all'],
            minChunks: function (module) {
                return helpers.checkChunkByKeywords(module, ['react']);
            }
        })
    ]
});
