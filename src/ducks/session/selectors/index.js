import { createSelector } from 'reselect'
import _ from 'lodash'

export const getIds = (state) => {
  const { pages, currentPage } = state
  return pages[currentPage]
}

/**
 * Selectors
 */

export const pullRequestsOwnedIdsSelector = state => getIds(state.session.pullRequestsOwned)
export const pullRequestsAssignedIdsSelector = state => getIds(state.session.pullRequestsAssigned)
export const pullRequestsWatchingIdsSelector = state => getIds(state.session.pullRequestsWatching)
export const pullRequestsSelector = state => state.pullrequests.entities

export const pullRequestsOwned = createSelector(
  pullRequestsSelector, pullRequestsOwnedIdsSelector,
  (pullRequests, pullRequestsOwnedIds) =>
    _.values(_.pick(pullRequests, pullRequestsOwnedIds))
)

export const pullRequestsAssigned = createSelector(
  pullRequestsSelector, pullRequestsAssignedIdsSelector,
  (pullRequests, pullRequestsAssignedIds) =>
    _.values(_.pick(pullRequests, pullRequestsAssignedIds))
)

export const pullRequestsWatching = createSelector(
  pullRequestsSelector, pullRequestsWatchingIdsSelector,
  (pullRequests, pullRequestsWatchingIds) =>
    _.values(_.pick(pullRequests, pullRequestsWatchingIds))
)

export const selectors = {
  getPersona: (state: Object): string => state.session.persona,
  getProfile: (state: Object): Object => state.session.profile,

  /**
   * Raw entities slice from state
   */
  getPullRequests: (state: Object): Array<Object> => pullRequestsOwned(state),
  getPullRequestsAssigned: (state: Object): Array<Object> => pullRequestsAssigned(state),
  getPullRequestsWatching: (state: Object): Array<Object> => pullRequestsWatching(state),
}
