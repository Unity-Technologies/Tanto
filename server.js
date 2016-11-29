/* eslint-disable */

require('./server.babel')
require('dotenv').config()

var path = require('path')
var rootDir = path.resolve(__dirname, '.')

global.__CLIENT__ = false
global.__SERVER__ = true
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production'

if (__DEVELOPMENT__) {
  const piping = require('piping')
  piping({
      hook: true,
      ignore: /(\/\.|~$|\.json|\.scss$)/i
    })
}

var WebpackIsomorphicTools = require('webpack-isomorphic-tools')
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('./webpack/isomorphic-tools'))
  .server(rootDir, function() {
    require('./src/server')
  })
