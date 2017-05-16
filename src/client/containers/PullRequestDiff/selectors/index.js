/* @flow */
import { getPullRequestFiles } from 'ducks/pullrequests/selectors'
import { createSelector } from 'reselect'
import { getLoggedUsername } from 'ducks/session/selectors'
import { getReviewFiles } from 'ducks/review/selectors'

export const getData = createSelector(
  getPullRequestFiles, getLoggedUsername, getReviewFiles,
  (files, user, reviews) => ({
    files,
    loggedUsername: user,
    reviews,
  })
)


export default getData
