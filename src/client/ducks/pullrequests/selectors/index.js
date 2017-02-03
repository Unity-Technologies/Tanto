/* @flow */

import { types } from '../actions'
import { getFetchStatus } from 'ducks/fetch'
import { createSelector } from 'reselect'
import type { StatusType } from 'ducks/fetch'
export type { StatusType } from 'ducks/fetch'

import _ from 'lodash'

export const getPageFetchStatus =
  (state: Object): StatusType => getFetchStatus(state, types.FETCH_PULL_REQUESTS)

export const getPullRequest =
  (state: Object, props: Object): Object => {
    const id = props.params ? props.params.prid : props.pullRequestId || props.id
    return (state.entities.pullRequests || {})[id]
  }

export const getIssuesEntities = (state: Object) => state.entities.issues
export const getPullRequestIssuesIds =
  (state: Object, props: Object): Object => {
    const id = props.params ? props.params.prid : props.pullRequestId || props.id
    return ((state.entities.pullRequests || {})[id] || {}).issues
  }

export const getPullRequestIssues = createSelector(
  getIssuesEntities, getPullRequestIssuesIds,
  (issues, ids) =>
    _.values(_.pick(issues, ids))
)

export const getCommentsEntities = (state: Object) => state.entities.comments
export const getPullRequestGeneralCommentsIds =
  (state: Object, props: Object): Object => {
    const id = props.params ? props.params.prid : props.pullRequestId || props.id
    return ((state.entities.pullRequests || {})[id] || {}).comments
  }

export const getPullRequestGeneralComments = createSelector(
  getCommentsEntities, getPullRequestGeneralCommentsIds,
  (comments, ids) =>
    _.values(_.pick(comments, ids))
)


export const getPullRequestFiles = createSelector(
  getPullRequest, getCommentsEntities,
  (pr, comments) =>
    ((pr || {}).files || []).map(x => ({ ...x, comments: _.values(_.pick(comments, x.comments)) }))
)

export const getIds = (state: Object): Array<Number> => {
  const { pagination: { pages, currentPage } } = state
  return pages[currentPage]
}

export const pullRequestsEntitiesSelector =
  (state: Object, props: Object): Object => state.entities.pullRequests

export const pullRequestsIdsSelector =
  (state: Object, props: Object): Array<Number> => getIds(state.session.pullRequests)

export const getPullRequests = createSelector(
  pullRequestsEntitiesSelector, pullRequestsIdsSelector,
  (pullRequestsEntities, pullRequestsIds) =>
    _.values(_.pick(pullRequestsEntities, pullRequestsIds))
)
