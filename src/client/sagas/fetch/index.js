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

export const transformMutationResponse = (response: Object) => {
  let entities = response.data || response
  const mutationName = Object.keys(entities)[0]
  entities = entities[mutationName]
  if (entities.hasOwnProperty('ok')) {
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

export function* fetchAnythingSaga(action: FetchAction): Generator<any, any, any> {
  try {
    yield put(actions.clearError(action.name))
    yield put(actions.sendingRequest(action.name, true))
    const response = yield call(get, action.query, action.variables || {}, action.operationName)

    yield call(normalizeSaga, response, action)

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
