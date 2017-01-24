/* @flow */

import { types } from '../index'
import { getFetchStatus } from 'ducks/fetch'
import { createSelector } from 'reselect'
import type { StatusType } from 'ducks/fetch'
export type { StatusType } from 'ducks/fetch'

import _ from 'lodash'

export const getPRPageFetchStatus =
  (state: Object): StatusType => getFetchStatus(state, types.FETCH_PULL_REQUESTS)


export const getPullRequestFetchStatus =
  (state: Object): StatusType => getFetchStatus(state, types.FETCH_PULL_REQUEST)


export const getOwnedFetchStatus =
  (state: Object): StatusType => getFetchStatus(state, types.FETCH_USER_PULL_REQUESTS)


export const getAssignedFetchStatus =
  (state: Object): StatusType => getFetchStatus(state, types.FETCH_USER_ASSIGNED_PULL_REQUESTS)


export const getPullRequest =
  (state: Object, props: Object): Object => {
    const id = props.params ? props.params.prid : props.pullRequestId || props.id
    return state.pullrequests.entities[id]
  }

export const getIds = (state: Object): Array<Number> => {
  const { pagination: { pages, currentPage } } = state
  return pages[currentPage]
}

export const pullRequestsEntitiesSelector =
  (state: Object, props: Object): Object => state.pullrequests.entities

export const pullRequestsIdsSelector =
  (state: Object, props: Object): Array<Number> => getIds(state.pullrequests)

export const getPullRequests = createSelector(
  pullRequestsEntitiesSelector, pullRequestsIdsSelector,
  (pullRequestsEntities, pullRequestsIds) =>
    _.values(_.pick(pullRequestsEntities, pullRequestsIds))
)
