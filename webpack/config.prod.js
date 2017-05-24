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
  entry: {
    main: [
      'bootstrap-sass-loader!./src/client/theme/bootstrap.config.js',
      'font-awesome-webpack!./src/client/theme/font-awesome.config.js',
      './src/client/index.js',
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
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              query: {
                modules: true,
                importLoaders: 2,
                sourceMap: false,
              },
            },
            { loader: 'postcss-loader' },
            { loader: 'sass-loader' },
          ],
        }),
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader'],
        }),
      },
    ]),
  },
  plugins: [
    new LodashModuleReplacementPlugin({
      collections: true,
      paths: true,
      flattening: true,
    }),
    new CleanPlugin([assetsPath], {
      root: projectRootPath,
    }),
    new ExtractTextPlugin({
      filename: '[name]-[chunkhash].css',
      allChunks: true,
    }),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false,
      'process.env.KATANA_HOST': JSON.stringify(process.env.KATANA_HOST),
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    baseConfig.webpackIsomorphicToolsPlugin,
  ],
})
