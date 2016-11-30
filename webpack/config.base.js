var path = require('path')

module.exports = {
  context: path.resolve(__dirname, '..'),
  node: {
    fs: "empty"
  },
  progress: true,
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
      'universal': 'universal'
    }
  }
}
