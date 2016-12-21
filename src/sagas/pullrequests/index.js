/* @flow */
/* eslint-disable import/no-extraneous-dependencies*/

import { put, call } from 'redux-saga/effects'
import { actions as sessionActions } from 'ducks/session'
import { actions as prActions } from 'ducks/pullrequests'
import fetchSaga from 'sagas/fetch'
import { queries, parsers } from 'services/ono/queries/pullrequests'

/**
 * Fetch pull requests
 */
export function* fetchPullRequests(
  action: Object,
  query: string,
  parser: Function,
  updateSession: Function): Generator<any, any, any> {
  const { page, pageSize } = action
  const first = pageSize
  const offset = pageSize * (page - 1)

  const response = yield call(fetchSaga, action.type, query, { first, offset })

  const { nodes, total } = parser(response)
  yield put(prActions.setPullRequests(page, nodes))
  yield put(updateSession(page, nodes, total, pageSize))
}

/**
 * Fetch current user pull requests
 */
export function* fetchCurrentUserPullRequests(action: Object): Generator< any, any, any > {
  yield call(
    fetchPullRequests,
    action,
    queries.CURRENT_USER_PULL_REQUESTS,
    parsers.parseCurrentUserPullRequests,
    sessionActions.setPullRequestsOwned)
}

/**
 * Fetch current user assigned pull requests
 */
export function* fetchCurrentUserAssignedPullRequests(action: Object): Generator<any, any, any> {
  yield call(
    fetchPullRequests,
    action,
    queries.CURRENT_USER_ASSIGNED_PULL_REQUESTS,
    parsers.parseCurrentUserAssignedPullRequests,
    sessionActions.setPullRequestsAssigned)
}

/**
 * Fetch current user watching pull requests
 */
export function* fetchCurrentUserWatchingPullRequests(action: Object): Generator<any, any, any> {
  yield call(
    fetchPullRequests,
    action,
    queries.CURRENT_USER_WATCHING_PULL_REQUESTS,
    parsers.parseCurrentUserWatchingPullRequests,
    sessionActions.setPullRequestsWatching)
}
