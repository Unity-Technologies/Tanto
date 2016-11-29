/* @flow */

import { take, put, call } from 'redux-saga/effects'
import { get } from 'services/ono/api'
import { actions, types } from 'ducks/projects'
import { PROJECT_LIST_QUERY } from 'services/ono/queries/projects'


export function* fetchProjects() {
  try {
    yield put(actions.fetchingStatus(true))
    const data = yield call(get, PROJECT_LIST_QUERY)
    yield put(actions.fetchProjectsSuccess(data.data))
  } catch (error) {
    yield put(actions.fetchProjectsFailure(error))
  } finally {
    yield put(actions.fetchingStatus(false))
  }
}


export function* watchGetProjects() { //eslint-disable-line
  while (true) {                              // eslint-disable-line no-constant-condition
    yield take(types.PROJECTS_REQUEST)
    yield fetchProjects()
  }
}
