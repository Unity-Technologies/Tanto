/* @flow */
import type { FetchAction } from 'ducks/fetch'
import { fetchOnoAction } from 'ducks/fetch'
import { ChangesetStatus } from 'universal/constants'

import updateCommentQuery from 'ducks/comments/mutations/updateComment.graphql'
import createCommentQuery from 'ducks/comments/mutations/createComment.graphql'
import deleteCommentQuery from 'ducks/comments/mutations/deleteComment.graphql'

import createInlineCommentQuery from 'ducks/comments/mutations/createInlineComment.graphql'
import deleteInlineCommentQuery from 'ducks/comments/mutations/deleteInlineComment.graphql'

export const types = {
  DELETE_COMMENT: 'COMMENTS/DELETE_COMMENT',
  UPDATE_COMMENT: 'COMMENTS/UPDATE_COMMENT',
  CREATE_COMMENT: 'COMMENTS/CREATE_COMMENT',

  CREATE_INLINE_COMMENT: 'COMMENTS/CREATE_INLINE_COMMENT',
  DELETE_INLINE_COMMENT: 'COMMENTS/DELETE_INLINE_COMMENT',

  CREATE_CHANGESET_COMMENT: 'COMMENTS/CREATE_CHANGESET_COMMENT',
  DELETE_CHANGESET_COMMENT: 'COMMENTS/DELETE_CHANGESET_COMMENT',

  CREATE_CHANGESET_INLINE_COMMENT: 'COMMENTS/CREATE_CHANGESET_INLINE_COMMENT',
  DELETE_CHANGESET_INLINE_COMMENT: 'COMMENTS/DELETE_CHANGESET_INLINE_COMMENT',
}

/*
   Pull requests general comments actions
*/
type RepositorySelectorType = {
  id?: string,
  name?: string,
}

export const updateComment = (commentId: string, text:string): FetchAction =>
  fetchOnoAction({ type: types.UPDATE_COMMENT, query: updateCommentQuery, variables: { commentId, text } })

export const createComment =
  (repository: RepositorySelectorType, pullRequestId: string, text: string, status?: typeof ChangesetStatus, issue?: string):
    FetchAction => {
    const variables = { repository, pullRequestId, text, issue }
    if (status && status !== ChangesetStatus.NONE) {
      variables.status = status
    }
    return fetchOnoAction({ type: types.CREATE_COMMENT, query: createCommentQuery, variables })
  }

export const deleteComment = (commentId: string): FetchAction =>
  fetchOnoAction({ type: types.DELETE_COMMENT, query: deleteCommentQuery, variables: { commentId } })

/*
   Pull requests inline comments actions
*/
export const createInlineComment =
(repoName: string, pullRequestId: string, filePath: string, lineNumber: string, text: string): FetchAction =>
  fetchOnoAction({
    type: types.CREATE_INLINE_COMMENT,
    query: createInlineCommentQuery,
    variables: { repoName, pullRequestId, text, lineNumber, filePath } })

export const deleteInlineComment =
(commentId: string, filePath: string): FetchAction =>
  fetchOnoAction({
    type: types.DELETE_INLINE_COMMENT,
    query: deleteInlineCommentQuery,
    variables: { commentId, filePath } })
