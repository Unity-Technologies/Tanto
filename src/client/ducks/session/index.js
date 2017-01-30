/* @flow */

import { pagination, receivePage } from 'ducks/pagination'
import { orderBy, DIRECTION } from 'ducks/order'
import { combineReducers } from 'redux'
import _ from 'lodash'
import { target } from 'ducks/filters'
import { PullRequestSource, DEVELOPER_PERSONA } from 'universal/constants'
import { types } from 'ducks/session/actions'


/**
 * Initial state
 */

const prState = {
  orderBy: {
    direction: DIRECTION.ASC,
    field: '',
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
  pullRequestsAssigned: _.cloneDeep(prState),
  pullRequestsOwned: _.cloneDeep(prState),
  pullRequestsWatching: _.cloneDeep(prState),
  profile: {
    username: null,
    email: null,
    fullName: null,
  },
  persona: DEVELOPER_PERSONA,
}

export const repo = (state: string = '', action: Object = {}): string =>
  (action.repo ? action.repo : state)

export const filters = combineReducers({
  target,
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
