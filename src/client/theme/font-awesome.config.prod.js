/* @flow */

/*eslint-disable */

const fontAwesomeConfig = require('./font-awesome.config.js')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
fontAwesomeConfig.styleLoader = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: ['css-loader', 'sass-loader'],
})
module.exports = fontAwesomeConfig
