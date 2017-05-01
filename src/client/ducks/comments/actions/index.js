/* @flow */
import type { FetchAction } from 'ducks/fetch'
import { fetchOnoAction } from 'ducks/fetch'


import updateCommentQuery from 'ducks/comments/mutations/updateComment.graphql'
import createCommentQuery from 'ducks/comments/mutations/createComment.graphql'
import deleteCommentQuery from 'ducks/comments/mutations/deleteComment.graphql'

export const types = {
  DELETE_COMMENT: 'COMMENTS/DELETE_COMMENT',
  UPDATE_COMMENT: 'COMMENTS/UPDATE_COMMENT',
  CREATE_COMMENT: 'COMMENTS/CREATE_COMMENT',
}

type RepositorySelectorType = {
  id?: string,
  name?: string,
}

export const updateComment = (commentId: string, text:string): FetchAction =>
  fetchOnoAction({ type: types.UPDATE_COMMENT, query: updateCommentQuery, variables: { commentId, text } })

export const createComment = (repository: RepositorySelectorType, pullRequestId: string, text: string): FetchAction =>
  fetchOnoAction({ type: types.CREATE_COMMENT, query: createCommentQuery, variables: { repository, pullRequestId, text } })

export const deleteComment = (commentId: string): FetchAction =>
  fetchOnoAction({ type: types.DELETE_COMMENT, query: deleteCommentQuery, variables: { commentId } })
