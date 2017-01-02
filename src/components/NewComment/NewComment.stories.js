/* @flow */
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'

import NewComment from './NewComment.js'

storiesOf('NewComment', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <NewComment />
  ))
