/* @flow */

import { put, call } from 'redux-saga/effects'
import { get } from 'services/ono/api'
import { actions } from 'ducks/projects'
import { GET_TOPLEVEL_PROJECTS_QUERY,
         GET_PROJECTS_QUERY,
         parseProjectsData,
         parseToplevelProjectsData } from 'services/ono/queries/projects'


export function* fetchProjects(action) {
  try {
    let data
    yield put(actions.fetchingStatus(true))
    if (action.path === '') {
      data = yield call(get, GET_TOPLEVEL_PROJECTS_QUERY)
      yield put(actions.fetchProjectsSuccess(parseToplevelProjectsData(data)))
    } else {
      data = yield call(get, GET_PROJECTS_QUERY, { name: action.path })
      yield put(actions.fetchProjectsSuccess(parseProjectsData(data, action.path)))
    }
  } catch (error) {
    yield put(actions.fetchProjectsFailure(error))
  } finally {
    yield put(actions.fetchingStatus(false))
  }
}
