/* @flow */

import { fork } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga'
import { types as sessionTypes } from 'ducks/session'
import { types as prTypes } from 'ducks/pullrequests'
import { types as projTypes } from 'ducks/projects'
import fetchCurrentUserProfile from './session'
import {
  fetchCurrentUserPullRequests,
  fetchCurrentUserAssignedPullRequests,
  fetchCurrentUserWatchingPullRequests,
} from './pullrequests'
import { fetchProjects } from './projects'

export default function* rootSaga() {
  yield fork(
    takeLatest, sessionTypes.FETCH_USER_PROFILE, fetchCurrentUserProfile)
  yield fork(
    takeLatest, prTypes.FETCH_USER_PULL_REQUESTS, fetchCurrentUserPullRequests)
  yield fork(
    takeLatest, prTypes.FETCH_USER_ASSIGNED_PULL_REQUESTS, fetchCurrentUserAssignedPullRequests)
  yield fork(
    takeLatest, prTypes.FETCH_USER_WATCHING_PULL_REQUESTS, fetchCurrentUserWatchingPullRequests)
  yield fork(
    takeLatest, projTypes.PROJECTS_REQUEST, fetchProjects)
}
