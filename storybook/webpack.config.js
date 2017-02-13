// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add addional webpack configurations.
// For more information refer the docs: https://goo.gl/qPbSyX

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

// load the default config generator
const genDefaultConfig = require('@kadira/storybook/dist/server/config/defaults/webpack.config.js')

module.exports = function ModifyConfig(config, env) {
  const newConfig = genDefaultConfig(config, env)

  // this is used by the custom `rr.js` module
  newConfig.resolve.alias['react-router-original'] = require.resolve('react-router')
  // this `rr.js` will replace the Link with a our own mock component
  newConfig.resolve.alias['react-router'] = require.resolve('./rr.js')

  return newConfig
}
