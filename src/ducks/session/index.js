/* @flow */

import { pagination, receivePage } from 'ducks/pagination'
import { orderBy, DIRECTION } from 'ducks/order'
import { combineReducers } from 'redux'
import _ from 'lodash'

/**
 * Action types
 */
export const types = {
  FETCH_USER_PROFILE: 'SESSION/FETCH_USER_PROFILE',
  SET_USER_PROFILE: 'SESSION/SET_USER_PROFILE',
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

const prState = {
  orderBy: {
    direction: DIRECTION.ASC,
    field: '',
  },
  filters: {
    branch: '',
    repo: '',
  },
  pagination: {
    total: 0,
    pages: {},
    pageSize: 0,
    currentPage: 0,
  },
}

const initialState = {
  pullRequestsAssigned: _.cloneDeep(prState),
  pullRequestsOwned: _.cloneDeep(prState),
  pullRequestsWatching: _.cloneDeep(prState),
  profile: {
    username: null,
    email: null,
    fullName: null,
  },
}

export const repo = (state: string = '', action: Object = {}): string =>
  (action.payload && action.payload.repo ? action.payload.repo : state)

export const branch = (state: string = '', action: Object = {}): string =>
  (action.payload && action.payload.branch ? action.payload.branch : state)

export const filters = combineReducers({
  branch,
  repo,
})

export const sessionEntities = combineReducers({
  pagination,
  orderBy,
  filters,
})

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
        pullRequestsOwned: sessionEntities(state.pullRequestsOwned, receivePage(action)),
      }
    case types.SET_PULL_REQUESTS_ASSIGNED:
      return {
        ...state,
        pullRequestsAssigned: sessionEntities(state.pullRequestsAssigned, receivePage(action)),
      }
    case types.SET_PULL_REQUESTS_WATCHING:
      return {
        ...state,
        pullRequestsWatching: sessionEntities(state.pullRequestsWatching, receivePage(action)),
      }
    default:
      return state
  }
}


/**
 * Actions
 */
export const actions = {
  fetchProfile: (): Object => ({ type: types.FETCH_USER_PROFILE }),
  setProfile: (profile: Object): Object => ({ type: types.SET_USER_PROFILE, profile }),
  setPersona: (persona: string): Object => ({ type: types.SET_USER_PERSONA, persona }),
  setPullRequestsOwned:
  (page: number, nodes: Array<Object>, total: number, pageSize: number, repoId: string, branchName: string): Object =>
    ({ type: types.SET_PULL_REQUESTS_OWNED, page, nodes, total, pageSize, repo: repoId, branch: branchName }),
  setPullRequestsAssigned:
  (page: number, nodes: Array<Object>, total: number, pageSize: number, repoId: string, branchName: string): Object =>
    ({ type: types.SET_PULL_REQUESTS_ASSIGNED, page, nodes, total, pageSize, repo: repoId, branch: branchName }),
  setPullRequestsWatching:
  (page: number, nodes: Array<Object>, total: number, pageSize: number, repoId: string, branchName: string): Object =>
    ({ type: types.SET_PULL_REQUESTS_WATCHING, page, nodes, total, pageSize, repo: repoId, branch: branchName }),
}
