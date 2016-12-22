/* @flow */

import { PullRequestGraphType } from 'services/ono/queries/pullrequests'
import { entities, actions as entitiesActions } from 'ducks/entities'
import { pagination, requestPage } from 'ducks/pagination'
import type { PaginationType } from 'ducks/pagination'
import { combineReducers } from 'redux'

/**
 * Action types
 */
export const types = {
  SET_PULL_REQUESTS: 'PULLREQUESTSUSER/SET_PULL_REQUESTS',
  SET_PULL_REQUEST: 'PULLREQUESTSUSER/SET_PULL_REQUEST',
  FETCH_PULL_REQUEST: 'PULLREQUESTS/FETCH_PULL_REQUEST',
  FETCH_PULL_REQUESTS: 'PULLREQUESTS/FETCH_PULL_REQUESTS',
  FETCH_USER_PULL_REQUESTS: 'PULLREQUESTS/FETCH_USER_PULL_REQUESTS',
  FETCH_USER_ASSIGNED_PULL_REQUESTS: 'PULLREQUESTS/FETCH_USER_ASSIGNED_PULL_REQUESTS',
  FETCH_USER_WATCHING_PULL_REQUESTS: 'PULLREQUESTS/FETCH_USER_WATCHING_PULL_REQUESTS',
}

/**
 * Initial state
 */
const initialState = {
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
  entities: PullRequestDictionary,
  pagination: PaginationType,
}

export const entitiesReducer = combineReducers({
  entities,
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
    case types.SET_PULL_REQUEST:
      return entitiesReducer(state, entitiesActions.setEntity(action.node))
    case types.FETCH_PULL_REQUESTS:
      return entitiesReducer(state, requestPage(action))
    default:
      return entitiesReducer(state, action)
  }
}

/**
 * Actions
 */

export const setPullRequests = (page: number, nodes: Array<PullRequestGraphType>): Object =>
  ({ type: types.SET_PULL_REQUESTS, page, nodes })

export const setPullRequest = (node: PullRequestGraphType): Object =>
  ({ type: types.SET_PULL_REQUEST, node })

export const fetchPullRequests = (page: number, pageSize: number): Object =>
 ({ type: types.FETCH_PULL_REQUESTS, page, pageSize })

export const fetchPullRequest = (id: number): Object => ({ type: types.FETCH_PULL_REQUEST, id })

export const fetchUserPullRequests = (page: number, pageSize: number): Object =>
  ({ type: types.FETCH_USER_PULL_REQUESTS, page, pageSize })

export const fetchUserAssignedPullRequests = (page: number, pageSize: number): Object =>
  ({ type: types.FETCH_USER_ASSIGNED_PULL_REQUESTS, page, pageSize })

export const fatchUserWatchingPullRequests = (page: number, pageSize: number): Object =>
  ({ type: types.FETCH_USER_WATCHING_PULL_REQUESTS, page, pageSize })

