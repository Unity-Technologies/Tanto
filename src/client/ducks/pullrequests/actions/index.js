/* @flow */

import type { PullRequestSource } from 'universal/types'
import type { OrderByType } from 'ducks/order'
import { fetchActionCreator } from 'ducks/fetch'
import _ from 'lodash'
import { types as sessionTypes } from 'ducks/session/actions'
import { RECEIVE_PAGE } from 'ducks/pagination'

import pullRequestList from 'ducks/pullrequests/queries/pullRequestList.graphql'
import pullRequestFiles from 'ducks/pullrequests/queries/pullRequestFiles.graphql'
import pullRequestMetadataQuery from 'ducks/pullrequests/queries/pullRequestMetadata.graphql'
import pullRequestDiscussion from 'ducks/pullrequests/queries/pullRequestDiscussion.graphql'
import pullRequestIssues from 'ducks/pullrequests/queries/pullRequestIssues.graphql'
import pullRequestChangeset from 'ducks/pullrequests/queries/pullRequestChangeset.graphql'
/**
 * Action types
 */
export const types = {
  SET_PULL_REQUESTS: 'PULLREQUESTSUSER/SET_PULL_REQUESTS',
  SET_PULL_REQUEST: 'PULLREQUESTSUSER/SET_PULL_REQUEST',
  SET_PULL_REQUESTS_PAGE: 'PULLREQUESTSUSER/SET_PULL_REQUESTS_PAGE',
  FETCH_PULL_REQUEST_DIFF: 'PULLREQUESTS/FETCH_PULL_REQUEST_DIFF',
  FETCH_PULL_REQUESTS: 'PULLREQUESTS/FETCH_PULL_REQUESTS',
  FETCH_PULL_REQUEST_ISSUES: 'PULLREQUESTS/FETCH_PULL_REQUESTS_ISSUES',
  FETCH_PULL_REQUEST_CHANGESET: 'PULLREQUESTS/FETCH_PULL_REQUESTS_CHANGESET',
  FETCH_USER_PULL_REQUESTS: 'PULLREQUESTS/FETCH_USER_PULL_REQUESTS',
  FETCH_USER_ASSIGNED_PULL_REQUESTS: 'PULLREQUESTS/FETCH_USER_ASSIGNED_PULL_REQUESTS',
  FETCH_USER_WATCHING_PULL_REQUESTS: 'PULLREQUESTS/FETCH_USER_WATCHING_PULL_REQUESTS',
  FETCH_PULL_REQUEST_METADATA: 'PULLREQUESTS/FETCH_PULL_REQUEST_METADATA',
  FETCH_PULL_REQUEST_DISCUSSION: 'PULLREQUESTS/FETCH_PULL_REQUEST_DISCUSSION',
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

export const namespace = 'pullRequests'

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

export const fetchPullRequestDiff = (id: string) =>
  fetchPullRequestData(types.FETCH_PULL_REQUEST_DIFF, pullRequestFiles, { id })

export const fetchPullRequestMetadata = (id: string) =>
  fetchPullRequestData(types.FETCH_PULL_REQUEST_METADATA, pullRequestMetadataQuery, { id })

export const fetchPullRequestDiscussion = (id: string) =>
  fetchPullRequestData(types.FETCH_PULL_REQUEST_DISCUSSION, pullRequestDiscussion, { id })

export const fetchPullRequestIssues = (id: string) =>
  fetchPullRequestData(types.FETCH_PULL_REQUEST_ISSUES, pullRequestIssues, { id })

export const fetchPullRequestChangeset = (id: string) =>
  fetchPullRequestData(types.FETCH_PULL_REQUEST_CHANGESET, pullRequestChangeset, { id })

export const fetchPullRequests = (variables: FetchPullRequestVariables): Object =>
  fetchActionCreator(
    types.FETCH_PULL_REQUESTS, pullRequestList, variables, operationNames.pullRequests,
    (data: Object, cbArgs: Object): Array<Object> => {
      const { nodes, total } = parsePullRequests(data)
      return [
        { type: RECEIVE_PAGE, namespace: 'pullRequests', nodes, total, ...cbArgs }]
    })

export const fetchUserPullRequests = (variables: FetchPullRequestVariables): Object =>
  fetchActionCreator(
    types.FETCH_USER_PULL_REQUESTS, pullRequestList, variables,
    operationNames.pullRequestsOwned,
    (data: Object, cbArgs: Object): Array<Object> => {
      const { nodes, total } = parseCurrentUserPullRequests(data)
      return [
        { type: RECEIVE_PAGE, namespace: 'pullRequestsOwned', nodes, total, ...cbArgs },
      ]
    })

export const fetchUserAssignedPullRequests = (variables: FetchPullRequestVariables): Object =>
  fetchActionCreator(
    types.FETCH_USER_ASSIGNED_PULL_REQUESTS, pullRequestList, variables,
    operationNames.pullRequestsAssigned,
    (data: Object, cbArgs: Object): Array<Object> => {
      const { nodes, total } = parseCurrentUserAssignedPullRequests(data)
      return [
        { type: RECEIVE_PAGE, namespace: 'pullRequestsAssigned', nodes, total, ...cbArgs },
      ]
    })

