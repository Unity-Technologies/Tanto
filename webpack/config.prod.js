/* eslint-disable max-len, import/no-extraneous-dependencies */

const path = require('path')
const webpack = require('webpack')
const CleanPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

const projectRootPath = path.resolve(__dirname, '../')
const assetsPath = path.resolve(projectRootPath, './static/dist')

const baseConfig = require('./config.base')

module.exports = Object.assign({}, baseConfig.config, {
  devtool: 'source-map',
  entry: {
    main: [
      'bootstrap-sass-loader!./src/theme/bootstrap.config.prod.js',
      'font-awesome-webpack!./src/theme/font-awesome.config.prod.js',
      './src/app.js',
    ],
  },
  output: {
    path: assetsPath,
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: '/dist/',
  },
  module: {
    loaders: baseConfig.loaders.concat([
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=2&sourceMap!postcss-loader!sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true'),
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader'),
      },
    ]),
  },
  plugins: [
    new LodashModuleReplacementPlugin(),
    new CleanPlugin([assetsPath], {
      root: projectRootPath,
    }),
    new ExtractTextPlugin('[name]-[chunkhash].css', {
      allChunks: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },

      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false,
    }),

    new webpack.IgnorePlugin(/\.\/config/, /\/dev$/),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),

    baseConfig.webpackIsomorphicToolsPlugin,
  ],
})
