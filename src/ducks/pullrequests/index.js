// TODO: add flow annotations

import { PullRequestGraphType } from 'services/ono/queries/pullrequests'
import { entitiesReducer, entitiesPageReducer, requestPage, receivePage } from 'ducks/pagination'

/**
 * Action types
 */
export const types = {
  SENDING_REQUEST: 'PULLREQUESTS/SENDING_REQUEST',
  REQUEST_ERROR: 'PULLREQUESTS/REQUEST_ERROR',
  CLEAR_ERROR: 'PULLREQUESTS/CLEAR_ERROR',

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
  byId: {},
  allIds: [],
}

export type PullRequestDictionary = {
  [id: string]: Object
}

export type PullRequestsStateType = {
  error: ?string,
  isFetching: boolean,
  byId: PullRequestDictionary,
  allIds: Array<string>,
}

/**
 * Pullrequests reducer
 */
export default (
  state: PullRequestsStateType = initialState, action: Object): PullRequestsStateType => {
  switch (action.type) {
    case types.SET_PULL_REQUESTS:
      return entitiesReducer(state, receivePage(action))
    case types.FETCH_PULL_REQUESTS:
      return entitiesPageReducer(state, requestPage(action))
    case types.FETCH_USER_ASSIGNED_PULL_REQUESTS:
    case types.FETCH_USER_PULL_REQUESTS:
    case types.FETCH_USER_WATCHING_PULL_REQUESTS:
      return entitiesReducer(state, requestPage(action))
    case types.SENDING_REQUEST:
      return {
        ...state,
        isFetching: action.sending,
      }
    case types.REQUEST_ERROR:
      return {
        ...state,
        error: action.error,
      }
    case types.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      }
    default:
      return state
  }
}

/**
 * Actions
 */
export const actions = {
  sendingRequest: (sending: boolean) => ({ type: types.SENDING_REQUEST, sending }),
  requestError: (error: string) => ({ type: types.REQUEST_ERROR, error }),
  clearError: () => ({ type: types.CLEAR_ERROR }),
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
