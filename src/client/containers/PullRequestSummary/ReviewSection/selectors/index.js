/* @flow */

import { getPullRequest } from 'ducks/pullrequests/selectors'
import { createSelector } from 'reselect'

export const getPullRequestReviewStatus = createSelector(
  getPullRequest,
  pr => (pr ? pr.status : null),
)

export const getPullRequestReviews = createSelector(
  getPullRequest,
  pr => (pr && pr.reviews ? pr.reviews : null),
)

export const getMissingReviewers = createSelector(
  getPullRequest,
  pr => (pr && pr.missingReviewers ? pr.missingReviewers : null),
)
