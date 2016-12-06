/* eslint-disable import/no-extraneous-dependencies */
/* @flow */
import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'

import PullRequestSummary, { PullRequestHeader } from './PullRequestSummary'

const pullRequestFixture = {
  title: 'New Test Pull requests',
  status: 'new',
  created: '2016-11-28 14:08:40.578150',
  owner: {
    avatar: null,
    full_name: 'Kateryna Musina',
    username: 'kateryna',
  },
  reviewers: [{
    review_status: null,
    user: {
      avatar: null,
      full_name: 'Sharron Bronson',
      username: 'sharron',
    },
  }],
}

storiesOf('PullRequestSummary', module)
  .addDecorator(muiTheme())
  .add('enabled', () => (
    <PullRequestSummary
      onAddReviewer={action('onAddReviewer')}
      onToggleReviewers={action('onToggleReviewers')}
      pullRequest={pullRequestFixture}
      toggleReviewers={false}
    />
  ))

storiesOf('PullRequestHeader', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <PullRequestHeader
      pullRequest={pullRequestFixture}
    />
  ))
