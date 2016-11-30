import { createSelector } from 'reselect'
import _ from 'lodash'

export const computePullRequestBuilds = (pullrequest: Object): Object => (
  { ...pullrequest,
    buildStatus: 'success',
    buildName: 'ABV-2333',
    buildDate: '3 hours ago',
    buildLink: '#',
  }
)

/**
 * Selectors
 */

export const pullRequestsOwnedIdsSelector = state => state.session.pr_ids
export const pullRequestsAssignedIdsSelector = state => state.session.pr_assigned_ids
export const pullRequestsWatchingIdsSelector = state => state.session.pr_watching_ids
export const pullRequestsSelector = state => state.pullrequests.byId

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
