// /* @flow */
// /* eslint-disable import/no-extraneous-dependencies*/

// import { put, call } from 'redux-saga/effects'
// import { actions as sessionActions } from 'ducks/session'
// import { setPullRequests, setPullRequest } from 'ducks/pullrequests'
// import fetchSaga from 'sagas/fetch'
// import { queries, parsers } from 'services/ono/queries/pullrequests'
// import PULL_REQUEST_QUERY, { pullRequestQuery } from 'services/ono/queries/pullRequest'

// /**
//  * Fetch pull requests
//  */
// export function* fetchPullRequests(
//   action: Object,
//   query: string,
//   parser: Function,
//   updateSession: Function): Generator<any, any, any> {
//   const { page, pageSize } = action
//   const first = pageSize
//   const offset = pageSize * (page - 1)

//   let orderBy = {
//     direction: 'ASC',
//     field: '',
//   }

//   if (action.orderBy) {
//     orderBy = action.orderBy
//   }

//   const response = yield call(fetchSaga, action.type, query, { first, offset, orderBy, branch: action.branch, repo: action.repo })

//   const { nodes, total } = parser(response)
//   yield put(setPullRequests(page, nodes))
//   yield put(updateSession(page, nodes, total, pageSize, action.repo, action.branch))
// }

// /**
//  * Fetch pull request
//  */

// export function* fetchPullRequest(action: Object): Generator<any, any, any> {
//   const response = yield call(fetchSaga, action.type, PULL_REQUEST_QUERY, { id: action.id })
//   const pullRequest = pullRequestQuery(response)
//   yield put(setPullRequest(pullRequest))
// }

// /**
//  * Fetch current user pull requests
//  */
// export function* fetchCurrentUserPullRequests(action: Object): Generator< any, any, any > {
//   yield call(
//     fetchPullRequests,
//     action,
//     queries.CURRENT_USER_PULL_REQUESTS,
//     parsers.parseCurrentUserPullRequests,
//     sessionActions.setPullRequestsOwned)
// }

// /**
//  * Fetch current user assigned pull requests
//  */
// export function* fetchCurrentUserAssignedPullRequests(action: Object): Generator<any, any, any> {
//   yield call(
//     fetchPullRequests,
//     action,
//     queries.CURRENT_USER_ASSIGNED_PULL_REQUESTS,
//     parsers.parseCurrentUserAssignedPullRequests,
//     sessionActions.setPullRequestsAssigned)
// }

// /**
//  * Fetch current user watching pull requests
//  */
// export function* fetchCurrentUserWatchingPullRequests(action: Object): Generator<any, any, any> {
//   yield call(
//     fetchPullRequests,
//     action,
//     queries.CURRENT_USER_WATCHING_PULL_REQUESTS,
//     parsers.parseCurrentUserWatchingPullRequests,
//     sessionActions.setPullRequestsWatching)
// }
