/* @flow */
import React from 'react'
import { storiesOf } from '@kadira/storybook'

import CodeMirrorView from './CodeMirrorView.js'

storiesOf('CodeMirrorView', module)
  .add('default', () => (
    <CodeMirrorView />
  ))
