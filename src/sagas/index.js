/* @flow */

import { fork } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga'
import { types as sessionTypes } from 'ducks/session'
import { types as prTypes } from 'ducks/pullrequests'
import fetchCurrentUserProfile from './session'
import {
  fetchCurrentUserPullRequests,
  fetchCurrentUserAssignedPullRequests,
  fetchCurrentUserWatchingPullRequests,
} from './pullrequests'

export default function* rootSaga() {
  yield fork(
    takeLatest, sessionTypes.FETCH_USER_PROFILE, fetchCurrentUserProfile)
  yield fork(
    takeLatest, prTypes.FETCH_USER_PULL_REQUESTS, fetchCurrentUserPullRequests)
  yield fork(
    takeLatest, prTypes.FETCH_USER_ASSIGNED_PULL_REQUESTS, fetchCurrentUserAssignedPullRequests)
  yield fork(
    takeLatest, prTypes.FETCH_USER_WATCHING_PULL_REQUESTS, fetchCurrentUserWatchingPullRequests)
}
