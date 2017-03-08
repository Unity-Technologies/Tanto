/* @flow */

import { put, call } from 'redux-saga/effects'
import { get } from 'services/ono/api'
import { actions } from 'ducks/fetch'
import type { FetchAction } from 'ducks/fetch'
import { normalize } from 'normalizr'
import schema from 'ducks/schema'
import { types } from 'ducks/entities'

export function* fetchSaga(
  actionName: string, graphQuery: string, variables: any = null): Generator<any, any, any> {
  try {
    yield put(actions.clearError(actionName))
    yield put(actions.sendingRequest(actionName, true))
    return yield call(get, graphQuery, variables)
  } catch (error) {
    yield put(actions.requestError(actionName, error))
  } finally {
    yield put(actions.sendingRequest(actionName, false))
  }
  return null
}

export function* normalizeSaga(data: Object): Generator<any, any, any> {
  if (!data) {
    return
  }

  // HACK: Handle mutation results until we find a more elegant way to deal with it
  const mutations = ['addReviewers']

  let resolvedData = data
  for (let i = 0; i < mutations.length; ++i) {
    const mutation = mutations[i]
    if (resolvedData.hasOwnProperty(mutation)) {
      resolvedData = resolvedData[mutation]
      break
    }
  }

  const { entities } = normalize(resolvedData, schema)

  // NOTE: This is a hack due to ono graphql me scheme design
  if (entities.me) {
    const me = entities.me
    entities.me = me[Object.keys(me)[0]]
  }

  yield (put({ type: types.SET_NORMALIZED_ENTITIES, entities }))
}

export function* fetchAnythingSaga(action: FetchAction): Generator<any, any, any> {
  try {
    yield put(actions.clearError(action.name))
    yield put(actions.sendingRequest(action.name, true))
    const response = yield call(get, action.query, action.variables || {}, action.operationName)

    yield call(normalizeSaga, response.data || response)

    if (action.callback) {
      const callbacks = action.callback(response, action.variables || {})
      while (callbacks.length) {
        const next = callbacks.splice(0, 1)
        yield put(next[0])
      }
    }
    return response
  } catch (error) {
    yield put(actions.requestError(action.name, error))
  } finally {
    yield put(actions.sendingRequest(action.name, false))
  }
  return null
}

export default fetchSaga
