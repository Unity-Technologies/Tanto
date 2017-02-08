const path = require('path')
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')

const isomorphicTools = require('./isomorphic-tools')

const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(isomorphicTools)


const loaders = [
  {
    test: /\.(js|jsx)$/,
    loader: 'babel-loader?cacheDirectory',
    exclude: /node_modules/,
  },
  {
    test: /\.json$/,
    loader: 'json-loader',
  },
  {
    test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url-loader?limit=10000&mimetype=application/font-woff',
  },
  {
    test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url-loader?limit=10000&mimetype=application/font-woff',
  },
  {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
  },
  {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'file-loader',
  },
  {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
  },
  {
    test: webpackIsomorphicToolsPlugin.regular_expression('images'),
    loader: 'url-loader?limit=10240',
  },
  {
    test: /\.(graphql|gql)$/,
    exclude: /node_modules/,
    loader: 'raw-loader',
  },
]

const config = {
  context: path.resolve(__dirname, '..'),
  node: {
    fs: 'empty',
  },
  resolve: {
    modules: [
      path.resolve(__dirname, '../src'),
      'node_modules',
    ],
    extensions: ['.json', '.js', '.jsx'],
    alias: {
      containers: 'client/containers',
      components: 'client/components',
      ducks: 'client/ducks',
      sagas: 'client/sagas',
      services: 'universal/services',
      universal: 'universal',
      pages: 'client/pages',
      utils: 'client/utils',
      routes: 'client/routes',
      tests: 'client/tests',
      server: 'server',
    },
  },
}

module.exports = {
  config,
  loaders,
  webpackIsomorphicToolsPlugin,
}
