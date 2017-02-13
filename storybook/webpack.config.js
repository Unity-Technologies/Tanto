// load the default config generator.
const genDefaultConfig = require('@kadira/storybook/dist/server/config/defaults/webpack.config.js')

module.exports = function ModifyConfig(config, env) {
  const newConfig = genDefaultConfig(config, env)

  // this is used by the custom `rr.js` module
  newConfig.resolve.alias['react-router-original'] = require.resolve('react-router')
  // this `rr.js` will replace the Link with a our own mock component
  newConfig.resolve.alias['react-router'] = require.resolve('./rr.js')

  return newConfig
}
