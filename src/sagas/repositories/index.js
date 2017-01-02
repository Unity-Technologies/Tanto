/* @flow */
/* eslint-disable import/no-extraneous-dependencies */

import { put, call } from 'redux-saga/effects'
import { setRepositoriesNames } from 'ducks/repositories'
import fetchSaga from 'sagas/fetch'
import {
  ALL_REPOSITORIES_QUERY,
  parseAllRepositoriesNames,
} from 'services/ono/queries/repositories'

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export function* searchRepository(action: Object): Generator<any, any, any> {
  yield call(delay, 300)
  const response = yield call(
    fetchSaga, action.type, ALL_REPOSITORIES_QUERY, { first: action.first, filter: action.filter })
  const names = parseAllRepositoriesNames(response)
  yield put(setRepositoriesNames(names))
}

