/* @flow */

import { call, put } from 'redux-saga/effects'
import { actions } from 'ducks/session'
import USER_PROFILE_QUERY from 'services/ono/queries/users'
import { get } from 'services/ono/api'

export default function* fetchCurrentUserProfile() {
  try {
    yield put(actions.sendingRequest(true))

    const reponse = yield call(get, USER_PROFILE_QUERY)

    const profile = reponse.data.me

    yield put(actions.setProfile(profile))
  } catch (error) {
    yield put(actions.requestError(error))
  } finally {
    yield put(actions.sendingRequest(false))
  }
}
