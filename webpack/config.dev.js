/* eslint-disable max-len, import/no-extraneous-dependencies */
const path = require('path')
const webpack = require('webpack')
const assetsPath = path.resolve(__dirname, '../static/dist')

const host = (process.env.HOST || 'localhost')
const port = (+process.env.PORT + 1) || 3001

const baseConfig = require('./config.base')

module.exports = Object.assign({}, baseConfig.config, {
  devtool: 'inline-source-map',
  performance: {
    hints: false,
  },
  entry: {
    main: [
      `webpack-hot-middleware/client?path=http://${host}:${port}/__webpack_hmr`,
      'bootstrap-sass-loader!./src/client/theme/bootstrap.config.js',
      'font-awesome-webpack!./src/client/theme/font-awesome.config.js',
      './src/client/index.js',
    ],
  },
  output: {
    path: assetsPath,
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: `http://${host}:${port}/dist/`,
  },
  module: {
    loaders: baseConfig.loaders.concat([
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!sass-loader?outputStyle=expanded&sourceMap',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?localIdentName=[local]___[hash:base64:5]',
      },
    ]),
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
    }),
    baseConfig.webpackIsomorphicToolsPlugin.development(),
  ],
})
