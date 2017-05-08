/* @flow */
import React from 'react'
import { storiesOf } from '@kadira/storybook'

import PullRequestVoteMenu from './index.js'

storiesOf('PullRequestVoteMenu', module)
  .add('empty default', () => (
    <PullRequestVoteMenu />
  ))
