var fs = require('fs')

var babelrc = fs.readFileSync('./.babelrc')
var config

try {
  config = JSON.parse(babelrc)
} catch (err) {
  console.error('==>     ERROR: Error parsing .babelrc.')
  console.error(err)
}

require('babel-register')(config)
