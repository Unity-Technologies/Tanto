/* @flow */
import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { muiTheme } from 'storybook-addon-material-ui'

import MissingReviewerList from './index'

const missingReviewers = [
  {
    "area": "Some code area",
    "reviewers": [
      {
        "username": "reviewuser",
        "fullName": "Reviewer User"
      }
    ]
  }
]
const unclaimedReviewers = [
  {
    "area": "Some unclaimed area",
    "reviewers": []
  }
]
const noMissingReviewers = []

storiesOf('MissingReviewerList', module)
  .addDecorator(muiTheme())
  .add('No missing reviewers', () => (
    <MissingReviewerList missingReviewers={noMissingReviewers} />
  ))
  .add('Missing area reviewer', () => (
    <MissingReviewerList
      missingReviewers={missingReviewers}
      addReviewer={action('add reviewer')}
      id={1} />
  ))
  .add('Unclaimed area reviewer', () => (
    <MissingReviewerList
      missingReviewers={unclaimedReviewers}
      addReviewer={action('add reviewer')}
      id={1} />
  ))
  .add('Missing and unclaimed area reviewer', () => (
    <MissingReviewerList
      missingReviewers={missingReviewers.concat(unclaimedReviewers)}
      addReviewer={action('add reviewer')}
      id={1} />
  ))
