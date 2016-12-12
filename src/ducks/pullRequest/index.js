/* @flow */
import { GraphQlError, HttpStatusError } from 'universal/requests'

import type { PullRequestGraphType } from 'services/ono/queries/pullRequest'
export type { PullRequestGraphType } from 'services/ono/queries/pullRequest'
export type { File } from 'services/ono/queries/pullRequest'

export const types = {
  FETCH_START: 'PULLREQUEST/FETCH_START',
  FETCH_STATUS: 'PULLREQUEST/FETCH_STATUS',
  FETCH_ERROR: 'PULLREQUEST/FETCH_ERROR',
  FETCH_DONE: 'PULLREQUEST/FETCH_DONE',
}

const initialState = {
  error: null,
  isFetching: false,
  pullRequest: null,
}

export type PullRequestStateType = {
  error: ?string,
  isFetching: boolean,
  pullRequest: ?PullRequestGraphType,
}

export type PullRequestActionType =
    { type: 'PULLREQUEST/FETCH_START' }
  | { type: 'PULLREQUEST/FETCH_STATUS', isFetching: boolean }
  | { type: 'PULLREQUEST/FETCH_ERROR', error: string }
  | { type: 'PULLREQUEST/FETCH_DONE', pullRequest: PullRequestGraphType }

export default (
  state: PullRequestStateType = initialState, action: PullRequestActionType
) => {
  switch (action.type) {
    case types.FETCH_STATUS:
      return {
        ...state,
        isFetching: action.isFetching,
      }
    case types.FETCH_ERROR: {
      let error = action.error
      if (error instanceof HttpStatusError) {
        error = `${error.message} (${error.status})`
      } else if (error instanceof GraphQlError) {
        error = `${error.message}`
      }
      return {
        ...state,
        error,
      }
    }
    case types.FETCH_DONE:
      return {
        ...state,
        error: null,
        pullRequest: action.pullRequest,
      }
    default:
      return state
  }
}

export const actions = {
  fetchStart: (id: number) => ({ type: types.FETCH_START, id }),
  fetchStatus: (isFetching: boolean) => ({ type: types.FETCH_STATUS, isFetching }),
  fetchError: (error: string) => ({ type: types.FETCH_ERROR, error }),
  fetchDone: (pullRequest: PullRequestGraphType) => ({ type: types.FETCH_DONE, pullRequest }),
}
