/* @flow */
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'

import TestAvatar from './TestAvatar.js'

storiesOf('TestAvatar', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <TestAvatar />
  ))