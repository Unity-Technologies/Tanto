import { createSelector } from 'reselect'
import _ from 'lodash'
import { statusFetchFactory } from 'ducks/fetch/selectors'
import { types } from '../actions'
import { userEntitiesSelector } from 'ducks/users/selectors'
import { denormalizePullRequestUsers } from 'ducks/pullrequests/selectors'

export const getIds = (state) => {
  const { pagination: { pages, currentPage } } = state
  return pages[currentPage]
}

export const entitiesSelector = state => state.entities

export const pullRequestsOwnedIdsSelector = state => getIds(state.session.pullRequestsOwned)
export const pullRequestsAssignedIdsSelector = state => getIds(state.session.pullRequestsAssigned)
export const pullRequestsWatchingIdsSelector = state => getIds(state.session.pullRequestsWatching)
export const pullRequestsSelector = state => state.entities.pullRequests

export const pullRequestsComputation = (pullRequests, ids, userEntities) => {
  const res = _.isEmpty(pullRequests) || !ids ? [] : _.values(_.pick(pullRequests, ids))
  return res.map(pr => denormalizePullRequestUsers(pr, userEntities))
}

export const getPullRequestsOwned = createSelector(
  pullRequestsSelector, pullRequestsOwnedIdsSelector, userEntitiesSelector,
  pullRequestsComputation
)

export const getPullRequestsAssigned = createSelector(
  pullRequestsSelector, pullRequestsAssignedIdsSelector, userEntitiesSelector,
  pullRequestsComputation
)

export const getPullRequestsWatching = createSelector(
  pullRequestsSelector, pullRequestsWatchingIdsSelector, userEntitiesSelector,
  pullRequestsComputation
)

export const getPersona = state => _.get(state, ['session', 'profile', 'persona'], null)
export const getLoggedUsername = state => _.get(state, ['entities', 'me', 'username'], null)
export const getLoggedUserId = state => _.get(state, ['entities', 'me', 'id'], null)
export const getLoggedUser = state => _.get(state, ['entities', 'me'], null)

export const getLoggedUserAvatar = createSelector(
  userEntitiesSelector, getLoggedUserId,
  (entities: Object, id: string) => {
    const user = entities[id]
    return user ? user.slack.avatar : null
  })


export const getPullRequestsOwnedTotal = state =>
  _.get(state, ['entities', 'me', 'pullRequestsOwned', 'total'], 0)

export const getPullRequestsAssignedTotal = state =>
  _.get(state, ['entities', 'me', 'pullRequestsAssigned', 'total'], 0)

export const getOwnedFetchStatus = statusFetchFactory(types.FETCH_USER_PULL_REQUESTS)
export const getAssignedFetchStatus = statusFetchFactory(types.FETCH_USER_ASSIGNED_PULL_REQUESTS)
