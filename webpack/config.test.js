require('babel-polyfill')

var path = require('path')

var nodeExternals = require('webpack-node-externals')
var babelLoader = require('./dev.babel')
var config = babelLoader('./.babelrc')

require('source-map-support').install({
  environment: 'node',
})

module.exports = {
  target: 'node',
  externals: [nodeExternals()],
  module: {
    loaders: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: ['babel?' + JSON.stringify(config), 'eslint-loader']
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.scss$/,
        loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap'
      },
      {
        test: /\.css$/,
        loader: 'style!css?localIdentName=[local]___[hash:base64:5]'
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      },
    ]
  },
  resolve: {
    root: path.resolve(__dirname),
    modulesDirectories: [
      'src',
      'node_modules'
    ],
    extensions: ['', '.json', '.js', '.jsx'],
    alias: {
      'containers': 'containers',
      'components': 'components',
      'ducks': 'ducks',
      'sagas': 'sagas',
      'services': 'services',
      'graphql-queries': 'api/graphql/queries',
      'universal': 'universal',
      'routes': 'routes'
    }
  }
}
