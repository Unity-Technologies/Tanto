/* @flow */

import { PullRequestSource, PullRequestOrderFields } from 'universal/constants'
import { entities, actions as entitiesActions } from 'ducks/entities'
import { target } from 'ducks/filters'
import { pagination } from 'ducks/pagination'
import { orderBy, DIRECTION } from 'ducks/order'
import { combineReducers } from 'redux'
import type { OrderByType } from 'ducks/order'
import { createReducer } from '../createReducer'
import { types, namespace } from './actions'

export const operationNames = {
  pullRequestsOwned: 'pullRequestsOwned',
  pullRequestsAssigned: 'pullRequestsAssigned',
  pullRequests: 'pullRequests',
}

/**
 * Initial state
 */
const initialState = {
  entities: {},
  // pagination: {
  //   total: 0,
  //   pages: {},
  //   pageSize: 0,
  //   currentPage: 0,
  // },
  // orderBy: {
  //   direction: DIRECTION.ASC,
  //   field: PullRequestOrderFields.UPDATED,
  // },
  // filters: {
  //   target: {
  //     name: '',
  //     type: PullRequestSource.BRANCH,
  //   },
  // },
}

const defaultValue = {
  pagination: {
    total: 0,
    pages: {},
    pageSize: 0,
    currentPage: 0,
  },
  orderBy: {
    direction: DIRECTION.ASC,
    field: PullRequestOrderFields.UPDATED,
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
  // pagination: PaginationType,
  orderBy: OrderByType,
  filters: Object
}

export const filters = combineReducers({
  target,
})


export const pullRequests = createReducer(namespace, combineReducers({
  filters,
  orderBy,
  pagination,
}), defaultValue)


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
    // case types.SET_PULL_REQUESTS_PAGE:
    //   return {
    //     ...state,
    //     pagination: pagination(state.pagination, receivePage(action)),
    //     orderBy: orderBy(state.orderBy, action),
    //     filters: filters(state.filters, action),
    //   }
    case types.SET_PULL_REQUEST:
      return {
        ...state,
        entities: entities(state.entities, entitiesActions.setEntity(action.node)),
      }

    default:
      return state
  }
}

