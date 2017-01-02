/* @flow */
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'

import PullRequestComment from './PullRequestComment.js'

storiesOf('PullRequestComment', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <PullRequestComment />
  ))
