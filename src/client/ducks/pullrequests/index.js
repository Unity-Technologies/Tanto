/* @flow */

import {
  projectPullRequestsQuery,
  parsePullRequests,
  queries,
  parsers,
  PullRequestSource,
} from 'services/ono/queries/pullrequests'
import { entities, actions as entitiesActions } from 'ducks/entities'
import PULL_REQUEST_QUERY, { pullRequestQuery } from 'services/ono/queries/pullRequest'
import { target } from 'ducks/filters'

import { pagination, receivePage } from 'ducks/pagination'
import { orderBy, DIRECTION } from 'ducks/order'
import type { PaginationType } from 'ducks/pagination'
import { combineReducers } from 'redux'
import type { OrderByType } from 'ducks/order'
import { fetchActionCreator } from 'ducks/fetch'
import { types as sessionTypes } from 'ducks/session'

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
    target: {
      name: '',
      type: PullRequestSource.BRANCH,
    },
  },
}

export type PullRequestDictionary = {
  [id: string]: Object
}

export type PullRequestsStateType = {
  entities: PullRequestDictionary,
  pagination: PaginationType,
  orderBy: OrderByType,
  filters: Object
}

export const filters = combineReducers({
  target,
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
      return {
        ...state,
        entities: entities(state.entities, entitiesActions.setEntity(action.node)),
      }

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
  target: PullRequestSourceReference,
  repo: string,
  orderBy: OrderByType,
}

export const FiltersFields = ['updated']

export const fetchPullRequest = (id: number): Object =>
  fetchActionCreator(types.FETCH_PULL_REQUEST, PULL_REQUEST_QUERY, { id },
    (data: Object, cbArgs: Object): Array<Object> => {
      const node = pullRequestQuery(data)
      return [{ type: types.SET_PULL_REQUEST, node }]
    })

export const fetchPullRequests = (args: FetchPullRequestArgs): Object =>
  fetchActionCreator(types.FETCH_PULL_REQUESTS, projectPullRequestsQuery, args,
  (data: Object, cbArgs: Object): Array<Object> => {
    const { nodes, total } = parsePullRequests(data)
    return [
      { type: types.SET_PULL_REQUESTS, nodes },
      { type: types.SET_PULL_REQUESTS_PAGE, nodes, total, ...cbArgs }]
  })

export const fetchUserPullRequests = (args: FetchPullRequestArgs): Object =>
  fetchActionCreator(types.FETCH_USER_PULL_REQUESTS, queries.USER_PULL_REQUESTS, args,
    (data: Object, cbArgs: Object): Array<Object> => {
      const { nodes, total } = parsers.parseCurrentUserPullRequests(data)
      return [
        { type: types.SET_PULL_REQUESTS, nodes },
        { type: sessionTypes.SET_PULL_REQUESTS_OWNED, nodes, total, ...cbArgs },
      ]
    })

export const fetchUserAssignedPullRequests = (args: FetchPullRequestArgs): Object =>
  fetchActionCreator(
    types.FETCH_USER_ASSIGNED_PULL_REQUESTS, queries.USER_ASSIGNED_PULL_REQUESTS, args,
    (data: Object, cbArgs: Object): Array<Object> => {
      const { nodes, total } = parsers.parseCurrentUserAssignedPullRequests(data)
      return [
        { type: types.SET_PULL_REQUESTS, nodes },
        { type: sessionTypes.SET_PULL_REQUESTS_ASSIGNED, nodes, total, ...cbArgs },
      ]
    })

