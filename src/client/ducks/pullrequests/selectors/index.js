/* @flow */

import { types } from '../actions'
import { statusFetchFactory } from 'ducks/fetch/selectors'
import { createSelector } from 'reselect'
export type { StatusType } from 'ducks/fetch/selectors'
import { userEntitiesSelector } from 'ducks/users/selectors'

import _ from 'lodash'

export const denormalizePullRequestUsers = (pullRequest: Object, userEntities: Object): Object => {
  if (!pullRequest || !userEntities) {
    return pullRequest
  }
  const denormalizedPullRequest = Object.assign({}, pullRequest)
  if (pullRequest.owner) {
    denormalizedPullRequest.owner = userEntities[pullRequest.owner]
  }
  if (pullRequest.reviews) {
    denormalizedPullRequest.reviews = pullRequest.reviews.map(review => ({
      ...review,
      user: userEntities[review.user],
    }))
  }
  return denormalizedPullRequest
}

export const denormalizeCommentAuthor = (comment: Object, userEntities: Object): Object => {
  if (!comment || !userEntities) {
    return comment
  }
  return ({
    ...comment,
    author: userEntities[comment.author] || {},
  })
}

/**
 * Pull request selectors
 */
export const getPullRequestsEntities = (state: Object): Object =>
  _.get(state, ['entities', 'pullRequests'], {})

export const getPullRequestId = (state: Object, props: Object): string =>
  (props.params ? props.params.prid : props.pullRequestId || props.id)

export const getPageFetchStatus = statusFetchFactory(types.FETCH_PULL_REQUESTS)

export const getPullRequest = createSelector(
  getPullRequestsEntities, userEntitiesSelector, getPullRequestId,
  (entities: Object, userEntities: Object, id: string): Object => {
    const pullRequest = (id ? entities[id] : {})
    // Denormalization of owner and reviewers
    return denormalizePullRequestUsers(pullRequest, userEntities)
  })

// Sometimes we don't need Denormalization of users, when we need just issues or comments
export const getPullRequestNormalized = createSelector(
  getPullRequestsEntities, getPullRequestId,
  (entities: Object, id: string): Object =>
    (id ? entities[id] || {} : {})
)

/**
 * Pull request page selectors
 */
export const pullRequestsPageIdsSelector =
  (state: Object, props: Object): Array<Number> => {
    const pullRequestsPagingSettings = _.get(state, ['session', 'pullRequests', 'pagination'], {})
    const { pages, currentPage } = pullRequestsPagingSettings
    return pages && currentPage > -1 ? pages[currentPage] : []
  }

export const getPullRequestsPage = createSelector(
  getPullRequestsEntities, userEntitiesSelector, pullRequestsPageIdsSelector,
  (entities, userEntities, ids) =>
    _.values(_.pick(entities, ids)).map(pr => denormalizePullRequestUsers(pr, userEntities))
)

/**
 * Pull request issues selectors
 */
export const getIssuesEntities = (state: Object) =>
  _.get(state, ['entities', 'issues'], {})

export const getPullRequestIssues = createSelector(
  getIssuesEntities, userEntitiesSelector, getPullRequestNormalized,
  (issueEntities, userEntities, pr) => {
    const prIssues = pr ? _.values(_.pick(issueEntities, pr.issues || [])) : []
    // Denormalization of owner and assignee
    return prIssues.map(issue => ({
      ...issue,
      owner: userEntities[issue.owner] || {},
      assignee: userEntities[issue.assignee] || {},
    }))
  }
)

/**
 * Pull request  comments
 */
export const getCommentsEntities = (state: Object) =>
  _.get(state, ['entities', 'comments'], {})

export const getPullRequestGeneralComments = createSelector(
  getCommentsEntities, userEntitiesSelector, getPullRequestNormalized,
  (commentsEntities, userEntities, pr) => {
    const prComments = _.values(_.pick(commentsEntities, _.get(pr, ['comments'], [])))
    //  Denormalization of comment author
    return prComments.map(comment => denormalizeCommentAuthor(comment, userEntities))
  }
)

/**
 * Pull request files
 */
export const getFilesEntities = (state: Object): Object =>
  _.get(state, ['entities', 'files'], {})
export const getPullRequestFiles = createSelector(
  getFilesEntities, getPullRequestNormalized,
  (files, pr) => {
    if (!pr || !pr.files) {
      return []
    }
    return _.values(_.pick(files, pr.files))
  })

export const fileNameSelector = (state:Object, props:Object): string => props.fileName
export const getPullRequestFile = createSelector(
  getPullRequestFiles, fileNameSelector, getCommentsEntities, userEntitiesSelector,
  (files, fileName, commentEntities, userEntities) => {
    if (!files || !fileName) {
      return {}
    }
    const file = files.find(x => x.name === fileName)
    if (!file) {
      return {}
    }

    // Denormalization of inline comments
    return {
      ...file,
      comments: _.values(_.pick(commentEntities, file.comments))
      .map(comment => denormalizeCommentAuthor(comment, userEntities)),
    }
  })
