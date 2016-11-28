var fs = require('fs')

module.exports = function(babelConfig) {
  var babelrc = fs.readFileSync(babelConfig)
  var babelrcObject = {}

  try {
    babelrcObject = JSON.parse(babelrc)
  } catch (err) {
    console.error('==>     ERROR: Error parsing .babelrc.')
    console.error(err)
  }

  var babelrcObjectDevelopment = babelrcObject.env && babelrcObject.env.development || {}

  var combinedPlugins = babelrcObject.plugins || []
  combinedPlugins = combinedPlugins.concat(babelrcObjectDevelopment.plugins)

  var babelLoaderQuery = Object.assign({}, babelrcObjectDevelopment, babelrcObject, { plugins: combinedPlugins })
  delete babelLoaderQuery.env

  babelLoaderQuery.plugins = babelLoaderQuery.plugins || []
  var reactTransform = null
  for (var i = 0; i < babelLoaderQuery.plugins.length; ++i) {
    var plugin = babelLoaderQuery.plugins[i]
    if (Array.isArray(plugin) && plugin[0] === 'react-transform') {
      reactTransform = plugin
    }
  }

  if (!reactTransform) {
    reactTransform = ['react-transform', { transforms: [] }]
    babelLoaderQuery.plugins.push(reactTransform)
  }
  return babelLoaderQuery
}
