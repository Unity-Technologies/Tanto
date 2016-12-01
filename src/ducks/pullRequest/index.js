/* @flow */
import type { PullRequestGraphType } from 'services/ono/queries/pullRequest'
export type { PullRequestGraphType } from 'services/ono/queries/pullRequest'

export const types = {
  FETCH_START: 'PULLREQUEST/FETCH_START',
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
  | { type: 'PULLREQUEST/FETCH_ERROR', error: string }
  | { type: 'PULLREQUEST/FETCH_DONE', pullRequest: PullRequestGraphType }

export default (
  state: PullRequestStateType = initialState, action: PullRequestActionType
) => {
  switch (action.type) {
    case types.FETCH_START:
      return {
        error: null,
        isFetching: true,
        pullRequest: null,
      }
    case types.FETCH_ERROR:
      return {
        error: action.error,
        isFetching: false,
        pullRequest: null,
      }
    case types.FETCH_DONE:
      return {
        error: null,
        isFetching: false,
        pullRequest: action.pullRequest,
      }
    default:
      return state
  }
}

export const actions = {
  fetchStart: (id: number) => ({ type: types.FETCH_START, id }),
  fetchError: (error: string) => ({ type: types.FETCH_ERROR, error }),
  fetchDone: (pullRequest: PullRequestGraphType) => ({ type: types.FETCH_DONE, pullRequest }),
}
