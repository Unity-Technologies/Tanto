/* @flow */

import { fork } from 'redux-saga/effects'
import { takeLatest, takeEvery } from 'redux-saga'
import { types as repoTypes } from 'ducks/repositories/actions'
import { types as fetchTypes } from 'ducks/fetch'
import { types as usersTypes } from 'ducks/users'
import { fetchAnythingSaga } from 'sagas/fetch'
import { searchRepository } from 'sagas/repositories'
import { fetchUsers } from 'sagas/users'

export default function* rootSaga(): Generator<*, *, *> {
  yield fork(
    takeEvery, fetchTypes.FETCH_DATA, fetchAnythingSaga)
  yield fork(
    takeLatest, repoTypes.SEARCH_REPOSITORY, searchRepository)
  yield fork(
    takeEvery, usersTypes.FETCH_USERS, fetchUsers)
}
