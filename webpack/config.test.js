/* eslint-disable max-len, import/no-extraneous-dependencies */
const nodeExternals = require('webpack-node-externals')

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
        loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap',
      },
      {
        test: /\.css$/,
        loader: 'style!css?localIdentName=[local]___[hash:base64:5]',
      },
    ]),
  },
})
