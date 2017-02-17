// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add addional webpack configurations.
// For more information refer the docs: https://goo.gl/qPbSyX

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

module.exports = {
  plugins: [
    // your custom plugins
  ],
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css?localIdentName=[local]___[hash:base64:5]',
      },
      {
        test: /\.png$/,
        loader: 'url-loader',
        query: { mimetype: 'image/png' },
      },
    ],
  },
  resolve: {
    alias: {
      // this is used by the custom `react-router.js` module
      'react-router-original': require.resolve('react-router'),
      // this `react-router.js` will replace the Link with a our own mock component
      'react-router': require.resolve('./react-router.js'),
    },
  },
}
