// TODO: add flow annotations

import _ from 'lodash'
import { helpers } from 'routes/helpers'
import { reduceArrayToObj } from 'ducks/normalizer'

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

export const computePullRequestBuilds = (pullrequest: Object): Object => (
  { ...pullrequest,
    buildStatus: 'success',
    buildName: 'ABV-2333',
    buildDate: '3 hours ago',
    buildLink: '#',
  }
)

export const computePullRequestLink = (pullrequest: Object, fn: any): Object => (
  { ...pullrequest, link: fn(pullrequest.originRepository.name, pullrequest.id) }
)

export const computePullRequestOriginLink = (pullrequest: Object, fn: any): Object => (
  { ...pullrequest,
    originLink: fn(pullrequest.originRepository.name, pullrequest.originBranch || ''),
  }
)

export const computePullRequestTargetLink = (pullrequest: Object, fn: any): Object => (
  { ...pullrequest, destLink: fn(pullrequest.destRepository.name, pullrequest.destBranch || '') }
)

export const flattenPullRequestUsername = (pullrequest: Object): Object => (
  { ...pullrequest, username: pullrequest.owner.username }
)

export const computePullRequest = (pullrequest: Object): any => (
  fn1 => (
    fn2 => (
        computePullRequestBuilds(
          flattenPullRequestUsername(
            flattenPullRequestUsername(
              computePullRequestTargetLink(
                computePullRequestOriginLink(
                  computePullRequestLink(pullrequest, fn2), fn1), fn1))))
    )
  )
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

/**
 * Pull request `byId` state reducer
 */
const entities = (state = {}, action) => {
  switch (action.type) {
    // case 'UPDATE_PULLREQUEST':
    //   return {
    //     ...state,
    //     [action.id]: {
    //       ...action.pullrequests
    //     }
    //   }
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
export default (state: Object = initialState, action: Object): Object => {
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
  sendingRequest: (sending: boolean): Object => ({ type: types.SENDING_REQUEST, sending }),
  requestError: (error: string): Object => ({ type: types.REQUEST_ERROR, error }),
  clearError: (): Object => ({ type: types.CLEAR_ERROR }),
  setPullRequests:
  (pullrequests: Array<Object>): Object => ({ type: types.SET_PULL_REQUESTS, pullrequests }),
  fetchUserPullRequests: (): Object => ({ type: types.FETCH_USER_PULL_REQUESTS }),
  fetchUserAssignedPullRequests: (): Object => ({ type: types.FETCH_USER_ASSIGNED_PULL_REQUESTS }),
  fatchUserWatchingPullRequests: (): Object => ({ type: types.FETCH_USER_WATCHING_PULL_REQUESTS }),
}
