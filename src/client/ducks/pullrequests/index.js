/* @flow */

import { PullRequestSource, PullRequestOrderFields } from 'universal/constants'
import { target } from 'ducks/filters'
import { pagination } from 'ducks/pagination'
import { orderBy, DIRECTION } from 'ducks/order'
import { combineReducers } from 'redux'
import type { OrderByType } from 'ducks/order'
import { createReducer } from '../createReducer'
import { operationName } from './actions'
import { RECEIVE_PAGE } from 'ducks/pagination'

export const operationNames = {
  pullRequestsOwned: 'pullRequestsOwned',
  pullRequestsAssigned: 'pullRequestsAssigned',
  pullRequests: 'pullRequests',
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
  orderBy: OrderByType,
  filters: Object
}

export const filters = combineReducers({
  target,
})

export const repositoryPullRequests = combineReducers({
  filters,
  orderBy,
  pagination,
})

export const pullRequests = (state: Object = { }, action: Object = {}): Object => {
  switch (action.type) {
    case RECEIVE_PAGE:
      if (action.repo) {
        return {
          ...state,
          [action.repo]: repositoryPullRequests(state[action.repo] || defaultValue, action),
        }
      }
      return state
    default:
      return state
  }
}

export default createReducer(operationName, pullRequests, {})

