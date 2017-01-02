/* @flow */
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'

import TextEditorBox from './TextEditorBox.js'

storiesOf('TextEditorBox', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <TextEditorBox />
  ))
