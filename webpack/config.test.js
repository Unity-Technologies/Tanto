/* eslint-disable max-len, import/no-extraneous-dependencies */
const nodeExternals = require('webpack-node-externals')
const webpack = require('webpack')

require('source-map-support').install({
  environment: 'node',
})

const baseConfig = require('./config.base')

module.exports = Object.assign({}, baseConfig.config, {
  target: 'node',
  externals: [nodeExternals()],
  module: {
    loaders: baseConfig.loaders.concat([
      {
        test: /\.scss$/,
        loader: 'ignore-loader',
      },
      {
        test: /\.css$/,
        loader: 'ignore-loader',
      },
    ]),
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.KATANA_HOST': '"https://test-katana-host"',
    }),
  ],
})
