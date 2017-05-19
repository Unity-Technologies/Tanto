/* @flow */
/* eslint-disable no-param-reassign */

import { types } from '../actions'
import { statusFetchFactory } from 'ducks/fetch/selectors'
import { createSelector } from 'reselect'
export type { StatusType } from 'ducks/fetch/selectors'
import { userEntitiesSelector } from 'ducks/users/selectors'
import { parseMercurialAuthor } from 'ducks/repositories/selectors'
import _ from 'lodash'
import { getEntityById } from 'ducks/selectors'


export const denormalizePullRequestUsers = (pullRequest: any, userEntities: Object): Object => {
  if (!pullRequest) {
    return pullRequest
  }

  const denormalizedPullRequest = Object.assign({}, pullRequest)

  if (pullRequest.owner) {
    denormalizedPullRequest.owner = getEntityById(userEntities, pullRequest.owner)
  }

  if (pullRequest.reviews) {
    denormalizedPullRequest.reviews = pullRequest.reviews.map(review => ({
      ...review,
      user: getEntityById(userEntities, review.user),
    }))
  }
  return denormalizedPullRequest
}

export const denormalizeCommentAuthor = (comment: Object, userEntities: Object): Object => ({
  ...comment,
  author: getEntityById(userEntities, comment.author),
})

/**
 * Pull request selectors
 */
export const getPullRequestsEntities = (state: Object): Object =>
  _.get(state, ['entities', 'pullRequests'], null)

export const getPullRequestId = (state: Object, props: Object): string =>
  (props.params ? props.params.prid : props.pullRequestId || props.id)

export const getPageFetchStatus = statusFetchFactory(types.FETCH_PULL_REQUESTS)

export const getPullRequest = createSelector(
  getPullRequestsEntities, userEntitiesSelector, getPullRequestId,
  (entities: Object, userEntities: Object, id: string) => {
    if (!entities || !id) {
      return null
    }

    return denormalizePullRequestUsers(getEntityById(entities, id), userEntities)
  })

// Sometimes we don't need Denormalization of users, when we need just issues or comments
export const getPullRequestNormalized = createSelector(
  getPullRequestsEntities, getPullRequestId,
  (entities: Object, id: string) => getEntityById(entities, id)
)

// Sometimes we don't need Denormalization of users, when we need just issues or comments
export const getPullRequestDescription = createSelector(
  getPullRequestNormalized, userEntitiesSelector,
  (pr: Object, users: Object): Object => ({
    text: pr.description,
    author: getEntityById(users, pr.owner),
    created: pr.created,
  })
)

export const getPullRequestRepoId = createSelector(
  getPullRequestNormalized,
  (pr: Object) => (pr && pr.origin && pr.origin.repository ? pr.origin.repository.id : null)
)
/**
 * Pull request page selectors
 */
export const pullRequestsPageIdsSelector =
  // $FlowFixMe
  (state: Object, props: Object): Array<Number> => {
    const pullRequestsPagingSettings = _.get(state, ['session', 'pullRequests', 'pagination'], null)
    if (!pullRequestsPagingSettings) {
      return null
    }
    const { pages, currentPage } = pullRequestsPagingSettings
    return pages && currentPage > -1 ? pages[currentPage] : null
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
  _.get(state, ['entities', 'issues'], null)

export const getPullRequestIssues = createSelector(
  getIssuesEntities, userEntitiesSelector, getPullRequestNormalized,
  (issueEntities, userEntities, pr) => {
    if (!pr || !issueEntities || !pr.issues) {
      return null
    }
    const prIssues = _.values(_.pick(issueEntities, pr.issues))

    return prIssues.map(issue => ({
      ...issue,
      owner: getEntityById(userEntities, issue.owner),
      assignee: getEntityById(userEntities, issue.assignee),
    }))
  }
)

/**
 * Pull request  comments
 */
export const getCommentsEntities = (state: Object) =>
  _.get(state, ['entities', 'comments'], null)

export const getPullRequestGeneralComments = createSelector(
  getCommentsEntities, userEntitiesSelector, getIssuesEntities, getPullRequestNormalized,
  (commentsEntities, userEntities, issues, pr) => {
    if (!commentsEntities || !pr || !pr.comments) {
      return null
    }
    const prComments = _.values(_.pick(commentsEntities, pr.comments))

    return prComments.map(comment => ({
      ...denormalizeCommentAuthor(comment, userEntities),
      issue: getEntityById(issues, comment.issue),
    }))
  }
)

/**
 * Pull request files
 */
export const getFilesEntities = (state: Object): Object =>
  _.get(state, ['entities', 'files'], null)
export const getPullRequestFiles = createSelector(
  getFilesEntities, getPullRequestNormalized,
  (files, pr) => {
    if (!files || !pr || !pr.files) {
      return null
    }
    return _.values(_.pick(files, pr.files))
  })


export const getFile = (state: Object, props: Object) =>
  (props.id && state.entities.files ? state.entities.files[props.id] : null)

export const getFileComments = createSelector(
  getFile, getCommentsEntities, userEntitiesSelector,
  (file, commentEntities, userEntities) => {
    if (!file || !commentEntities || !file.comments) {
      return null
    }
    const comments = _.values(_.pick(commentEntities, file.comments))
      .map(comment => denormalizeCommentAuthor(comment, userEntities))
    return _.reduce(comments, (result, value, key) => {
      if (value.location) {
        (result[value.location.lineNumber] || (result[value.location.lineNumber] = [])).push(value) //eslint-disable-line
      }
      return result
    }, {})
  })

export const getChangesetsEntities = (state: Object, props: Object) => state.entities.changesets
export const getPullRequestChangeset = createSelector(
  getPullRequestNormalized, getChangesetsEntities, userEntitiesSelector,
  (pullRequest, changesets, users) => {
    if (!pullRequest || !pullRequest.changeset || !changesets) {
      return null
    }
    const changeset = _.values(_.pick(changesets, pullRequest.changeset))
    return changeset.map(ch => ({
      ...ch,
      authorUser: getEntityById(users, ch.authorUser, () => parseMercurialAuthor(ch.author)),
    }))
  }
)

export const getPullRequestIterations = createSelector(
  getPullRequest, getPullRequestsEntities,
  (pr, entities) => {
    if (!pr || !pr.iterations || !entities) {
      return null
    }

    const prs = _.values(_.pick(entities, _.filter(pr.iterations, p => p !== pr.id)))
    if (!prs) {
      return null
    }

    return prs.map(p => ({
      id: p.id,
      title: p.title,
      repositoryName: p && p.origin ? p.origin.repository.fullName : null,
    }))
  }
)
