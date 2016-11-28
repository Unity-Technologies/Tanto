var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');

module.exports = {
  assets: {
    images: {
      extensions: [
        'jpeg',
        'jpg',
        'png',
        'gif'
      ],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    },
    fonts: {
      extensions: [
        'woff',
        'woff2',
        'ttf',
        'eot'
      ],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    },
    svg: {
      extension: 'svg',
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    },
    bootstrap: {
      extension: 'js',
      include: ['./src/theme/bootstrap.config.js'],
      filter: function(module, regex, options, log) {
        function is_bootstrap_style(name) {
          return name.indexOf('./src/theme/bootstrap.config.js') >= 0;
        }
        if (options.development) {
          return is_bootstrap_style(module.name) && WebpackIsomorphicToolsPlugin.style_loader_filter(module, regex, options, log);
        }
      },

      path: WebpackIsomorphicToolsPlugin.style_loader_path_extractor,
      parser: WebpackIsomorphicToolsPlugin.css_loader_parser
    },
    style_modules: {
      extensions: ['less', 'scss'],
      filter: function(module, regex, options, log) {
        if (options.development) {

          return WebpackIsomorphicToolsPlugin.style_loader_filter(module, regex, options, log);
        } else {

          return regex.test(module.name);
        }
      },
      path: function(module, options, log) {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.style_loader_path_extractor(module, options, log);
        } else {
          return module.name;
        }
      },
      parser: function(module, options, log) {
        if (options.development) {
          return WebpackIsomorphicToolsPlugin.css_modules_loader_parser(module, options, log);
        } else {
          return module.source;
        }
      }
    }
  }
}
