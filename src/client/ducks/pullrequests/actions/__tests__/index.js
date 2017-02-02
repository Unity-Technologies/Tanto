/* eslint-disable max-len */
import chai from 'chai'
import {
  types,
  fetchPullRequestData,
  fetchPullRequests,
  parsePullRequest,
  operationName,
} from '../index'
import { types as fetchTypes } from 'ducks/fetch'
import { RECEIVE_PAGE } from 'ducks/pagination'
import schema from 'ducks/schema'
import { normalize } from 'normalizr'
import { SET_NORMALIZED_ENTITIES } from 'ducks/entities'
import { DIRECTION } from 'ducks/order'
import pullRequestList from 'ducks/pullrequests/queries/pullRequestList.graphql'
import storeMock from 'tests/mocks/storeMock'
import fetchMock from 'fetch-mock'
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
      { type: SET_NORMALIZED_ENTITIES, entities: normalize(pr, schema).entities },
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
      { type: SET_NORMALIZED_ENTITIES, entities: normalize(data, schema).entities },
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
      { type: SET_NORMALIZED_ENTITIES, entities: normalize(data, schema).entities },
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
})

describe('parse pullRequest response', () => {
  it('pullRequestQuery parses response', () => {
    const pullRequest = { id: 1, title: 'sdfas' }
    const response = { data: { pullRequest } }
    expect(parsePullRequest(response)).to.eql(pullRequest)
  })
})

