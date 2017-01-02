/* @flow */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'

import Reviewers from './Reviewers.js'

storiesOf('PullRequestSummary Reviewers', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <Reviewers
      reviewers={[
        { name: 'James', type: 'Boss level 1' },
        { name: 'Joel', type: 'Boss level 2' },
      ]}
      onAdded={() => action('onAdded')}
    />
  ))
