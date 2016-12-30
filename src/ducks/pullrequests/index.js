/* @flow */

import { PullRequestGraphType, projectPullRequestsQuery, parsePullRequests } from 'services/ono/queries/pullrequests'
import { entities, actions as entitiesActions } from 'ducks/entities'
import { pagination, receivePage } from 'ducks/pagination'
import { orderBy, DIRECTION } from 'ducks/order'
import type { PaginationType } from 'ducks/pagination'
import { combineReducers } from 'redux'
import type { OrderByType } from 'ducks/order'
import { fetchActionCreator } from 'ducks/fetch'

/**
 * Action types
 */
export const types = {
  SET_PULL_REQUESTS: 'PULLREQUESTSUSER/SET_PULL_REQUESTS',
  SET_PULL_REQUEST: 'PULLREQUESTSUSER/SET_PULL_REQUEST',
  SET_PULL_REQUESTS_PAGE: 'PULLREQUESTSUSER/SET_PULL_REQUESTS_PAGE',
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
  orderBy: {
    direction: DIRECTION.ASC,
    field: '',
  },
  filters: {
    branch: '',
  },
}

export type PullRequestDictionary = {
  [id: string]: Object
}

export type PullRequestsStateType = {
  entities: PullRequestDictionary,
  pagination: PaginationType,
  orderBy: OrderByType,
}

export const branch = (state: string = '', action: Object = {}): string =>
  (action && action.branch ? action.branch : state)

export const filters = combineReducers({
  branch,
})


/**
 * Pullrequests reducer
 */
export default (
  state: PullRequestsStateType = initialState, action: Object): PullRequestsStateType => {
  switch (action.type) {
    case types.SET_PULL_REQUESTS:
      return {
        ...state,
        entities: entities(state.entities, entitiesActions.setEntities(action.nodes)),
      }
    case types.SET_PULL_REQUESTS_PAGE:
      return {
        ...state,
        pagination: pagination(state.pagination, receivePage(action)),
        orderBy: orderBy(state.orderBy, action),
        filters: filters(state.filters, action),
      }
    case types.SET_PULL_REQUEST:
      return entities(state, entitiesActions.setEntity(action.node))
    default:
      return state
  }
}

/**
 * Actions
 */
export type FetchPullRequestArgs = {
  page: number,
  pageSize: number,
  branch: string,
  repo: string,
  orderBy: OrderByType,
}

export const FiltersFields = ['updated']

export const setPullRequests = (page: number, nodes: Array<PullRequestGraphType>): Object =>
  ({ type: types.SET_PULL_REQUESTS, page, nodes })

export const combineActions = (data: Object, args: Object): Array<Object> => {
  const { nodes, total } = parsePullRequests(data)
  return [
    { type: types.SET_PULL_REQUESTS, nodes },
    { type: types.SET_PULL_REQUESTS_PAGE, nodes, total, ...args }]
}

export const setPullRequest = (node: PullRequestGraphType): Object =>
  ({ type: types.SET_PULL_REQUEST, node })

export const fetchPullRequest = (id: number): Object => ({ type: types.FETCH_PULL_REQUEST, id })

export const fetchPullRequests = (args: FetchPullRequestArgs): Object =>
  fetchActionCreator(types.FETCH_PULL_REQUESTS, args, projectPullRequestsQuery, combineActions)

export const fetchUserPullRequests =
  (args: FetchPullRequestArgs): Object =>
    ({ type: types.FETCH_USER_PULL_REQUESTS, ...args })

export const fetchUserAssignedPullRequests =
  (args: FetchPullRequestArgs): Object =>
    ({ type: types.FETCH_USER_ASSIGNED_PULL_REQUESTS, ...args })

export const fetchUserWatchingPullRequests =
  (args: FetchPullRequestArgs): Object =>
    ({ type: types.FETCH_USER_WATCHING_PULL_REQUESTS, ...args })
