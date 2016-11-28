/* @flow */

import { call, put } from 'redux-saga/effects'
import { actions as sessionActions } from 'ducks/session'
import { actions as prActions } from 'ducks/pullrequests'
import { get } from 'services/ono/api'
import {
  queries,
  parsers,
} from 'services/ono/queries/pullrequests'

/**
 * Fetch pull requests
 */
export function* fetchPullRequests(query, parser, updateSession) {
  try {
    yield put(prActions.sendingRequest(true))

    const response = yield call(get, query)

    const pullrequests = parser(response)

    yield put(prActions.setPullRequests(pullrequests))

    const ids = pullrequests.map(x => x.id)
    yield put(updateSession(ids))
  } catch (error) {
    yield put(prActions.requestError(error))
  } finally {
    yield put(prActions.sendingRequest(false))
  }
}

/**
 * Fetch current user pull requests
 */
export function* fetchCurrentUserPullRequests() {
  yield call(
    fetchPullRequests,
    queries.CURRENT_USER_PULL_REQUESTS,
    parsers.parseCurrentUserPullRequests,
    sessionActions.setUserPRIds)
}

/**
 * Fetch current user assigned pull requests
 */
export function* fetchCurrentUserAssignedPullRequests() {
  yield call(
    fetchPullRequests,
    queries.CURRENT_USER_ASSIGNED_PULL_REQUESTS,
    parsers.parseCurrentUserAssignedPullRequests,
    sessionActions.setUserAssignedPRIds)
}

/**
 * Fetch current user watching pull requests
 */
export function* fetchCurrentUserWatchingPullRequests() {
  yield call(
    fetchPullRequests,
    queries.CURRENT_USER_WATCHING_PULL_REQUESTS,
    parsers.parseCurrentUserWatchingPullRequests,
    sessionActions.setUserWatchingPRsIds)
}

