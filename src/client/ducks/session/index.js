/* @flow */

import { pagination, receivePage } from 'ducks/pagination'
import { orderBy, DIRECTION } from 'ducks/order'
import { combineReducers } from 'redux'
import USER_PROFILE_QUERY from 'services/ono/queries/users'
import _ from 'lodash'
import { fetchActionCreator } from 'ducks/fetch'

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
  (action.repo ? action.repo : state)

export const branch = (state: string = '', action: Object = {}): string =>
  (action.branch ? action.branch : state)

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
    default:
      return state
  }
}


export const fetchProfile = (): Object =>
  fetchActionCreator(types.FETCH_USER_PROFILE, USER_PROFILE_QUERY, { },
    (data: Object, cbArgs: Object): Array<Object> =>
      [{ type: types.SET_USER_PROFILE, profile: data.data.me }])

export const setProfile = (profile: Object): Object => ({ type: types.SET_USER_PROFILE, profile })

export const setPersona = (persona: string): Object => ({ type: types.SET_USER_PERSONA, persona })

/**
 * Actions
 */
export const actions = {
  fetchProfile,
  setProfile,
  setPersona,
}
