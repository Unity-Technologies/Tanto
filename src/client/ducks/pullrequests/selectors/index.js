/* @flow */

import { types } from '../actions'
import { statusFetchFactory } from 'ducks/fetch/selectors'
import { createSelector } from 'reselect'
export type { StatusType } from 'ducks/fetch/selectors'
import { userEntitiesSelector } from 'ducks/users/selectors'
import { parseMercurialAuthor } from 'ducks/repositories/selectors'

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
  (entities: Object, id: string): Object => (id ? entities[id] || {} : {})
)

// Sometimes we don't need Denormalization of users, when we need just issues or comments
export const getPullRequestDescription = createSelector(
  getPullRequestNormalized, userEntitiesSelector,
  (pr: Object, users: string): Object => ({
    text: pr.description,
    author: users[pr.owner],
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
  getCommentsEntities, userEntitiesSelector, getIssuesEntities, getPullRequestNormalized,
  (commentsEntities, userEntities, issues, pr) => {
    const prComments = _.values(_.pick(commentsEntities, _.get(pr, ['comments'], [])))
    //  Denormalization of comment author
    return prComments.map(comment => ({
      ...denormalizeCommentAuthor(comment, userEntities),
      issue: comment.issue ? issues[comment.issue] : comment.issue,
    }))
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


export const getFile = (state: Object, props: Object) => (props.id && state.entities.files ? state.entities.files[props.id] : null)

export const getFileComments = createSelector(
  getFile, getCommentsEntities, userEntitiesSelector,
  (file, commentEntities, userEntities) => {
    // Denormalization of inline comments
    const comments = file ? _.values(_.pick(commentEntities, file.comments))
      .map(comment => denormalizeCommentAuthor(comment, userEntities)) : []
    const reduced = _.reduce(comments, (result, value, key) => {
      if (value.location) {
        (result[value.location.lineNumber] || (result[value.location.lineNumber] = [])).push(value) //eslint-disable-line
      }
      return result
    }, {})

    return reduced
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
      authorUser: users && ch.authorUser && ch.authorUser in users ? users[ch.authorUser] : parseMercurialAuthor(ch.author),
    }))
  }
)

export const getPullRequestIterations = createSelector(
  getPullRequest, getPullRequestsEntities,
  (pr, entities) => {
    if (!pr || !pr.iterations) {
      return null
    }

    const prs = entities ? _.values(_.pick(entities, _.filter(pr.iterations, p => p !== pr.id))) : null
    if (!prs) {
      return null
    }

    return prs.map(p => ({
      id: p.id,
      title: p.title,
      repositoryName: p.origin.repository.fullName,
    }))
  }
)

// export const getPullRequestIterations = createSelector(
//   getPullRequest, getPullRequestsEntities,
//   (pr, entities) => (pr && pr.iterations ? pr.iterations : null)
// )
