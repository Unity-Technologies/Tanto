/* @flow */

import { PullRequestGraphType } from 'services/ono/queries/pullrequests'
import { isFetching, error, entities, actions as entitiesActions } from 'ducks/entities'

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
      return entitiesReducer(state, entitiesActions.setEntities(action.nodes))
    case types.FETCH_PULL_REQUESTS:
      return entitiesReducer(state, requestPage(action))
    default:
      return entitiesReducer(state, action)
  }
}

/**
 * Actions
 */
export const actions = {
  setPullRequests:
    (page: number, nodes:
      Array<PullRequestGraphType>) => ({ type: types.SET_PULL_REQUESTS, page, nodes }),
  fetchPullRequests:
    (page: number, pageSize: number) => ({ type: types.FETCH_PULL_REQUESTS, page, pageSize }),
  fetchUserPullRequests:
    (page: number, pageSize: number) => ({ type: types.FETCH_USER_PULL_REQUESTS, page, pageSize }),
  fetchUserAssignedPullRequests:
    (page: number, pageSize: number): Object =>
      ({ type: types.FETCH_USER_ASSIGNED_PULL_REQUESTS, page, pageSize }),
  fatchUserWatchingPullRequests:
    (page: number, pageSize: number): Object =>
      ({ type: types.FETCH_USER_WATCHING_PULL_REQUESTS, page, pageSize }),
}
