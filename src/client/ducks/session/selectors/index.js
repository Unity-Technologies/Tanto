import { createSelector } from 'reselect'
import _ from 'lodash'

export const getIds = (state) => {
  const { pagination: { pages, currentPage } } = state
  return pages[currentPage]
}

export const pullRequestsOwnedIdsSelector = state => getIds(state.session.pullRequestsOwned)
export const pullRequestsAssignedIdsSelector = state => getIds(state.session.pullRequestsAssigned)
export const pullRequestsWatchingIdsSelector = state => getIds(state.session.pullRequestsWatching)
export const pullRequestsSelector = state => state.entities.pullRequests

export const getPullRequestsOwned = createSelector(
  pullRequestsSelector, pullRequestsOwnedIdsSelector,
  (pullRequests, pullRequestsOwnedIds) =>
    (_.isEmpty(pullRequests) || !pullRequestsOwnedIds ? [] :
    _.values(_.pick(pullRequests, pullRequestsOwnedIds)))
)

export const getPullRequestsAssigned = createSelector(
  pullRequestsSelector, pullRequestsAssignedIdsSelector,
  (pullRequests, pullRequestsAssignedIds) =>
    (_.isEmpty(pullRequests) || !pullRequestsAssignedIds ? [] :
    _.values(_.pick(pullRequests, pullRequestsAssignedIds)))
)

export const getPullRequestsWatching = createSelector(
  pullRequestsSelector, pullRequestsWatchingIdsSelector,
  (pullRequests, pullRequestsWatchingIds) =>
    (_.isEmpty(pullRequests) ? [] :
    _.values(_.pick(pullRequests, pullRequestsWatchingIds)))
)

export const getPersona = state => _.get(state, ['session', 'profile', 'persona'], null)
export const getLoggedUsername = state => _.get(state, ['entities', 'me', 'username'], null)

export const getPullRequestsOwnedTotal = state =>
  _.get(state, ['entities', 'me', 'pullRequestsOwned', 'total'], 0)

export const getPullRequestsAssignedTotal = state =>
  _.get(state, ['entities', 'me', 'pullRequestsAssigned', 'total'], 0)
