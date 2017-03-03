/* @flow */
import { singleFetchActionCreator } from 'ducks/fetch'
import { NewCommentInput, IssueInput, LocationInput } from 'universal/types'
import editComment from 'ducks/comments/queries/editComment.graphql'
import createComment from 'ducks/comments/queries/createComment.graphql'

export const types = {
  FETCH_COMMENT_DELETE: 'COMMENTS/FETCH_COMMENT_DELETE',
  FETCH_COMMENT_EDIT: 'COMMENTS/FETCH_COMMENT_EDIT',
  FETCH_COMMENT_CREATE: 'COMMENTS/FETCH_COMMENT_CREATE',
}


export const fetchCommentEdit = (commentId: number, text: string) =>
  singleFetchActionCreator(types.FETCH_COMMENT_EDIT,
                           editComment,
                           { commentId, text },
                           '',
                           null)


export const fetchCommentCreate =
  (commentInput: NewCommentInput,
   normalize: Function) => {
     const action = singleFetchActionCreator(types.FETCH_COMMENT_CREATE,
                                             createComment,
                                             commentInput,
                                             '',
                                             null,
                                             normalize)
     console.log(action)
     return action
   }
