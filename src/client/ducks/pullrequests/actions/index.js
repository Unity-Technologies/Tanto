/* @flow */

import _ from 'lodash'
import type { PullRequestSourceType } from 'universal/types'
import { PullRequestSource } from 'universal/constants'
import type { OrderByType } from 'ducks/order'
import { fetchOnoActionCreator, fetchOnoAction } from 'ducks/fetch'
import type { FetchAction, FetchPullRequestVariablesType } from 'ducks/fetch'
import { RECEIVE_PAGE } from 'ducks/pagination'

import pullRequestList from 'ducks/pullrequests/queries/pullRequestList.graphql'
import pullRequestFilesList from 'ducks/pullrequests/queries/pullRequestFilesList.graphql'
import pullRequestFiles from 'ducks/pullrequests/queries/pullRequestFiles.graphql'
import pullRequestMetadataQuery from 'ducks/pullrequests/queries/pullRequestMetadata.graphql'
import pullRequestDiscussion from 'ducks/pullrequests/queries/pullRequestDiscussion.graphql'
import pullRequestIssues from 'ducks/pullrequests/queries/pullRequestIssues.graphql'
import pullRequestChangeset from 'ducks/pullrequests/queries/pullRequestChangeset.graphql'
import pullRequestReviews from 'ducks/pullrequests/queries/pullRequestReviews.graphql'

import updateDescription from 'ducks/pullrequests/mutations/updateDescription.graphql'
import addReviewers from 'ducks/pullrequests/mutations/addReviewers.graphql'
import removeReviewers from 'ducks/pullrequests/mutations/removeReviewers.graphql'

/**
 * Action types
 */
export const types = {
  FETCH_PULL_REQUEST_FILES_LIST: 'PULLREQUESTS/FETCH_PULL_REQUEST_FILES_LIST',
  FETCH_PULL_REQUEST_FILES: 'PULLREQUESTS/FETCH_PULL_REQUEST_FILES',
  FETCH_PULL_REQUESTS: 'PULLREQUESTS/FETCH_PULL_REQUESTS',
  FETCH_PULL_REQUEST_ISSUES: 'PULLREQUESTS/FETCH_PULL_REQUESTS_ISSUES',
  FETCH_PULL_REQUEST_CHANGESET: 'PULLREQUESTS/FETCH_PULL_REQUESTS_CHANGESET',
  FETCH_PULL_REQUEST_METADATA: 'PULLREQUESTS/FETCH_PULL_REQUEST_METADATA',
  FETCH_PULL_REQUEST_DISCUSSION: 'PULLREQUESTS/FETCH_PULL_REQUEST_DISCUSSION',
  FETCH_PULL_REQUEST_CHANGE_REVIEWERS: 'PULLREQUESTS/FETCH_PULL_REQUEST_CHANGE_REVIEWERS',
  FETCH_PULL_REQUEST_REVIEWS: 'PULLREQUESTS/FETCH_PULL_REQUEST_REVIEWS',

  UPDATE_PULL_REQUEST_DESCRIPTION: 'PULLREQUESTS/UPDATE_PULL_REQUEST_DESCRIPTION',
  UPDATE_PULL_REQUEST_REVIEWERS: 'PULLREQUESTS/UPDATE_PULL_REQUEST_REVIEWERS',
  DELETE_PULL_REQUEST_REVIEWERS: 'PULLREQUESTS/DELETE_PULL_REQUEST_REVIEWERS',
}

export const operationName = 'pullRequests'

export type FetchPullRequestArguments = {
  page: number,
  pageSize: number,
  target: PullRequestSourceType,
  repo: string,
  orderBy: OrderByType,
}

const formatArguments = (variables: Object): FetchPullRequestArguments => {
  const { repo, branch, ...args } = variables

  if (repo) {
    args.repo = repo
  }

  if (branch) {
    args.target = {
      name: branch,
      type: PullRequestSource.BRANCH,
    }
  }

  return args
}

/** Response parsers */

export const parsePullRequests = (response: Object) =>
  _.get(response, ['data', 'repository', 'pullRequests'], {})

export const parsePullRequest = (response: Object) =>
  _.get(response, ['data', 'pullRequest'], {})
/*
 *Action creators
 */
export const fetchPullRequestData =
  (actionType: string, query: string, variables: Object = {}): FetchAction =>
    fetchOnoAction({ type: actionType, query, variables })

export const fetchPullRequestFilesList = (id: string): FetchAction =>
  fetchPullRequestData(types.FETCH_PULL_REQUEST_FILES_LIST, pullRequestFilesList, { id })

export const fetchPullRequestFiles = (id: string, name: string): FetchAction =>
  fetchPullRequestData(types.FETCH_PULL_REQUEST_FILES, pullRequestFiles, { id, name })

export const fetchPullRequestMetadata = (id: string): FetchAction =>
  fetchPullRequestData(types.FETCH_PULL_REQUEST_METADATA, pullRequestMetadataQuery, { id })

export const fetchPullRequestReviews = (id: string): FetchAction =>
  fetchPullRequestData(types.FETCH_PULL_REQUEST_REVIEWS, pullRequestReviews, { id })

export const fetchPullRequestDiscussion = (id: string): FetchAction =>
  fetchPullRequestData(types.FETCH_PULL_REQUEST_DISCUSSION, pullRequestDiscussion, { id })

export const fetchPullRequestIssues = (id: string): FetchAction =>
  fetchPullRequestData(types.FETCH_PULL_REQUEST_ISSUES, pullRequestIssues, { id })

export const fetchPullRequestChangeset = (id: string): FetchAction =>
  fetchPullRequestData(types.FETCH_PULL_REQUEST_CHANGESET, pullRequestChangeset, { id })

const defaultEmptyPullRequests = {}
export const fetchPullRequests = (variables: FetchPullRequestVariablesType): FetchAction =>
  fetchOnoActionCreator(
    types.FETCH_PULL_REQUESTS, pullRequestList, formatArguments(variables), operationName,
    (data: Object, cbArgs: Object): Array<Object> => {
      const { nodes, total } = parsePullRequests(data) || defaultEmptyPullRequests
      return [
        { type: RECEIVE_PAGE, namespace: operationName, nodes, total, ...cbArgs }]
    })

/**
 *Mutations
 */
export const updatePullRequestDescription = (id: string, description: string): FetchAction =>
  fetchPullRequestData(types.UPDATE_PULL_REQUEST_DESCRIPTION, updateDescription, { id, description })

export const addPullRequestReviewers = (pullRequestId: string, reviewers: Array<any>): FetchAction =>
  fetchPullRequestData(types.UPDATE_PULL_REQUEST_REVIEWERS, addReviewers, { pullRequestId, reviewers })

export const removePullRequestReviewers = (pullRequestId: string, reviewers: Array<any>): FetchAction =>
  fetchPullRequestData(types.DELETE_PULL_REQUEST_REVIEWERS, removeReviewers, { pullRequestId, reviewers })
