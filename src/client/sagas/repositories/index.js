/* @flow */

import { call } from 'redux-saga/effects'
// import { setRepositoriesNames, parseAllRepositoriesNames } from 'ducks/repositories/actions'
import fetchSaga, { normalizeSaga } from 'sagas/fetch'

import query from 'ducks/repositories/queries/search.graphql'
export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export function* searchRepository(action: Object): Generator<any, any, any> {
  yield call(delay, 300)
  const response = yield call(
    fetchSaga, action.type, query, { limit: action.limit, filter: action.filter })

  yield call(normalizeSaga, response.data || response)
}

