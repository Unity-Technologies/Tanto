// TODO: add flow annotations

import _ from 'lodash'
import { helpers } from 'routes/helpers'
import { reduceArrayToObj } from 'ducks/normalizer'
import { PullRequestGraphType } from 'services/ono/queries/pullrequests'

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
 * Pull request `byId` state reducer
 */
const entities = (state = {}, action) => {
  switch (action.type) {
    default:
      if (action.pullrequests) {
        return _.merge({}, state, action.pullrequests)
      }
      return state
  }
}

/**
 * Pull request `allIds` state reducer
 */
const ids = (state: Array<string> = [], action: Object) => {
  switch (action.type) {
    default:
      if (action.ids) {
        return state.concat(action.ids)
      }
      return state
  }
}

/**
 * Pullrequests reducer
 */
export default (
  state: PullRequestsStateType = initialState, action: Object): PullRequestsStateType => {
  switch (action.type) {
    case types.SET_PULL_REQUESTS:
      return {
        ...state,
        byId:
          entities(state.byId, { pullrequests: reduceArrayToObj(action.pullrequests
            .map(x =>
              computePullRequest(x)(helpers.buildPullRequestLink)(helpers.buildProjectLink))) }),
        allIds: ids(state.allIds, { ids: action.pullrequests.map(x => x.id) }),
      }
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
    (pullrequests:
      Array<PullRequestGraphType>) => ({ type: types.SET_PULL_REQUESTS, pullrequests }),
  fetchUserPullRequests:
    (first, offset) => ({ type: types.FETCH_USER_PULL_REQUESTS, first, offset }),
  fetchUserAssignedPullRequests:
    (first, offset) => ({ type: types.FETCH_USER_ASSIGNED_PULL_REQUESTS, first, offset }),
  fatchUserWatchingPullRequests:
    (first, offset) => ({ type: types.FETCH_USER_WATCHING_PULL_REQUESTS, first, offset }),
}
