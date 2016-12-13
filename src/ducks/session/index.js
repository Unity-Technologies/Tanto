/* @flow */

import { pagination, receivePage } from 'ducks/pagination'

/**
 * Action types
 */
export const types = {
  SENDING_REQUEST: 'SESSION/SENDING_REQUEST',
  REQUEST_ERROR: 'SESSION/REQUEST_ERROR',
  FETCH_USER_PROFILE: 'SESSION/FETCH_USER_PROFILE',
  SET_USER_PROFILE: 'SESSION/SET_USER_PROFILE',
  CLEAR_ERROR: 'SESSION/CLEAR_ERROR',
  SET_USER_PERSONA: 'SESSION/SET_USER_PERSONA',
  SET_PULL_REQUESTS_OWNED: 'SESSION/SET_PULL_REQUESTS_OWNED',
  SET_PULL_REQUESTS_ASSIGNED: 'SESSION/SET_PULL_REQUESTS_ASSIGNED',
  SET_PULL_REQUESTS_WATCHING: 'SESSION/SET_PULL_REQUESTS_WATCHING',
}

/**
 * Available user personas (for testing purposes only !!!)
 */
export const USER_PERSONA = 'USER_PERSONA'
export const DEVELOPER_PERSONA = 'DEVELOPER_PERSONA'
export const MANAGER_PERSONA = 'MANAGER_PERSONA'
export const GUARDIAN_PERSONA = 'GUARDIAN_PERSONA'

/**
 * Initial state
 */
const initialState = {
  error: null,
  isFetching: false,
  persona: DEVELOPER_PERSONA,
  pullRequestsAssigned: {
    total: 0,
    pages: {},
    pageSize: 0,
    currentPage: 0,
  },
  pullRequestsOwned: {
    total: 0,
    pages: {},
    pageSize: 0,
    currentPage: 0,
  },
  pullRequestsWatching: {
    total: 0,
    pages: {},
    pageSize: 0,
    currentPage: 0,
  },
  profile: {
    username: null,
    email: null,
    fullName: null,
  },
}

/**
 * Current user reducer
 */
export default (state: Object = initialState, action: Object): Object => {
  switch (action.type) {
    case types.SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile,
      }
    case types.SET_USER_PERSONA:
      return {
        ...state,
        persona: action.persona,
      }
    case types.SET_PULL_REQUESTS_OWNED:
      return {
        ...state,
        pullRequestsOwned: pagination(state, receivePage(action)),
      }
    case types.SET_PULL_REQUESTS_ASSIGNED:
      return {
        ...state,
        pullRequestsAssigned: pagination(state, receivePage(action)),
      }
    case types.SET_PULL_REQUESTS_WATCHING:
      return {
        ...state,
        pullRequestsWatching: pagination(state, receivePage(action)),
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
  fetchProfile: (): Object => ({ type: types.FETCH_USER_PROFILE }),
  setProfile: (profile: Object): Object => ({ type: types.SET_USER_PROFILE, profile }),
  setPersona: (persona: string): Object => ({ type: types.SET_USER_PERSONA, persona }),
  setPullRequestsOwned:
    (page: number, nodes: Array<Object>, total: number, pageSize: number): Object =>
      ({ type: types.SET_PULL_REQUESTS_OWNED, page, nodes, total, pageSize }),
  setPullRequestsAssigned:
    (page: number, nodes: Array<Object>, total: number, pageSize: number): Object =>
      ({ type: types.SET_PULL_REQUESTS_ASSIGNED, page, nodes, total, pageSize }),
  setPullRequestsWatching:
    (page: number, nodes: Array<Object>, total: number, pageSize: number): Object =>
      ({ type: types.SET_PULL_REQUESTS_WATCHING, page, nodes, total, pageSize }),
}
