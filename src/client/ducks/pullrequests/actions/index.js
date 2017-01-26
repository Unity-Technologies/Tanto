/* @flow */

import type { PullRequestSource } from 'universal/types'
import type { OrderByType } from 'ducks/order'
import { fetchActionCreator } from 'ducks/fetch'
import _ from 'lodash'
import { types as sessionTypes } from 'ducks/session/actions'
import pullRequestList from 'ducks/pullrequests/queries/pullRequestList.graphql'

/**
 * Action types
 */
export const types = {
  SET_PULL_REQUESTS: 'PULLREQUESTSUSER/SET_PULL_REQUESTS',
  SET_PULL_REQUEST: 'PULLREQUESTSUSER/SET_PULL_REQUEST',
  SET_PULL_REQUESTS_PAGE: 'PULLREQUESTSUSER/SET_PULL_REQUESTS_PAGE',
  FETCH_PULL_REQUEST: 'PULLREQUESTS/FETCH_PULL_REQUEST',
  FETCH_PULL_REQUESTS: 'PULLREQUESTS/FETCH_PULL_REQUESTS',
  FETCH_USER_PULL_REQUESTS: 'PULLREQUESTS/FETCH_USER_PULL_REQUESTS',
  FETCH_USER_ASSIGNED_PULL_REQUESTS: 'PULLREQUESTS/FETCH_USER_ASSIGNED_PULL_REQUESTS',
  FETCH_USER_WATCHING_PULL_REQUESTS: 'PULLREQUESTS/FETCH_USER_WATCHING_PULL_REQUESTS',
  FETCH_PULL_REQUEST_METADATA: 'PULLREQUESTS/FETCH_PULL_REQUEST_METADATA',
}

export const operationNames = {
  pullRequestsOwned: 'pullRequestsOwned',
  pullRequestsAssigned: 'pullRequestsAssigned',
  pullRequests: 'pullRequests',
}

export type FetchPullRequestVariables = {
  page: number,
  pageSize: number,
  target: PullRequestSource,
  repo: string,
  orderBy: OrderByType,
}

/** Response parsers */

export const parseCurrentUserPullRequests = (response: Object) => (
  _.get(response, ['data', 'me', operationNames.pullRequestsOwned])
)

export const parseCurrentUserAssignedPullRequests = (response: Object) => (
  _.get(response, ['data', 'me', operationNames.pullRequestsAssigned])
)

export const parsePullRequests = (response: Object) => (
  _.get(response, ['data', 'repository', operationNames.pullRequests])
)

export const parsePullRequest = (response: Object) => (
  _.get(response, ['data', 'pullRequest'])
)

/**
 *Action creators
 */
export const fetchPullRequestData =
  (actionType: string, query: string, variables: Object = {}): Object =>
    fetchActionCreator(actionType, query, variables, '',
      (data: Object, cbArgs: Object): Array<Object> => {
        const node = parsePullRequest(data)
        return [{ type: types.SET_PULL_REQUEST, node }]
      })

export const fetchPullRequests = (variables: FetchPullRequestVariables): Object =>
  fetchActionCreator(
    types.FETCH_PULL_REQUESTS, pullRequestList, variables, operationNames.pullRequests,
    (data: Object, cbArgs: Object): Array<Object> => {
      const { nodes, total } = parsePullRequests(data)
      return [
        { type: types.SET_PULL_REQUESTS, nodes },
        { type: types.SET_PULL_REQUESTS_PAGE, nodes, total, ...cbArgs }]
    })

export const fetchUserPullRequests = (variables: FetchPullRequestVariables): Object =>
  fetchActionCreator(
    types.FETCH_USER_PULL_REQUESTS, pullRequestList, variables,
    operationNames.pullRequestsOwned,
    (data: Object, cbArgs: Object): Array<Object> => {
      const { nodes, total } = parseCurrentUserPullRequests(data)
      return [
        { type: types.SET_PULL_REQUESTS, nodes },
        { type: sessionTypes.SET_PULL_REQUESTS_OWNED, nodes, total, ...cbArgs },
      ]
    })

export const fetchUserAssignedPullRequests = (variables: FetchPullRequestVariables): Object =>
  fetchActionCreator(
    types.FETCH_USER_ASSIGNED_PULL_REQUESTS, pullRequestList, variables,
    operationNames.pullRequestsAssigned,
    (data: Object, cbArgs: Object): Array<Object> => {
      const { nodes, total } = parseCurrentUserAssignedPullRequests(data)
      return [
        { type: types.SET_PULL_REQUESTS, nodes },
        { type: sessionTypes.SET_PULL_REQUESTS_ASSIGNED, nodes, total, ...cbArgs },
      ]
    })

