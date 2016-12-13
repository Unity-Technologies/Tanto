// TODO: add flow annotations

import { PullRequestGraphType } from 'services/ono/queries/pullrequests'
import { isFetching, error, entities, setEntities, types as entitiesTypes } from 'ducks/entities'

import { pagination, requestPage } from 'ducks/pagination'
import { combineReducers } from 'redux'

/**
 * Action types
 */
export const types = {
  SET_PULL_REQUESTS: 'PULLREQUESTSUSER/SET_PULL_REQUESTS',
  FETCH_PULL_REQUESTS: 'PULLREQUESTS/FETCH_PULL_REQUESTS',

  FETCH_USER_PULL_REQUESTS: 'PULLREQUESTS/FETCH_USER_PULL_REQUESTS',
  FETCH_USER_ASSIGNED_PULL_REQUESTS: 'PULLREQUESTS/FETCH_USER_ASSIGNED_PULL_REQUESTS',
  FETCH_USER_WATCHING_PULL_REQUESTS: 'PULLREQUESTS/FETCH_USER_WATCHING_PULL_REQUESTS',
}


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

/**
 * Initial state
 */
const initialState = {
  error: null,
  isFetching: false,
  entities: {},
  pagination: {
    total: 0,
    pages: {},
    pageSize: 0,
    currentPage: 0,
  },
}

export type PullRequestDictionary = {
  [id: string]: Object
}

export type PullRequestsStateType = {
  error: ?string,
  isFetching: boolean,
  entities: PullRequestDictionary,
}

export const entitiesReducer = combineReducers({
  entities,
  error,
  isFetching,
  pagination,
})

/**
 * Pullrequests reducer
 */
export default (
  state: PullRequestsStateType = initialState, action: Object): PullRequestsStateType => {
  switch (action.type) {
    case types.SET_PULL_REQUESTS:
      return entitiesReducer(state, setEntities(action.nodes))
    case types.FETCH_PULL_REQUESTS:
      return entitiesReducer(state, requestPage(action))
    case types.FETCH_USER_ASSIGNED_PULL_REQUESTS:
    case types.FETCH_USER_PULL_REQUESTS:
    case types.FETCH_USER_WATCHING_PULL_REQUESTS:
    default:
      return entitiesReducer(state, action)
  }
}

/**
 * Actions
 */
export const actions = {
  sendingRequest: (sending: boolean) => ({ type: entitiesTypes.SENDING_REQUEST, sending }),
  requestError: (error: string) => ({ type: entitiesTypes.REQUEST_ERROR, error }),
  clearError: () => ({ type: entitiesTypes.CLEAR_ERROR }),
  setPullRequests:
    (page: number, nodes:
      Array<PullRequestGraphType>) => ({ type: types.SET_PULL_REQUESTS, page, nodes }),
  fetchUserPullRequests:
    (page: number, pageSize: number) => ({ type: types.FETCH_USER_PULL_REQUESTS, page, pageSize }),
  fetchUserAssignedPullRequests:
    (page: number, pageSize: number) => ({ type: types.FETCH_USER_ASSIGNED_PULL_REQUESTS, page, pageSize }),
  fatchUserWatchingPullRequests:
    (page: number, pageSize: number) => ({ type: types.FETCH_USER_WATCHING_PULL_REQUESTS, page, pageSize }),
}
