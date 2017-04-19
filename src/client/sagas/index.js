/* @flow */

import { fork } from 'redux-saga/effects'
import { takeLatest, takeEvery } from 'redux-saga'
import { types as repoTypes } from 'ducks/repositories/actions'
import { types as fetchTypes } from 'ducks/fetch'
import { types as usersTypes } from 'ducks/users'
// import { types as diffTypes } from 'ducks/diff'
import { fetchOnoSaga, fetchBfStatsSaga } from 'sagas/fetch'
import { searchRepository } from 'sagas/repositories'
import { fetchUsers } from 'sagas/users'
// import { processUnifiedDiff, processSideBySideDiff } from 'sagas/diff'

export default function* rootSaga(): Generator<*, *, *> {
  yield fork(
    takeEvery, fetchTypes.FETCH_ONO_DATA, fetchOnoSaga)
  yield fork(
    takeEvery, fetchTypes.FETCH_BFSTATS_DATA, fetchBfStatsSaga)
  yield fork(
    takeLatest, repoTypes.SEARCH_REPOSITORY, searchRepository)
  yield fork(
    takeEvery, usersTypes.FETCH_USERS, fetchUsers)
  // yield fork(
  //   takeEvery, diffTypes.PROCESS_UNIFIED_DIFF, processUnifiedDiff)
  // yield fork(
  //   takeEvery, diffTypes.PROCESS_SIDE_BY_SIDE_DIFF, processSideBySideDiff)
}
