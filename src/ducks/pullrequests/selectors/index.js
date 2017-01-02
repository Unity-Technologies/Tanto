/* @flow */

import { types } from '../index'
import { isFetchingSelector, errorSelector } from 'ducks/fetch'
import { createSelector } from 'reselect'
import _ from 'lodash'

export const computePullRequestLink = (pullrequest: Object, fn: Function): Object => (
  { ...pullrequest, link: fn(pullrequest.origin.name, pullrequest.id) }
)

export const computePullRequestOriginLink = (pullrequest: Object, fn: Function): Object => (
  { ...pullrequest,
    originLink: fn(pullrequest.target.name, pullrequest.origin.branch || ''),
  }
)

export const computePullRequestTargetLink = (pullrequest: Object, fn: Function): Object => (
  { ...pullrequest, targetLink: fn(pullrequest.target.name, pullrequest.target.branch || '') }
)

export const computePullRequest = (pullrequest: Object): any => (
  fn1 => (
    fn2 => (
            computePullRequestTargetLink(
              computePullRequestOriginLink(
                computePullRequestLink(pullrequest, fn1), fn2), fn2)))
)

type StateType = {
  fetch: {
    [key: string]: {
      isFetching: boolean,
      error: Object
    }
  }
}

export const getPageFetchStatus =
  (state: StateType): boolean => isFetchingSelector(types.FETCH_PULL_REQUESTS)(state)
export const getPageFetchError =
  (state: StateType): Object => errorSelector(types.FETCH_PULL_REQUESTS)(state)

export const getPullRequestFetchStatus =
  (state: StateType): boolean => isFetchingSelector(types.FETCH_PULL_REQUEST)(state)
export const getPullRequestFetchError =
  (state: StateType): Object => errorSelector(types.FETCH_PULL_REQUEST)(state)

export const getOwnedFetchStatus =
  (state: StateType): boolean => isFetchingSelector(types.FETCH_USER_PULL_REQUESTS)(state)
export const getOwnedFetchError =
  (state: StateType): Object => errorSelector(types.FETCH_USER_PULL_REQUESTS)(state)

export const getAssignedFetchStatus =
  (state: StateType): boolean => isFetchingSelector(types.FETCH_USER_ASSIGNED_PULL_REQUESTS)(state)
export const getAssignedError =
  (state: StateType): Object => errorSelector(types.FETCH_USER_ASSIGNED_PULL_REQUESTS)(state)

export const getPullRequest =
  (state: Object, props: Object): Object => state.pullrequests.entities[props.params.prid]

export const getIds = (state: Object) => {
  const { pagination: { pages, currentPage } } = state
  return pages[currentPage]
}

export const pullRequestsEntitiesSelector =
  (state: Object, props: Object): Object => state.pullrequests.entities

export const pullRequestsIdsSelector =
  (state: Object, props: Object): Object => getIds(state.pullrequests)

export const getPullRequests = createSelector(
  pullRequestsEntitiesSelector, pullRequestsIdsSelector,
  (pullRequestsEntities, pullRequestsIds) =>
    _.values(_.pick(pullRequestsEntities, pullRequestsIds))
)
