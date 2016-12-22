/* @flow */

import { types } from '../index'
import { isFetchingSelector, errorSelector } from 'ducks/fetch'

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

export const isFetching =
  (state: StateType): boolean => isFetchingSelector(types.FETCH_PULL_REQUESTS)(state)
export const error =
  (state: StateType): Object => errorSelector(types.FETCH_PULL_REQUESTS)(state)

export const isPullRequestFetching =
  (state: StateType): boolean => isFetchingSelector(types.FETCH_PULL_REQUEST)(state)
export const pullRequestError =
  (state: StateType): Object => errorSelector(types.FETCH_PULL_REQUEST)(state)

export const isOwnedFetching =
  (state: StateType): boolean => isFetchingSelector(types.FETCH_USER_PULL_REQUESTS)(state)
export const ownedError =
  (state: StateType): Object => errorSelector(types.FETCH_USER_PULL_REQUESTS)(state)

export const isAssignedFetching =
  (state: StateType): boolean => isFetchingSelector(types.FETCH_USER_ASSIGNED_PULL_REQUESTS)(state)
export const assignedError =
  (state: StateType): Object => errorSelector(types.FETCH_USER_ASSIGNED_PULL_REQUESTS)(state)

export const isWatchingFetching =
  (state: StateType): boolean => isFetchingSelector(types.FETCH_USER_WATCHING_PULL_REQUESTS)(state)
export const watchingError =
  (state: StateType): Object => errorSelector(types.FETCH_USER_WATCHING_PULL_REQUESTS)(state)

export const pullRequestSelector =
  (state: Object, props: Object): Object => state.pullrequests.entities[props.params.prid]
