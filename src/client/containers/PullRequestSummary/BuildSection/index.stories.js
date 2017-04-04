/* @flow */
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'
import BuildSection from './index'

storiesOf('PullRequestSummary Reviewer', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <BuildSection />
  ))
