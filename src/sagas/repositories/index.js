/* @flow */
/* eslint-disable import/no-extraneous-dependencies */

import { put, call } from 'redux-saga/effects'
import { actions } from 'ducks/repositories'
import fetchSaga from 'sagas/fetch'
import { query, parseRepositories } from 'services/ono/queries/repositories'

export function* fetchRepositories(action: Object): Generator<any, any, any> {
  const { name } = action
  const repositoriesQuery = query(name)
  const args = name ? { name } : null

  const response = yield call(fetchSaga, action.type, repositoriesQuery, args)
  const { groups, repositories } = parseRepositories(response)

  yield put(actions.setRepositories(repositories))
  yield put(actions.setGroups(groups))
}

