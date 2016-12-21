/* @flow */

import { put, call } from 'redux-saga/effects'
import { get } from 'services/ono/api'
import { actions } from 'ducks/fetch'

export function* fetchSaga(
  actionName: string, graphQuery: string, args: any = null): Generator<any, any, any> {
  try {
    yield put(actions.clearError(actionName))
    yield put(actions.sendingRequest(actionName, true))
    return yield call(get, graphQuery, args)
  } catch (error) {
    yield put(actions.requestError(actionName, error))
  } finally {
    yield put(actions.sendingRequest(actionName, false))
  }
  return null
}

export default fetchSaga
