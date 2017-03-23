/* @flow */
import type { FetchAction } from 'ducks/fetch'
import { fetchAction } from 'ducks/fetch'


import updateCommentQuery from 'ducks/comments/mutations/updateComment.graphql'
import createCommentQuery from 'ducks/comments/mutations/createComment.graphql'
import deleteCommentQuery from 'ducks/comments/mutations/deleteComment.graphql'

export const types = {
  DELETE_COMMENT: 'COMMENTS/DELETE_COMMENT',
  UPDATE_COMMENT: 'COMMENTS/UPDATE_COMMENT',
  CREATE_COMMENT: 'COMMENTS/CREATE_COMMENT',
}

export const updateComment = (commentId: string, text:string): FetchAction =>
  fetchAction({ type: types.UPDATE_COMMENT, query: updateCommentQuery, variables: { commentId, text } })

export const createComment = (repoId: string, pullRequestId: string, text: string): FetchAction =>
  fetchAction({ type: types.CREATE_COMMENT, query: createCommentQuery, variables: { repoId, pullRequestId, text } })

export const deleteComment = (commentId: string): FetchAction =>
  fetchAction({ type: types.DELETE_COMMENT, query: deleteCommentQuery, variables: { commentId } })
