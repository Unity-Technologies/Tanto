/* @flow */

import { pagination } from 'ducks/pagination'
import { orderBy, DIRECTION } from 'ducks/order'
import { combineReducers } from 'redux'
import { target } from 'ducks/filters'
import { PullRequestSource, DEVELOPER_PERSONA, PullRequestOrderFields } from 'universal/constants'
import { types, operationNames } from 'ducks/session/actions'
import { createReducer } from '../createReducer'

/**
 * Initial state
 */
const prState = {
  orderBy: {
    direction: DIRECTION.DESC,
    field: PullRequestOrderFields.UPDATED,
  },
  filters: {
    target: {
      name: '',
      type: PullRequestSource.BRANCH,
    },
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
  persona: DEVELOPER_PERSONA,
}

export const repo = (state: string = '', action: Object = {}): string =>
  (action.repo ? action.repo : state)

export const filters = combineReducers({
  target,
  repo,
})

export const pullRequestsAssigned =
  createReducer(operationNames.pullRequestsAssigned, combineReducers({
    filters,
    orderBy,
    pagination,
  }), prState)

export const pullRequestsOwned = createReducer(operationNames.pullRequestsOwned, combineReducers({
  filters,
  orderBy,
  pagination,
}), prState)


/**
 * Current user reducer
 */
export const profile = (state: Object = initialState, action: Object): Object => {
  switch (action.type) {
    case types.SET_USER_PERSONA:
      return {
        ...state,
        persona: action.persona,
      }
    default:
      return state
  }
}
