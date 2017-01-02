/* @flow */
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'

import Comment from './Comment.js'

storiesOf('Comment', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <Comment />
  ))
