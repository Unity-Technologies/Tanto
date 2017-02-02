/* @flow */

import type { PullRequestSource } from 'universal/types'
import type { OrderByType } from 'ducks/order'
import { fetchActionCreator } from 'ducks/fetch'
import _ from 'lodash'

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
  FETCH_PULL_REQUEST_DIFF: 'PULLREQUESTS/FETCH_PULL_REQUEST_DIFF',
  FETCH_PULL_REQUESTS: 'PULLREQUESTS/FETCH_PULL_REQUESTS',
  FETCH_PULL_REQUEST_ISSUES: 'PULLREQUESTS/FETCH_PULL_REQUESTS_ISSUES',
  FETCH_PULL_REQUEST_CHANGESET: 'PULLREQUESTS/FETCH_PULL_REQUESTS_CHANGESET',
  FETCH_PULL_REQUEST_METADATA: 'PULLREQUESTS/FETCH_PULL_REQUEST_METADATA',
  FETCH_PULL_REQUEST_DISCUSSION: 'PULLREQUESTS/FETCH_PULL_REQUEST_DISCUSSION',
}

export const operationName = 'pullRequests'

export type FetchPullRequestVariables = {
  page: number,
  pageSize: number,
  target: PullRequestSource,
  repo: string,
  orderBy: OrderByType,
}

/** Response parsers */

export const parsePullRequests = (response: Object) => (
  _.get(response, ['data', 'repository', 'pullRequests'])
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
    types.FETCH_PULL_REQUESTS, pullRequestList, variables, operationName,
    (data: Object, cbArgs: Object): Array<Object> => {
      const { nodes, total } = parsePullRequests(data)
      return [
        { type: RECEIVE_PAGE, namespace: operationName, nodes, total, ...cbArgs }]
    })

