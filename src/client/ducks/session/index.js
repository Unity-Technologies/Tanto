/* @flow */

import { pagination, receivePage } from 'ducks/pagination'
import { orderBy, DIRECTION } from 'ducks/order'
import { combineReducers } from 'redux'
import _ from 'lodash'
import { target } from 'ducks/filters'
import { PullRequestSource, DEVELOPER_PERSONA, PullRequestOrderFields } from 'universal/constants'
import { types } from 'ducks/session/actions'
import { createReducer } from '../createReducer'

/**
 * Initial state
 */
const prState = {
  orderBy: {
    direction: DIRECTION.ASC,
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

// export const sessionEntities = combineReducers({
//   pagination,
//   orderBy,
//   filters,
// })

export const pullRequestsAssigned = createReducer('pullRequestsAssigned', combineReducers({
  filters,
  orderBy,
  pagination,
}), prState)

export const pullRequestsOwned = createReducer('pullRequestsOwned', combineReducers({
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
