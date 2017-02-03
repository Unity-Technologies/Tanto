/* @flow */

import { PullRequestSource, PullRequestOrderFields } from 'universal/constants'
import { target } from 'ducks/filters'
import { pagination } from 'ducks/pagination'
import { orderBy, DIRECTION } from 'ducks/order'
import { combineReducers } from 'redux'
import type { OrderByType } from 'ducks/order'
import { createReducer } from '../createReducer'
import { operationName } from './actions'

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


export const pullRequests = createReducer(operationName, combineReducers({
  filters,
  orderBy,
  pagination,
}), defaultValue)

