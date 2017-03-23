/* eslint-disable max-len */
import chai from 'chai'
import {
  types,
  fetchPullRequestData,
  fetchPullRequests,
  parsePullRequest,
  operationName,
  updatePullRequestDescription,
  addPullRequestReviewers,
  removePullRequestReviewers,
  fetchPullRequestReviews,
} from '../index'

import { types as fetchTypes } from 'ducks/fetch'
import { transformMutationResponse } from 'sagas/fetch'
import { RECEIVE_PAGE } from 'ducks/pagination'
import schema from 'ducks/schema'
import { normalize } from 'normalizr'
import { SET_QUERIED_ENTITIES, SET_MUTATED_ENTITIES } from 'ducks/entities'
import { DIRECTION } from 'ducks/order'
import pullRequestList from 'ducks/pullrequests/queries/pullRequestList.graphql'
import storeMock from 'tests/mocks/storeMock'
import fetchMock from 'fetch-mock'

import updateDescription from 'ducks/pullrequests/mutations/updateDescription.graphql'
import addReviewers from 'ducks/pullrequests/mutations/addReviewers.graphql'
import removeReviewers from 'ducks/pullrequests/mutations/removeReviewers.graphql'
import pullRequestReviews from 'ducks/pullrequests/queries/pullRequestReviews.graphql'

const expect = chai.expect

describe('pullrequests actions', () => {
  afterEach(() => fetchMock.restore())

  it('fetchPullRequestData success', (done) => {
    const id = 2
    const pr = {
      pullRequest: {
        id,
        name: 'testpr',
        title: 'test pr title',
        description: 'test pr description',
      },
    }

    const testQuery = 'djhfkjshfjk'
    const expectedActions = [
      { type: fetchTypes.FETCH_DATA, name: types.FETCH_PULL_REQUEST, variables: { id }, query: testQuery },
      { type: fetchTypes.CLEAR_ERROR, name: types.FETCH_PULL_REQUEST },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_PULL_REQUEST, sending: true },
      { type: SET_QUERIED_ENTITIES, entities: normalize(pr, schema).entities },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_PULL_REQUEST, sending: false },
    ]

    fetchMock.mock('*', {
      data: pr,
    })

    const store = storeMock({}, expectedActions, done)

    store.dispatch(fetchPullRequestData(types.FETCH_PULL_REQUEST, testQuery, { id }))
  })

  it('fetchPullRequestData failure', (done) => {
    const id = 2
    const error = new Error('some error')
    const testQuery = 'djhfkjshfjk'
    const expectedActions = [
      { type: fetchTypes.FETCH_DATA, name: types.FETCH_PULL_REQUEST, variables: { id }, query: testQuery },
      { type: fetchTypes.CLEAR_ERROR, name: types.FETCH_PULL_REQUEST },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_PULL_REQUEST, sending: true },
      { type: fetchTypes.REQUEST_ERROR, name: types.FETCH_PULL_REQUEST, error },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_PULL_REQUEST, sending: false },
    ]

    fetchMock.mock('*', { throws: error, status: 503 })

    const store = storeMock({}, expectedActions, done)

    store.dispatch(fetchPullRequestData(types.FETCH_PULL_REQUEST, testQuery, { id }))
  })

  it('fetchPullRequests success(default filters)', (done) => {
    const page = 1
    const pageSize = 10
    const orderBy = {
      direction: DIRECTION.ASC,
      field: '',
    }
    const total = 123
    const data = {
      repository: {
        pullRequests: {
          total,
          nodes: [{
            id: 1,
            name: 'testpr1',
            title: 'test pr title1',
            description: 'test pr description1',
          },
            {
              id: 2,
              name: 'testpr2',
              title: 'test pr title2',
              description: 'test pr description2',
            }],
        },
      },

    }

    const variables = { page, orderBy, pageSize }
    const expectedActions = [
      { type: fetchTypes.FETCH_DATA, name: types.FETCH_PULL_REQUESTS, variables, query: pullRequestList, operationName },
      { type: fetchTypes.CLEAR_ERROR, name: types.FETCH_PULL_REQUESTS },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_PULL_REQUESTS, sending: true },
      { type: SET_QUERIED_ENTITIES, entities: normalize(data, schema).entities },
      { type: RECEIVE_PAGE, namespace: operationName, nodes: data.repository.pullRequests.nodes, total, ...variables },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_PULL_REQUESTS, sending: false },
    ]

    fetchMock.mock('*', { data })

    const store = storeMock({}, expectedActions, done)

    store.dispatch(fetchPullRequests(variables))
  })

  it('fetchPullRequests success(with filters)', (done) => {
    const page = 1
    const pageSize = 10
    const repo = 'testrepo'
    const branch = 'default'
    const orderBy = {
      direction: DIRECTION.DESC,
      field: 'name',
    }
    const total = 123
    const data = {
      repository: {
        pullRequests: {
          total,
          nodes: [{
            id: 1,
            name: 'testpr1',
            title: 'test pr title1',
            description: 'test pr description1',
          },
            {
              id: 2,
              name: 'testpr2',
              title: 'test pr title2',
              description: 'test pr description2',
            }],
        },
      },

    }

    const variables = { page, orderBy, branch, repo, pageSize }
    const expectedActions = [
      { type: fetchTypes.FETCH_DATA, name: types.FETCH_PULL_REQUESTS, variables, query: pullRequestList, operationName },
      { type: fetchTypes.CLEAR_ERROR, name: types.FETCH_PULL_REQUESTS },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_PULL_REQUESTS, sending: true },
      { type: SET_QUERIED_ENTITIES, entities: normalize(data, schema).entities },
      { type: RECEIVE_PAGE, namespace: operationName, nodes: data.repository.pullRequests.nodes, total, ...variables },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_PULL_REQUESTS, sending: false },
    ]

    fetchMock.mock('*', { data })

    const store = storeMock({}, expectedActions, done)

    store.dispatch(fetchPullRequests(variables))
  })

  it('fetchPullRequests failure ', (done) => {
    const page = 1
    const pageSize = 10
    const repo = 'testrepo'
    const branch = 'default'
    const error = new Error('some error')
    const orderBy = {
      direction: DIRECTION.DESC,
      field: 'name',
    }

    const variables = { page, orderBy, branch, repo, pageSize }
    const expectedActions = [
      { type: fetchTypes.FETCH_DATA, name: types.FETCH_PULL_REQUESTS, variables, query: pullRequestList, operationName },
      { type: fetchTypes.CLEAR_ERROR, name: types.FETCH_PULL_REQUESTS },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_PULL_REQUESTS, sending: true },
      { type: fetchTypes.REQUEST_ERROR, name: types.FETCH_PULL_REQUESTS, error },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_PULL_REQUESTS, sending: false },
    ]

    fetchMock.mock('*', { throws: error, status: 503 })

    const store = storeMock({}, expectedActions, done)

    store.dispatch(fetchPullRequests(variables))
  })

  it('updatePullRequestDescription success', (done) => {
    const id = 1
    const description = 'test description'

    const data = {
      editPullRequest: {
        pullRequest: {
          1: {
            id: 1,
            description,
          },
        },
      },
    }

    const variables = { id, description }
    const transformedData = transformMutationResponse(data)
    const expectedActions = [
      { type: fetchTypes.FETCH_DATA, name: types.UPDATE_PULL_REQUEST_DESCRIPTION, variables, query: updateDescription },
      { type: fetchTypes.CLEAR_ERROR, name: types.UPDATE_PULL_REQUEST_DESCRIPTION },
      { type: fetchTypes.SENDING_REQUEST, name: types.UPDATE_PULL_REQUEST_DESCRIPTION, sending: true },
      { type: SET_MUTATED_ENTITIES, entities: normalize(transformedData, schema).entities },
      { type: fetchTypes.SENDING_REQUEST, name: types.UPDATE_PULL_REQUEST_DESCRIPTION, sending: false },
    ]

    fetchMock.mock('*', { data })

    const store = storeMock({}, expectedActions, done)

    store.dispatch(updatePullRequestDescription(id, description))
  })

  it('updatePullRequestDescription failure', (done) => {
    const id = 1
    const description = 'test description'
    const error = new Error('some error')

    const variables = { id, description }

    const expectedActions = [
      { type: fetchTypes.FETCH_DATA, name: types.UPDATE_PULL_REQUEST_DESCRIPTION, variables, query: updateDescription },
      { type: fetchTypes.CLEAR_ERROR, name: types.UPDATE_PULL_REQUEST_DESCRIPTION },
      { type: fetchTypes.SENDING_REQUEST, name: types.UPDATE_PULL_REQUEST_DESCRIPTION, sending: true },
      { type: fetchTypes.REQUEST_ERROR, name: types.UPDATE_PULL_REQUEST_DESCRIPTION, error },
      { type: fetchTypes.SENDING_REQUEST, name: types.UPDATE_PULL_REQUEST_DESCRIPTION, sending: false },
    ]

    fetchMock.mock('*', { throws: error, status: 503 })

    const store = storeMock({}, expectedActions, done)

    store.dispatch(updatePullRequestDescription(id, description))
  })

  it('addPullRequestReviewers success', (done) => {
    const pullRequestId = 1
    const reviewers = [{ id: 1 }, { id: 2 }]

    const data = {
      editPullRequest: {
        pullRequest: {
          1: {
            id: 1,
            reviewers: [{ id: 1 }, { id: 2 }],
          },
        },
      },
    }

    const variables = { pullRequestId, reviewers }
    const transformedData = transformMutationResponse(data)
    const expectedActions = [
      { type: fetchTypes.FETCH_DATA, name: types.UPDATE_PULL_REQUEST_REVIEWERS, variables, query: addReviewers },
      { type: fetchTypes.CLEAR_ERROR, name: types.UPDATE_PULL_REQUEST_REVIEWERS },
      { type: fetchTypes.SENDING_REQUEST, name: types.UPDATE_PULL_REQUEST_REVIEWERS, sending: true },
      { type: SET_MUTATED_ENTITIES, entities: normalize(transformedData, schema).entities },
      { type: fetchTypes.SENDING_REQUEST, name: types.UPDATE_PULL_REQUEST_REVIEWERS, sending: false },
    ]

    fetchMock.mock('*', { data })

    const store = storeMock({}, expectedActions, done)

    store.dispatch(addPullRequestReviewers(pullRequestId, reviewers))
  })

  it('addPullRequestReviewers failure', (done) => {
    const pullRequestId = 1
    const reviewers = [{ id: 1 }, { id: 2 }]
    const error = new Error('some error')

    const variables = { pullRequestId, reviewers }

    const expectedActions = [
      { type: fetchTypes.FETCH_DATA, name: types.UPDATE_PULL_REQUEST_REVIEWERS, variables, query: addReviewers },
      { type: fetchTypes.CLEAR_ERROR, name: types.UPDATE_PULL_REQUEST_REVIEWERS },
      { type: fetchTypes.SENDING_REQUEST, name: types.UPDATE_PULL_REQUEST_REVIEWERS, sending: true },
      { type: fetchTypes.REQUEST_ERROR, name: types.UPDATE_PULL_REQUEST_REVIEWERS, error },
      { type: fetchTypes.SENDING_REQUEST, name: types.UPDATE_PULL_REQUEST_REVIEWERS, sending: false },
    ]

    fetchMock.mock('*', { throws: error, status: 503 })

    const store = storeMock({}, expectedActions, done)

    store.dispatch(addPullRequestReviewers(pullRequestId, reviewers))
  })

  it('removePullRequestReviewers success', (done) => {
    const pullRequestId = 1
    const reviewers = [{ id: 1 }, { id: 2 }]

    const data = {
      editPullRequest: {
        pullRequest: {
          1: {
            id: 1,
            reviewers: [{ id: 3 }],
          },
        },
      },
    }

    const variables = { pullRequestId, reviewers }
    const transformedData = transformMutationResponse(data)
    const expectedActions = [
      { type: fetchTypes.FETCH_DATA, name: types.DELETE_PULL_REQUEST_REVIEWERS, variables, query: removeReviewers },
      { type: fetchTypes.CLEAR_ERROR, name: types.DELETE_PULL_REQUEST_REVIEWERS },
      { type: fetchTypes.SENDING_REQUEST, name: types.DELETE_PULL_REQUEST_REVIEWERS, sending: true },
      { type: SET_MUTATED_ENTITIES, entities: normalize(transformedData, schema).entities },
      { type: fetchTypes.SENDING_REQUEST, name: types.DELETE_PULL_REQUEST_REVIEWERS, sending: false },
    ]

    fetchMock.mock('*', { data })

    const store = storeMock({}, expectedActions, done)

    store.dispatch(removePullRequestReviewers(pullRequestId, reviewers))
  })

  it('removePullRequestReviewers failure', (done) => {
    const pullRequestId = 1
    const reviewers = [{ id: 1 }, { id: 2 }]
    const error = new Error('some error')

    const variables = { pullRequestId, reviewers }

    const expectedActions = [
      { type: fetchTypes.FETCH_DATA, name: types.DELETE_PULL_REQUEST_REVIEWERS, variables, query: removeReviewers },
      { type: fetchTypes.CLEAR_ERROR, name: types.DELETE_PULL_REQUEST_REVIEWERS },
      { type: fetchTypes.SENDING_REQUEST, name: types.DELETE_PULL_REQUEST_REVIEWERS, sending: true },
      { type: fetchTypes.REQUEST_ERROR, name: types.DELETE_PULL_REQUEST_REVIEWERS, error },
      { type: fetchTypes.SENDING_REQUEST, name: types.DELETE_PULL_REQUEST_REVIEWERS, sending: false },
    ]

    fetchMock.mock('*', { throws: error, status: 503 })

    const store = storeMock({}, expectedActions, done)

    store.dispatch(removePullRequestReviewers(pullRequestId, reviewers))
  })

  it('fetchPullRequestReviews success', (done) => {
    const id = 2
    const pr = {
      pullRequest: {
        id,
        reviews: [
          {
            name: 'testpr',
            title: 'test pr title',
            description: 'test pr description',
          },
        ],
      },
    }

    const expectedActions = [
      { type: fetchTypes.FETCH_DATA, name: types.FETCH_PULL_REQUEST_REVIEWS, variables: { id }, query: pullRequestReviews },
      { type: fetchTypes.CLEAR_ERROR, name: types.FETCH_PULL_REQUEST_REVIEWS },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_PULL_REQUEST_REVIEWS, sending: true },
      { type: SET_QUERIED_ENTITIES, entities: normalize(pr, schema).entities },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_PULL_REQUEST_REVIEWS, sending: false },
    ]

    fetchMock.mock('*', {
      data: pr,
    })

    const store = storeMock({}, expectedActions, done)

    store.dispatch(fetchPullRequestReviews(id))
  })

  it('fetchPullRequestReviews failure', (done) => {
    const id = 2
    const error = new Error('some error')
    const expectedActions = [
      { type: fetchTypes.FETCH_DATA, name: types.FETCH_PULL_REQUEST_REVIEWS, variables: { id }, query: pullRequestReviews },
      { type: fetchTypes.CLEAR_ERROR, name: types.FETCH_PULL_REQUEST_REVIEWS },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_PULL_REQUEST_REVIEWS, sending: true },
      { type: fetchTypes.REQUEST_ERROR, name: types.FETCH_PULL_REQUEST_REVIEWS, error },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_PULL_REQUEST_REVIEWS, sending: false },
    ]

    fetchMock.mock('*', { throws: error, status: 503 })

    const store = storeMock({}, expectedActions, done)


    store.dispatch(fetchPullRequestReviews(id))
  })
})


describe('parse pullRequest response', () => {
  it('pullRequestQuery parses response', () => {
    const pullRequest = { id: 1, title: 'sdfas' }
    const response = { data: { pullRequest } }
    expect(parsePullRequest(response)).to.eql(pullRequest)
  })
})

