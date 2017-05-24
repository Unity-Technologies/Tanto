/* @flow */

import { getLoggedUserId } from 'ducks/session/selectors'
import { getPullRequestNormalized } from 'ducks/pullrequests/selectors'
import { createSelector } from 'reselect'

export const isCurrentUserOwner = createSelector(
  getLoggedUserId, getPullRequestNormalized,
  (id, pr) => {
    if (!id || !pr || !pr.owner) {
      return null
    }
    return id === pr.owner
  },
)

export default isCurrentUserOwner

