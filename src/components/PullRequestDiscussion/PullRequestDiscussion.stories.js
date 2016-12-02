/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'

import PullRequestDiscussion from './PullRequestDiscussion'

storiesOf('PullRequestDiscussion', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <PullRequestDiscussion
      onSaveComment={action('onSaveComment')}
    />
  ))
