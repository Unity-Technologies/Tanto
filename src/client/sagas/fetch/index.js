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

type ActionType = {
  name: string,
  query: string,
  args: Object,
  operationName: string,
  callback: Function
}

export function* fetchAnythingSaga(action: ActionType): Generator<any, any, any> {
  try {
    yield put(actions.clearError(action.name))
    yield put(actions.sendingRequest(action.name, true))
    const response = yield call(get, action.query, action.args, action.operationName)
    if (action.callback) {
      const callbacks = action.callback(response, action.args)
      while (callbacks.length) {
        const next = callbacks.splice(0, 1)
        yield put(next[0])
      }
    }
  } catch (error) {
    yield put(actions.requestError(action.name, error))
  } finally {
    yield put(actions.sendingRequest(action.name, false))
  }
  return null
}

export default fetchSaga
