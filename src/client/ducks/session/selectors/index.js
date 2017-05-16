/* @flow */

import { createSelector } from 'reselect'
import _ from 'lodash'
import { statusFetchFactory } from 'ducks/fetch/selectors'
import { types } from '../actions'
import { userEntitiesSelector } from 'ducks/users/selectors'
import { denormalizePullRequestUsers } from 'ducks/pullrequests/selectors'

export const getIds = (state: Object) => {
  const { pagination: { pages, currentPage } } = state
  return pages[currentPage]
}

export const entitiesSelector = (state: Object) => state.entities

export const pullRequestsOwnedIdsSelector = (state: Object) => getIds(state.session.pullRequestsOwned)
export const pullRequestsAssignedIdsSelector = (state: Object) => getIds(state.session.pullRequestsAssigned)
export const pullRequestsWatchingIdsSelector = (state: Object) => getIds(state.session.pullRequestsWatching)
export const pullRequestsSelector = (state: Object) => state.entities.pullRequests

export const pullRequestsComputation = (pullRequests: Object, ids: Array<any>, userEntities: Object) => {
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

export const getPersona = (state: Object) => _.get(state, ['session', 'profile', 'persona'], null)
export const getLoggedUsername = (state: Object) => _.get(state, ['entities', 'me', 'username'], null)
export const getLoggedUserId = (state: Object) => _.get(state, ['entities', 'me', 'id'], null)

export const getLoggedUserAvatar = createSelector(
  userEntitiesSelector, getLoggedUserId,
  (entities: Object, id: string) => {
    const user = entities[id]
    return user && user.slack ? user.slack.avatar : null
  })

export const getLoggedUser = createSelector(
  userEntitiesSelector, getLoggedUserId,
  (entities: Object, id: string) => entities[id])

export const getPullRequestsOwnedTotal = (state: Object) =>
  _.get(state, ['entities', 'me', 'pullRequestsOwned', 'total'], 0)

export const getPullRequestsAssignedTotal = (state: Object) =>
  _.get(state, ['entities', 'me', 'pullRequestsAssigned', 'total'], 0)

export const getOwnedFetchStatus = statusFetchFactory(types.FETCH_USER_PULL_REQUESTS)
export const getAssignedFetchStatus = statusFetchFactory(types.FETCH_USER_ASSIGNED_PULL_REQUESTS)
