/* @flow */

import type { PullRequestSource } from 'universal/types'
import type { OrderByType } from 'ducks/order'
import { singleFetchActionCreator, fetchActionCreator, fetchAction } from 'ducks/fetch'
import type { FetchAction } from 'ducks/fetch'
import { APPEND_ENTITY } from 'ducks/entities'
import { RECEIVE_PAGE } from 'ducks/pagination'
import { comment } from 'ducks/schema'
import _ from 'lodash'
import { UserInput } from 'universal/types'
import pullRequestList from 'ducks/pullrequests/queries/pullRequestList.graphql'
import pullRequestFilesList from 'ducks/pullrequests/queries/pullRequestFilesList.graphql'
import pullRequestFile from 'ducks/pullrequests/queries/pullRequestFile.graphql'
import pullRequestMetadataQuery from 'ducks/pullrequests/queries/pullRequestMetadata.graphql'
import pullRequestDiscussion from 'ducks/pullrequests/queries/pullRequestDiscussion.graphql'
import pullRequestIssues from 'ducks/pullrequests/queries/pullRequestIssues.graphql'
import pullRequestChangeset from 'ducks/pullrequests/queries/pullRequestChangeset.graphql'
import pullRequestChangeReviewers from 'ducks/pullrequests/queries/pullRequestChangeReviewers.graphql'

/**
 * Action types
 */
export const types = {
  FETCH_PULL_REQUEST_FILES_LIST: 'PULLREQUESTS/FETCH_PULL_REQUEST_FILES_LIST',
  FETCH_PULL_REQUEST_FILE: 'PULLREQUESTS/FETCH_PULL_REQUEST_FILE',
  FETCH_PULL_REQUESTS: 'PULLREQUESTS/FETCH_PULL_REQUESTS',
  FETCH_PULL_REQUEST_ISSUES: 'PULLREQUESTS/FETCH_PULL_REQUESTS_ISSUES',
  FETCH_PULL_REQUEST_CHANGESET: 'PULLREQUESTS/FETCH_PULL_REQUESTS_CHANGESET',
  FETCH_PULL_REQUEST_METADATA: 'PULLREQUESTS/FETCH_PULL_REQUEST_METADATA',
  FETCH_PULL_REQUEST_DISCUSSION: 'PULLREQUESTS/FETCH_PULL_REQUEST_DISCUSSION',
  FETCH_PULL_REQUEST_CHANGE_REVIEWERS: 'PULLREQUESTS/FETCH_PULL_REQUEST_CHANGE_REVIEWERS',
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

export const parsePullRequests = (response: Object) =>
  _.get(response, ['data', 'repository', 'pullRequests'], {})

export const parsePullRequest = (response: Object) =>
  _.get(response, ['data', 'pullRequest'], {})


export const createFileFetchActionType = (id: string, name: string) =>
  (`${types.FETCH_PULL_REQUEST_FILE}:${id}:${name}`)
/**
 *Action creators
 */
export const fetchPullRequestData =
  (actionType: string, query: string, variables: Object = {}): FetchAction =>
    fetchAction({ type: actionType, query, variables })

export const fetchPullRequestFilesList = (id: string): FetchAction =>
  fetchPullRequestData(types.FETCH_PULL_REQUEST_FILES_LIST, pullRequestFilesList, { id })

export const fetchPullRequestFile = (id: string, name: string): FetchAction =>
  fetchPullRequestData(createFileFetchActionType(id, name), pullRequestFile, { id, name })

export const fetchPullRequestMetadata = (id: string): FetchAction =>
  fetchPullRequestData(types.FETCH_PULL_REQUEST_METADATA, pullRequestMetadataQuery, { id })

export const fetchPullRequestDiscussion = (id: string): FetchAction =>
  fetchPullRequestData(types.FETCH_PULL_REQUEST_DISCUSSION, pullRequestDiscussion, { id })

export const fetchPullRequestIssues = (id: string): FetchAction =>
  fetchPullRequestData(types.FETCH_PULL_REQUEST_ISSUES, pullRequestIssues, { id })

export const fetchPullRequestChangeset = (id: string): FetchAction =>
  fetchPullRequestData(types.FETCH_PULL_REQUEST_CHANGESET, pullRequestChangeset, { id })

export const fetchPullRequests = (variables: FetchPullRequestVariables): FetchAction =>
  fetchActionCreator(
    types.FETCH_PULL_REQUESTS, pullRequestList, variables, operationName,
    (data: Object, cbArgs: Object): Array<Object> => {
      const { nodes, total } = parsePullRequests(data) || {}
      return [
        { type: RECEIVE_PAGE, namespace: operationName, nodes, total, ...cbArgs }]
    })

export const fetchPullRequestChangeReviewers = (
  pullRequestId: string,
  addReviewers: Array<UserInput>,
  removeReviewers: Array<UserInput>) =>
  singleFetchActionCreator(
    types.FETCH_PULL_REQUEST_CHANGE_REVIEWERS,
    pullRequestChangeReviewers,
    { pullRequestId, addReviewers, removeReviewers },
    '',
    (data: Object, cbArgs: Object): Object => ({
      pullRequest: _.get(data, ['data', 'changeReviewers', 'pullRequest'], {}),
    })
  )

export const createPullRequestDiscussionCommentNormalizer = (pullRequestId: number): Function => (
  (response: Object) => {
    const newComment = _.get(response, ['createComment', 'comment'], null)
    if (!newComment) {
      return null
    }
    return {
      type: APPEND_ENTITY,
      object: newComment,
      sourcePath: ['comments'],
      referencePaths: [['pullRequests', pullRequestId.toString(), 'comments']],
      schema: comment,
    }
  }
)
