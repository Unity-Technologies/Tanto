/* @flow */

import { put, call } from 'redux-saga/effects'
import { post as postONO } from 'services/ono'
import { post as postBFStats } from 'services/bfstats'
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
    return yield call(postONO, graphQuery, variables)
  } catch (error) {
    yield put(actions.requestError(actionName, error))
  } finally {
    yield put(actions.sendingRequest(actionName, false))
  }
  return null
}

export const transformMutationResponse = (response: Object) => {
  let entities = response.data || response
  const mutationName = Object.keys(entities)[0]
  entities = entities[mutationName]
  if ('ok' in entities) {
    delete entities.ok
  }

  return entities
}

export const isMutationQuery = (query: string) => (query.trim()).startsWith('mutation')

export function* normalizeSaga(response: Object, action: Object): Generator<any, any, any> {
  if (!response) {
    return
  }
  let data = response.data || response

  const isMutation = action && action.query ? isMutationQuery(action.query) : false

  if (isMutation) {
    data = transformMutationResponse(response)
  }

  const { entities } = normalize(data, schema)

  if (entities.me) {
    const me = entities.me
    entities.me = me[Object.keys(me)[0]]
  }

  const type = isMutation ? types.SET_MUTATED_ENTITIES : types.SET_QUERIED_ENTITIES
  yield (put({ type, entities }))
}

const defaultEmptyObject = {}
export function* fetchAnythingSaga(post: Function, action: FetchAction): Generator<any, any, any> {
  try {
    yield put(actions.clearError(action.name))
    yield put(actions.sendingRequest(action.name, true))
    const response = yield call(post, action.query, action.variables || defaultEmptyObject, action.operationName)

    yield call(normalizeSaga, response, action)

    if (action.callback) {
      const callbacks = action.callback(response, action.variables || defaultEmptyObject)
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

export function* fetchOnoSaga(action: FetchAction): Generator<any, any, any> {
  yield call(fetchAnythingSaga, postONO, action)
}

export function* fetchBfStatsSaga(action: FetchAction): Generator<any, any, any> {
  yield call(fetchAnythingSaga, postBFStats, action)
}

export default fetchSaga
