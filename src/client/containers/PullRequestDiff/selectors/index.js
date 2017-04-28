/* @flow */
import { getPullRequestFiles } from 'ducks/pullrequests/selectors'
import { createSelector } from 'reselect'
import { getLoggedUsername } from 'ducks/session/selectors'

export const getData = createSelector(
    getPullRequestFiles, getLoggedUsername,
    (files, user, repoName) => ({
      files,
      loggedUsername: user,
    })
  )


export default getData
