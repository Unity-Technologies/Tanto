/* eslint-disable import/no-extraneous-dependencies */
/* @flow */
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'

import CodeDiffView from './CodeDiffView'

import { PullRequestData } from '../../api/testPullRequest'

storiesOf('CodeDiffView', module)
  .addDecorator(muiTheme())
  .add('compact', () => (
    <CodeDiffView
      files={PullRequestData}
    />
  ))
