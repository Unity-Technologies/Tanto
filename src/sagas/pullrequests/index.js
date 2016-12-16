// TODO: add flow annotations

import { call, put } from 'redux-saga/effects'
import { actions as sessionActions } from 'ducks/session'
import { actions as prActions } from 'ducks/pullrequests'
import { actions as entitiesActions } from 'ducks/entities'
import { get } from 'services/ono/api'
import {
  queries,
  parsers,
} from 'services/ono/queries/pullrequests'

/**
 * Fetch pull requests
 */
export function* fetchPullRequests(action, query, parser, updateSession) {
  try {
    const { page, pageSize } = action
    const first = pageSize
    const offset = pageSize * (page - 1)

    yield put(entitiesActions.sendingRequest(true))

    const response = yield call(get, query, { first, offset })

    const { nodes, total } = parser(response)

    yield put(prActions.setPullRequests(page, nodes))

    yield put(updateSession(page, nodes, total, pageSize))
  } catch (error) {
    yield put(entitiesActions.requestError(error))
  } finally {
    yield put(entitiesActions.sendingRequest(false))
  }
}

/**
 * Fetch current user pull requests
 */
export function* fetchCurrentUserPullRequests(action) {
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
export function* fetchCurrentUserAssignedPullRequests(action) {
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
export function* fetchCurrentUserWatchingPullRequests(action) {
  yield call(
    fetchPullRequests,
    action,
    queries.CURRENT_USER_WATCHING_PULL_REQUESTS,
    parsers.parseCurrentUserWatchingPullRequests,
    sessionActions.setPullRequestsWatching)
}
