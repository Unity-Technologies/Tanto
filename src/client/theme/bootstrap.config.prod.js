/* @flow */

/*eslint-disable */

const bootstrapConfig = require('./bootstrap.config.js')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

bootstrapConfig.styleLoader = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: ['css-loader', 'sass-loader'],
})
module.exports = bootstrapConfig
