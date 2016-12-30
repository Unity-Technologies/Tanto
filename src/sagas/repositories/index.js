/* @flow */
/* eslint-disable import/no-extraneous-dependencies */

import { put, call } from 'redux-saga/effects'
import { actions } from 'ducks/repositories'
import fetchSaga from 'sagas/fetch'
import {
  query,
  parseRepositories,
  ALL_REPOSITORIES_QUERY,
  REPOSITORY_BRANCHES,
  parseRepository,
  parseAllRepositoriesNames,
} from 'services/ono/queries/repositories'

// export function* fetchRepositories(action: Object): Generator<any, any, any> {
//   const { name } = action
//   const repositoriesQuery = query(name)
//   const args = name ? { name } : null

//   const response = yield call(fetchSaga, action.type, repositoriesQuery, args)
//   const { groups, repositories } = parseRepositories(response)

//   yield put(actions.setRepositories(repositories))
//   yield put(actions.setGroups(groups))
// }

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export function* searchRepository(action: Object): Generator<any, any, any> {
  yield call(delay, 300)
  const response = yield call(
    fetchSaga, action.type, ALL_REPOSITORIES_QUERY, { first: action.first, filter: action.filter })
  const names = parseAllRepositoriesNames(response)
  yield put(actions.setRepositoriesNames(names))
}

// export function* fetchRepositoryBranches(action: Object): Generator<any, any, any> {
//   const response = yield call(fetchSaga, action.type, REPOSITORY_BRANCHES, { id: action.id })
//   const node = parseRepository(response)
//   yield put(actions.setRepository(node))
// }

