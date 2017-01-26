/* @flow */

import { fork } from 'redux-saga/effects'
import { takeLatest, takeEvery } from 'redux-saga'
import { types as repoTypes, searchRepository } from 'ducks/repositories/actions'
import { types as fetchTypes } from 'ducks/fetch'
import { fetchAnythingSaga } from 'sagas/fetch'

export default function* rootSaga(): Generator<*, *, *> {
  yield fork(
    takeEvery, fetchTypes.FETCH_DATA, fetchAnythingSaga)
  yield fork(
    takeLatest, repoTypes.SEARCH_REPOSITORY, searchRepository)
}
