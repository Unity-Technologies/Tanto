/* @flow */
import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'

import PullRequestSummary, {
  PullRequestHeader,
  ChangesSection,
  RepositoriesSection,
  ReviewersSection,
  BuildSection,
  IssuesSection,
} from './PullRequestSummary'

const pullRequestFixture = {
  title: 'New Test Pull requests',
  status: 'new',
  created: '2016-11-28 14:08:40.578150',
  owner: {
    fullName: 'Kateryna Musina',
    username: 'kateryna',
  },
  reviewers: [{
    status: null,
    user: {
      fullName: 'Sharron Bronson',
      username: 'sharron',
    },
  }],
  files: [],
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

storiesOf('PullRequestSummary Header', module)
  .addDecorator(muiTheme())
  .add('PullRequestHeader', () => (
    <PullRequestHeader
      pullRequest={pullRequestFixture}
    />
  ))

storiesOf('PullRequestSummary Items', module)
  .addDecorator(muiTheme())
  .add('ChangesSection', () => (
    <ChangesSection
      pullRequest={pullRequestFixture}
    />
  ))
  .add('RepositoriesSection', () => (
    <RepositoriesSection
      pullRequest={pullRequestFixture}
    />
  ))
  .add('ReviewersSection', () => (
    <ReviewersSection
      onAddReviewer={action('onAddReviewer')}
      onToggleReviewers={action('onToggleReviewers')}
      pullRequest={pullRequestFixture}
      toggleReviewers={false}
    />
  ))
  .add('ReviewersSection (toggled)', () => (
    <ReviewersSection
      onAddReviewer={action('onAddReviewer')}
      onToggleReviewers={action('onToggleReviewers')}
      pullRequest={pullRequestFixture}
      toggleReviewers
    />
  ))
  .add('BuildSection', () => (
    <BuildSection
      pullRequest={pullRequestFixture}
    />
  ))
  .add('IssuesSection', () => (
    <IssuesSection
      pullRequest={pullRequestFixture}
    />
  ))
