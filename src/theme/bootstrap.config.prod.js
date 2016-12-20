/* @flow */

/*eslint-disable */

const bootstrapConfig = require('./bootstrap.config.js')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

bootstrapConfig.styleLoader = ExtractTextPlugin.extract({
  fallbackLoader: 'style-loader',
  loader: [
    { loader: 'css-loader'},
    { loader: 'sass-loader'},
  ]
})
module.exports = bootstrapConfig
