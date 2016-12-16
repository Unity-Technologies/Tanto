/* @flow */

import { put, call } from 'redux-saga/effects'
import { get } from 'services/ono/api'
import { actions } from 'ducks/repositories'
import { actions as entitiesActions } from 'ducks/entities'
import {
  query,
  parseRepositories,
} from 'services/ono/queries/repositories'


export function* fetchRepositories(action: Object): Generator<any, any, any> {
  try {
    const { name } = action
    const repositoriesQuery = query(name)
    const args = name ? { name } : null

    yield put(entitiesActions.sendingRequest(true))

    const response = yield call(get, repositoriesQuery, args)
    const { groups, repositories } = parseRepositories(response)

    yield put(actions.setRepositories(repositories))
    yield put(actions.setGroups(groups))
  } catch (error) {
    yield put(entitiesActions.requestError(error))
  } finally {
    yield put(entitiesActions.sendingRequest(false))
  }
}
