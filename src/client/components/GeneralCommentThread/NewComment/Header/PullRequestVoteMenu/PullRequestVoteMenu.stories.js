/* @flow */
import React from 'react'
import { storiesOf, action } from '@kadira/storybook'

import PullRequestVoteMenu from './index.js'

storiesOf('PullRequestVoteMenu', module)
  .add('empty default', () => (
    <PullRequestVoteMenu onStatusSelect={action('onStatusSelect')} />
  ))
