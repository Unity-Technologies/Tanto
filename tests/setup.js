import { jsdom } from 'jsdom'

global.document = jsdom('<!doctype html><html><body></body></html>')
global.window = document.defaultView
global.navigator = global.window.navigator
global.localStorage = {
    getItem: function(key) {
      return this[key]
    },
    setItem: function(key, value) {
      this[key] = value
    }
  }
  /**
   * Setting server env variable to get rid of URL formatting for tests
   * @type {Boolean}
   */
global.__SERVER__ = true

