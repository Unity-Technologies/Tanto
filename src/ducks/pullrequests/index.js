// TODO: add flow annotations

/* eslint-disable */

import _ from 'lodash'
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
      return _.merge({}, state, action.pullrequests);
    }
    return state;
  }
}

/**
 * Pull request `allIds` state reducer
 */
const ids = (state = [], action) => {
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
export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_PULL_REQUESTS:
      return {
        ...state,
        byId: entities(state.byId, { pullrequests: reduceArrayToObj(action.pullrequests) }),
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
  sendingRequest: sending => ({ type: types.SENDING_REQUEST, sending }),
  requestError: error => ({ type: types.REQUEST_ERROR, error }),
  clearError: () => ({ type: types.CLEAR_ERROR }),
  setPullRequests: pullrequests => ({ type: types.SET_PULL_REQUESTS, pullrequests }),
  fetchUserPullRequests: () => ({ type: types.FETCH_USER_PULL_REQUESTS }),
  fetchUserAssignedPullRequests: () => ({ type: types.FETCH_USER_ASSIGNED_PULL_REQUESTS }),
  fatchUserWatchingPullRequests: () => ({ type: types.FETCH_USER_WATCHING_PULL_REQUESTS }),
}
