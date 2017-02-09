/* @flow */

import { types } from '../actions'
import { statusFetchFactory } from 'ducks/fetch/selectors'
import { createSelector } from 'reselect'
export type { StatusType } from 'ducks/fetch/selectors'
import { userEntitiesSelector } from 'ducks/users/selectors'

import _ from 'lodash'

const denormalizePullRequestUsers = (pullRequest: Object, userEntities: Object): Object => {
  if (!pullRequest || !pullRequest.owner || !pullRequest.reviews || !userEntities) {
    return pullRequest
  }
  return {
    ...pullRequest,
    owner: userEntities[pullRequest.owner],
    reviews: pullRequest.reviews.map(review => ({
      ...review,
      user: userEntities[review.user],
    })),
  }
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
export const getPullRequestNormlized = createSelector(
  getPullRequestsEntities, getPullRequestId,
  (entities: Object, id: string): Object =>
    (id ? entities[id] : {})
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
  getIssuesEntities, userEntitiesSelector, getPullRequestNormlized,
  (issueEntities, userEntities, pr) => {
    const prIssues = _.values(_.pick(issueEntities, pr.issues || []))
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
  getCommentsEntities, userEntitiesSelector, getPullRequestNormlized,
  (commentsEntities, userEntities, pr) => {
    const prComments = _.values(_.pick(commentsEntities, pr.comments || []))
    //  Denormalization of comment author
    return prComments.map(comment => denormalizeCommentAuthor(comment, userEntities))
  }
)

/**
 * Pull request files
 */
export const getPullRequestFiles = createSelector(
  getCommentsEntities, userEntitiesSelector, getPullRequestNormlized,
  (commentEntities, userEntities, pr) => {
    const files = pr.files || []
    if (!files) {
      return files
    }
    // Denormalization of inline comments
    const filesDenormalized = files.map(file => (
      {
        ...file,
        comments: _.values(_.pick(commentEntities, file.comments))
          .map(comment => denormalizeCommentAuthor(comment, userEntities)),
      }))

    return filesDenormalized
  })

