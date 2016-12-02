/* @flow */

import { fork } from 'redux-saga/effects'
import { takeLatest } from 'redux-saga'
import { types as sessionTypes } from 'ducks/session'
import { types as projTypes } from 'ducks/projects'
import { types as prsTypes } from 'ducks/pullrequests'
import { types as prTypes } from 'ducks/pullRequest'

import fetchCurrentUserProfile from './session'
import {
  fetchCurrentUserPullRequests,
  fetchCurrentUserAssignedPullRequests,
  fetchCurrentUserWatchingPullRequests,
} from './pullrequests'

import { fetchProjects } from './projects'
import fetchPullRequest from './pullRequest'


export default function* rootSaga(): Generator<*, *, *> {
  yield fork(
    takeLatest, sessionTypes.FETCH_USER_PROFILE, fetchCurrentUserProfile)
  yield fork(
    takeLatest, prsTypes.FETCH_USER_PULL_REQUESTS, fetchCurrentUserPullRequests)
  yield fork(
    takeLatest, prsTypes.FETCH_USER_ASSIGNED_PULL_REQUESTS, fetchCurrentUserAssignedPullRequests)
  yield fork(
    takeLatest, prsTypes.FETCH_USER_WATCHING_PULL_REQUESTS, fetchCurrentUserWatchingPullRequests)
  yield fork(
    takeLatest, projTypes.PROJECTS_REQUEST, fetchProjects)
  yield fork(
    takeLatest, prTypes.FETCH_START, fetchPullRequest)
}
