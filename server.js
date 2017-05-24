/* eslint-env node */
/* eslint-disable global-require, no-underscore-dangle */

require('./server.babel')
require('dotenv').config()

const path = require('path')

const rootDir = path.resolve(__dirname, '.')

global.__CLIENT__ = false
global.__SERVER__ = true
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production'

if (__DEVELOPMENT__) {
  const piping = require('piping')
  piping({
    hook: true,
    ignore: /(\/\.|~$|\.json|\.scss$)/i,
  })
}

const WebpackIsomorphicTools = require('webpack-isomorphic-tools')
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('./webpack/isomorphic-tools'))
  .server(rootDir, () => {
    require('./src/server/index')
  })
