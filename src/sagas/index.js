/* @flow */

import { fork } from 'redux-saga/effects'
import { takeLatest, takeEvery } from 'redux-saga'
import { types as sessionTypes } from 'ducks/session'
import { types as repoTypes } from 'ducks/repositories'
import { types as prsTypes } from 'ducks/pullrequests'

import fetchCurrentUserProfile from './session'
import {
  fetchPullRequest,
  fetchCurrentUserPullRequests,
  fetchCurrentUserAssignedPullRequests,
  fetchCurrentUserWatchingPullRequests,
} from './pullrequests'

import {
  fetchRepositories,
  fetchRepositoryBranches,
  searchRepository,
 } from './repositories'


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
    takeLatest, repoTypes.FETCH_REPOSITORIES, fetchRepositories)
  yield fork(
    takeLatest, prsTypes.FETCH_PULL_REQUEST, fetchPullRequest)
  yield fork(
    takeLatest, repoTypes.SEARCH_REPOSITORY, searchRepository)
  yield fork(
    takeEvery, repoTypes.FETCH_REPOSITORY_BRANCHES, fetchRepositoryBranches)
}
