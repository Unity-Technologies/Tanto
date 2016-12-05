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
]

const config = {
  context: path.resolve(__dirname, '..'),
  node: {
    fs: 'empty',
  },
  progress: true,
  resolve: {
    root: path.resolve(__dirname),
    modulesDirectories: [
      'src',
      'node_modules',
    ],
    extensions: ['', '.json', '.js', '.jsx'],
    alias: {
      containers: 'containers',
      components: 'components',
      ducks: 'ducks',
      sagas: 'sagas',
      services: 'services',
      'graphql-queries': 'api/graphql/queries',
      universal: 'universal',
    },
  },
}

module.exports = {
  config,
  loaders,
  webpackIsomorphicToolsPlugin,
}
