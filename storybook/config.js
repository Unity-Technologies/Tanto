/* eslint-disable import/no-extraneous-dependencies */
import { configure } from '@kadira/storybook'

const req = require.context('../src/client/components', true, /.stories.js$/)
const reqCont = require.context('../src/client/containers', true, /.stories.js$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
  reqCont.keys().forEach(filename => reqCont(filename))
}

configure(loadStories, module)
