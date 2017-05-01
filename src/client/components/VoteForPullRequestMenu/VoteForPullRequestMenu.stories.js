/* @flow */
import React from 'react'
import { storiesOf } from '@kadira/storybook'

import VoteForPullRequestMenu from './index.js'

storiesOf('VoteForPullRequestMenu', module)
  .add('empty default', () => (
    <VoteForPullRequestMenu />
  ))
