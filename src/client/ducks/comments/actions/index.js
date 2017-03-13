/* @flow */
import _ from 'lodash'
import { singleFetchActionCreator } from 'ducks/fetch'
import { APPEND_ENTITY } from 'ducks/entities'
import { comment } from 'ducks/schema'
import { NewCommentInput } from 'universal/types'
import editComment from 'ducks/comments/queries/editComment.graphql'
import createComment from 'ducks/comments/queries/createComment.graphql'

export const types = {
  FETCH_COMMENT_DELETE: 'COMMENTS/FETCH_COMMENT_DELETE',
  FETCH_COMMENT_EDIT: 'COMMENTS/FETCH_COMMENT_EDIT',
  FETCH_COMMENT_CREATE: 'COMMENTS/FETCH_COMMENT_CREATE',
}

export const editCommentNormalizer = (
  (response: Object) => {
    const modifiedComment = _.get(response, ['editComment', 'comment'], null)
    if (!modifiedComment) {
      return null
    }
    return {
      type: APPEND_ENTITY,
      object: modifiedComment,
      sourcePath: ['comments'],
      referencePaths: [],
      schema: comment,
    }
  }
)


export const fetchCommentEdit = (commentId: number, text: string) =>
  singleFetchActionCreator(types.FETCH_COMMENT_EDIT,
                           editComment,
                           { commentId, text },
                           '',
                           undefined,
                           editCommentNormalizer)


export const fetchCommentCreate = (commentInput: NewCommentInput, normalize: Function) =>
  singleFetchActionCreator(types.FETCH_COMMENT_CREATE,
                           createComment,
                           commentInput,
                           '',
                           undefined,
                           normalize)

