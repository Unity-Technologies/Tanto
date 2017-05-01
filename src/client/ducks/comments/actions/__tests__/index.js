// import chai from 'chai'
/* eslint-disable */

import schema from 'ducks/schema'
import { normalize } from 'normalizr'
import { SET_MUTATED_ENTITIES } from 'ducks/entities'
import { types, updateComment, createComment, deleteComment, createInlineComment, deleteInlineComment } from 'ducks/comments/actions'
import { types as fetchTypes } from 'ducks/fetch'
import { transformMutationResponse } from 'sagas/fetch'
import storeMock from 'tests/mocks/storeMock'
import fetchMock from 'fetch-mock'

import updateCommentQuery from 'ducks/comments/mutations/updateComment.graphql'
import createCommentQuery from 'ducks/comments/mutations/createComment.graphql'
import deleteCommentQuery from 'ducks/comments/mutations/deleteComment.graphql'


import createInlineCommentQuery from 'ducks/comments/mutations/createInlineComment.graphql'
import deleteInlineCommentQuery from 'ducks/comments/mutations/deleteInlineComment.graphql'


describe('actions', () => {
  afterEach(() => fetchMock.restore())

  it('updateComment success', (done) => {
    const commentId = 156
    const text = 'NEW COMMENT TEXT'
    const data = {
      editComment: {
        ok: true,
        comment: {
          id: 156,
          text,
        },
        pullRequest: {
          id: 322,
          title: 'test chamngeset pr',
          comments: [
            {
              id: 156,
              text,
            },
            {
              id: 152,
              text: 'test\n',
            },

          ],
        },
      },

    }
    const transformedData = transformMutationResponse(data)
    const expectedActions = [
      { type: fetchTypes.FETCH_ONO_DATA, name: types.UPDATE_COMMENT, variables: { commentId, text }, query: updateCommentQuery },
      { type: fetchTypes.CLEAR_ERROR, name: types.UPDATE_COMMENT },
      { type: fetchTypes.SENDING_REQUEST, name: types.UPDATE_COMMENT, sending: true },
      { type: SET_MUTATED_ENTITIES, entities: normalize(transformedData, schema).entities },
      { type: fetchTypes.SENDING_REQUEST, name: types.UPDATE_COMMENT, sending: false },
    ]

    fetchMock.mock('*', {
      data,
    })

    const store = storeMock({}, expectedActions, done)

    store.dispatch(updateComment(commentId, text))
  })

  it('updateComment failure', (done) => {
    const commentId = 156
    const text = 'NEW COMMENT TEXT'

    const error = new Error('some error')

    const expectedActions = [
      { type: fetchTypes.FETCH_ONO_DATA, name: types.UPDATE_COMMENT, variables: { commentId, text }, query: updateCommentQuery },
      { type: fetchTypes.CLEAR_ERROR, name: types.UPDATE_COMMENT },
      { type: fetchTypes.SENDING_REQUEST, name: types.UPDATE_COMMENT, sending: true },
      { type: fetchTypes.REQUEST_ERROR, name: types.UPDATE_COMMENT, error },
      { type: fetchTypes.SENDING_REQUEST, name: types.UPDATE_COMMENT, sending: false },
    ]

    fetchMock.mock('*', { throws: error, status: 503 })

    const store = storeMock({}, expectedActions, done)

    store.dispatch(updateComment(commentId, text))
  })

  it('createComment success', (done) => {
    const repository = { name: 'reponame2' }
    const pullRequestId = 3
    const text = 'NEW COMMENT TEXT'
    const data = {
      createComment: {
        ok: true,
        comment: {
          id: 156,
          text,
        },
        pullRequest: {
          id: 322,
          title: 'test chamngeset pr',
          comments: [
            {
              id: 156,
              text,
            },
            {
              id: 152,
              text: 'test\n',
            },

          ],
        },
      },

    }
    const transformedData = transformMutationResponse(data)
    const expectedActions = [
      { type: fetchTypes.FETCH_ONO_DATA, name: types.CREATE_COMMENT, variables: { text, repository, pullRequestId }, query: createCommentQuery },
      { type: fetchTypes.CLEAR_ERROR, name: types.CREATE_COMMENT },
      { type: fetchTypes.SENDING_REQUEST, name: types.CREATE_COMMENT, sending: true },
      { type: SET_MUTATED_ENTITIES, entities: normalize(transformedData, schema).entities },
      { type: fetchTypes.SENDING_REQUEST, name: types.CREATE_COMMENT, sending: false },
    ]

    fetchMock.mock('*', {
      data,
    })

    const store = storeMock({}, expectedActions, done)

    store.dispatch(createComment(repository, pullRequestId, text))
  })

  it('createComment failure', (done) => {
    const text = 'NEW COMMENT TEXT'
    const repository = { name: 'reponame2' }
    const pullRequestId = 3

    const error = new Error('some error')

    const expectedActions = [
      { type: fetchTypes.FETCH_ONO_DATA, name: types.CREATE_COMMENT, variables: { text, repository, pullRequestId }, query: createCommentQuery },
      { type: fetchTypes.CLEAR_ERROR, name: types.CREATE_COMMENT },
      { type: fetchTypes.SENDING_REQUEST, name: types.CREATE_COMMENT, sending: true },
      { type: fetchTypes.REQUEST_ERROR, name: types.CREATE_COMMENT, error },
      { type: fetchTypes.SENDING_REQUEST, name: types.CREATE_COMMENT, sending: false },
    ]

    fetchMock.mock('*', { throws: error, status: 503 })

    const store = storeMock({}, expectedActions, done)

    store.dispatch(createComment(repository, pullRequestId, text))
  })

  it('deleteComment success', (done) => {
    const commentId = 156
    const data = {
      deleteComment: {
        ok: true,
        comment: {
          id: 156,
          text: 'text',
        },
        pullRequest: {
          id: 322,
          title: 'test chamngeset pr',
          comments: [
            {
              id: 152,
              text: 'test\n',
            },

          ],
        },
      },

    }
    const transformedData = transformMutationResponse(data)
    const expectedActions = [
      { type: fetchTypes.FETCH_ONO_DATA, name: types.DELETE_COMMENT, variables: { commentId }, query: deleteCommentQuery },
      { type: fetchTypes.CLEAR_ERROR, name: types.DELETE_COMMENT },
      { type: fetchTypes.SENDING_REQUEST, name: types.DELETE_COMMENT, sending: true },
      { type: SET_MUTATED_ENTITIES, entities: normalize(transformedData, schema).entities },
      { type: fetchTypes.SENDING_REQUEST, name: types.DELETE_COMMENT, sending: false },
    ]

    fetchMock.mock('*', {
      data,
    })

    const store = storeMock({}, expectedActions, done)

    store.dispatch(deleteComment(commentId))
  })

  it('deleteComment failure', (done) => {
    const commentId = 156

    const error = new Error('some error')

    const expectedActions = [
      { type: fetchTypes.FETCH_ONO_DATA, name: types.DELETE_COMMENT, variables: { commentId }, query: deleteCommentQuery },
      { type: fetchTypes.CLEAR_ERROR, name: types.DELETE_COMMENT },
      { type: fetchTypes.SENDING_REQUEST, name: types.DELETE_COMMENT, sending: true },
      { type: fetchTypes.REQUEST_ERROR, name: types.DELETE_COMMENT, error },
      { type: fetchTypes.SENDING_REQUEST, name: types.DELETE_COMMENT, sending: false },
    ]

    fetchMock.mock('*', { throws: error, status: 503 })

    const store = storeMock({}, expectedActions, done)

    store.dispatch(deleteComment(commentId))
  })

  it('createInlineComment success', (done) => {
    const repoName = 'reponame2'
    const pullRequestId = 3
    const text = 'NEW COMMENT TEXT'
    const data = {
      createComment: {
        ok: true,
        comment: {
          id: 156,
          text,
        },
        pullRequest: {
          id: 322,
          title: 'test chamngeset pr',
          comments: [
            {
              id: 156,
              text,
            },
            {
              id: 152,
              text: 'test\n',
            },

          ],
        },
      },
    }
    const filePath = "testFilePath"
    const lineNumber = "n12"
    const transformedData = transformMutationResponse(data)
    const expectedActions = [
      { type: fetchTypes.FETCH_ONO_DATA, name: types.CREATE_INLINE_COMMENT, variables: { repoName, pullRequestId, text, lineNumber, filePath }, query: createInlineCommentQuery },
      { type: fetchTypes.CLEAR_ERROR, name: types.CREATE_INLINE_COMMENT },
      { type: fetchTypes.SENDING_REQUEST, name: types.CREATE_INLINE_COMMENT, sending: true },
      { type: SET_MUTATED_ENTITIES, entities: normalize(transformedData, schema).entities },
      { type: fetchTypes.SENDING_REQUEST, name: types.CREATE_INLINE_COMMENT, sending: false },
    ]

    fetchMock.mock('*', {
      data,
    })

    const store = storeMock({}, expectedActions, done)

    store.dispatch(createInlineComment(repoName, pullRequestId, filePath, lineNumber, text))
  })

  it('createInlineComment failure', (done) => {
    const text = 'NEW COMMENT TEXT'
    const repoName = 'reponame2'
    const pullRequestId = 3
    const filePath = "testFilePath"
    const lineNumber = "n12"
    const error = new Error('some error')

    const expectedActions = [
      { type: fetchTypes.FETCH_ONO_DATA, name: types.CREATE_INLINE_COMMENT, variables: { repoName, pullRequestId, text, lineNumber, filePath }, query: createInlineCommentQuery },
      { type: fetchTypes.CLEAR_ERROR, name: types.CREATE_INLINE_COMMENT },
      { type: fetchTypes.SENDING_REQUEST, name: types.CREATE_INLINE_COMMENT, sending: true },
      { type: fetchTypes.REQUEST_ERROR, name: types.CREATE_INLINE_COMMENT, error },
      { type: fetchTypes.SENDING_REQUEST, name: types.CREATE_INLINE_COMMENT, sending: false },
    ]

    fetchMock.mock('*', { throws: error, status: 503 })

    const store = storeMock({}, expectedActions, done)

    store.dispatch(createInlineComment(repoName, pullRequestId, filePath, lineNumber, text))
  })

  it('deleteInlineComment success', (done) => {
    const commentId = 156
    const data = {
      deleteComment: {
        ok: true,
        comment: {
          id: 156,
          text: 'text',
        },
        pullRequest: {
          id: 322,
          title: 'test chamngeset pr',
          comments: [
            {
              id: 152,
              text: 'test\n',
            },

          ],
        },
      },

    }
    const filePath = "test/file/path"
    const transformedData = transformMutationResponse(data)
    const expectedActions = [
      { type: fetchTypes.FETCH_ONO_DATA, name: types.DELETE_INLINE_COMMENT, variables: { commentId, filePath }, query: deleteInlineCommentQuery },
      { type: fetchTypes.CLEAR_ERROR, name: types.DELETE_INLINE_COMMENT },
      { type: fetchTypes.SENDING_REQUEST, name: types.DELETE_INLINE_COMMENT, sending: true },
      { type: SET_MUTATED_ENTITIES, entities: normalize(transformedData, schema).entities },
      { type: fetchTypes.SENDING_REQUEST, name: types.DELETE_INLINE_COMMENT, sending: false },
    ]

    fetchMock.mock('*', {
      data,
    })

    const store = storeMock({}, expectedActions, done)

    store.dispatch(deleteInlineComment(commentId, filePath))
  })

  it('deleteInlineComment failure', (done) => {
    const commentId = 156
    const filePath = "test/file/path"
    const error = new Error('some error')

    const expectedActions = [
      { type: fetchTypes.FETCH_ONO_DATA, name: types.DELETE_INLINE_COMMENT, variables: { commentId, filePath }, query: deleteInlineCommentQuery },
      { type: fetchTypes.CLEAR_ERROR, name: types.DELETE_INLINE_COMMENT },
      { type: fetchTypes.SENDING_REQUEST, name: types.DELETE_INLINE_COMMENT, sending: true },
      { type: fetchTypes.REQUEST_ERROR, name: types.DELETE_INLINE_COMMENT, error },
      { type: fetchTypes.SENDING_REQUEST, name: types.DELETE_INLINE_COMMENT, sending: false },
    ]

    fetchMock.mock('*', { throws: error, status: 503 })

    const store = storeMock({}, expectedActions, done)

    store.dispatch(deleteInlineComment(commentId, filePath))
  })
})

