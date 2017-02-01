import { createSelector } from 'reselect'
import _ from 'lodash'

export const getIds = (state) => {
  const { pagination: { pages, currentPage } } = state
  return pages[currentPage]
}

export const entitiesSelector = state => state.entities

export const pullRequestsOwnedIdsSelector = state => getIds(state.session.pullRequestsOwned)
export const pullRequestsAssignedIdsSelector = state => getIds(state.session.pullRequestsAssigned)
export const pullRequestsWatchingIdsSelector = state => getIds(state.session.pullRequestsWatching)
export const pullRequestsSelector = state => state.entities.pullRequests

export const pullRequestsComputation = (pullRequests, ids) => (
  _.isEmpty(pullRequests) || !ids ? [] :
    _.values(_.pick(pullRequests, ids))
)

export const getPullRequestsOwned = createSelector(
  pullRequestsSelector, pullRequestsOwnedIdsSelector, pullRequestsComputation
)

export const getPullRequestsAssigned = createSelector(
  pullRequestsSelector, pullRequestsAssignedIdsSelector, pullRequestsComputation
)

export const getPullRequestsWatching = createSelector(
  pullRequestsSelector, pullRequestsWatchingIdsSelector, pullRequestsComputation
)

export const getPersona = state => _.get(state, ['session', 'profile', 'persona'], null)
export const getLoggedUsername = state => _.get(state, ['entities', 'me', 'username'], null)

export const getPullRequestsOwnedTotal = state =>
  _.get(state, ['entities', 'me', 'pullRequestsOwned', 'total'], 0)

export const getPullRequestsAssignedTotal = state =>
  _.get(state, ['entities', 'me', 'pullRequestsAssigned', 'total'], 0)
