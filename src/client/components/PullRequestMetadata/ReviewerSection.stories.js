/* @flow */
import React, { Component } from 'react'
import { storiesOf } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'

import ReviewerSelection from './ReviewersSelection'

const USERS = [
  { username: 'alfredp', fullName: 'Alfred Pennyworth ' },
  { username: 'dwayne', fullName: 'Damian Wayne' },
  { username: 'special-username', fullName: 'Talia al Ghul' },
]

class WrappedReviewerSelection extends Component {
  /* eslint-disable react/sort-comp */

  constructor(props) {
    super(props)

    this.state = {
      reviewers: new Set(['dwayne']),
    }
  }

  state: {
    reviewers: Set<string>,
  }

  onToggleReviewer = (user: { username: string }) => {
    const reviewers = this.state.reviewers

    if (reviewers.has(user.username)) {
      reviewers.delete(user.username)
    } else {
      reviewers.add(user.username)
    }

    this.setState({
      reviewers,
    })
  }

  render() {
    return (
      <ReviewerSelection
        users={USERS}
        reviewers={this.state.reviewers}
        onToggleReviewer={this.onToggleReviewer}
      />
    )
  }
}

storiesOf('PullRequestSummary Reviewer', module)
  .addDecorator(muiTheme())
  .add('default', () => (
    <WrappedReviewerSelection />
  ))
