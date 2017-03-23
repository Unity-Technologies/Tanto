/* eslint-disable max-len */
import chai from 'chai'
import fetchMock from 'fetch-mock'
import schema from 'ducks/schema'
import { normalize } from 'normalizr'
import { SET_QUERIED_ENTITIES } from 'ducks/entities'
import { DIRECTION } from 'ducks/order'
import { RECEIVE_PAGE } from 'ducks/pagination'
import pullRequestList from 'ducks/session/queries/userPullRequestList.graphql'
import {
  types,
  fetchProfile,
  fetchUserPullRequests,
  operationNames,
  parseCurrentUserAssignedPullRequests,
  parseCurrentUserPullRequests,
  fetchUserAssignedPullRequests,

} from '../index'
const expect = chai.expect
import { types as fetchTypes } from 'ducks/fetch'
import userProfileQuery from 'ducks/session/queries/me.graphql'

import storeMock from 'tests/mocks/storeMock'

const chaiSubset = require('chai-subset')
chai.use(chaiSubset)


describe('session fetch actions', () => {
  afterEach(() => fetchMock.restore())
  it('should fetch profile', (done) => {
    const response = {
      data: { me: { username: '78' } },
    }
    const expected = normalize(response.data, schema).entities
    expected.me = expected.me.undefined
    const actionsList = [{
      type: fetchTypes.FETCH_DATA, query: userProfileQuery,
      name: types.FETCH_USER_PROFILE,
    }, {
      type: fetchTypes.CLEAR_ERROR, name: types.FETCH_USER_PROFILE,
    }, {
      type: fetchTypes.SENDING_REQUEST, name: types.FETCH_USER_PROFILE, sending: true,
    }, { type: SET_QUERIED_ENTITIES, entities: expected }, {
      type: fetchTypes.SENDING_REQUEST, name: types.FETCH_USER_PROFILE, sending: false,
    }]

    const store = storeMock({}, actionsList, done)

    fetchMock.mock('*', response)

    store.dispatch(fetchProfile())
  })

  it('should save error to state', (done) => {
    const error = new Error('some error')
    const fetchData = {
      type: fetchTypes.FETCH_DATA,
      query: userProfileQuery,
      name: types.FETCH_USER_PROFILE,
    }

    const clearError = {
      type: fetchTypes.CLEAR_ERROR,
      name: types.FETCH_USER_PROFILE,
    }

    const sendingRequestTrue = {
      type: fetchTypes.SENDING_REQUEST,
      name: types.FETCH_USER_PROFILE,
      sending: true,
    }

    const setError = {
      type: fetchTypes.REQUEST_ERROR,
      error,
      name: types.FETCH_USER_PROFILE,
    }

    const sendingRequestFalse = {
      type: fetchTypes.SENDING_REQUEST,
      name: types.FETCH_USER_PROFILE,
      sending: false,
    }

    const actionsList = [
      fetchData, clearError, sendingRequestTrue, setError, sendingRequestFalse,
    ]

    const store = storeMock({}, actionsList, done)

    fetchMock.mock('*', { throws: error, status: 503 })

    store.dispatch(fetchProfile())
  })

  it('fetchUserPullRequests success', (done) => {
    const page = 1
    const repo = 'testrepo'
    const branch = 'default'
    const orderBy = {
      direction: DIRECTION.DESC,
      field: 'name',
    }
    const total = 123
    const data = {
      me: {
        pullRequestsOwned: {
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

    const variables = { page, orderBy, branch, repo }
    const expected = normalize(data, schema).entities
    expected.me = expected.me.undefined
    const expectedActions = [
      { type: fetchTypes.FETCH_DATA, name: types.FETCH_USER_PULL_REQUESTS, variables, query: pullRequestList, operationName: operationNames.pullRequestsOwned },
      { type: fetchTypes.CLEAR_ERROR, name: types.FETCH_USER_PULL_REQUESTS },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_USER_PULL_REQUESTS, sending: true },
      { type: SET_QUERIED_ENTITIES, entities: expected },
      { type: RECEIVE_PAGE, namespace: operationNames.pullRequestsOwned, nodes: data.me.pullRequestsOwned.nodes, total, page, repo, branch, orderBy },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_USER_PULL_REQUESTS, sending: false },
    ]

    fetchMock.mock('*', { data })

    const store = storeMock({}, expectedActions, done)

    store.dispatch(fetchUserPullRequests(variables))
  })

  it('fetchUserPullRequests failure ', (done) => {
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
      { type: fetchTypes.FETCH_DATA, name: types.FETCH_USER_PULL_REQUESTS, variables, query: pullRequestList, operationName: operationNames.pullRequestsOwned },
      { type: fetchTypes.CLEAR_ERROR, name: types.FETCH_USER_PULL_REQUESTS },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_USER_PULL_REQUESTS, sending: true },
      { type: fetchTypes.REQUEST_ERROR, name: types.FETCH_USER_PULL_REQUESTS, error },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_USER_PULL_REQUESTS, sending: false },
    ]

    fetchMock.mock('*', { throws: error, status: 503 })

    const store = storeMock({}, expectedActions, done)

    store.dispatch(fetchUserPullRequests(variables))
  })

  it('fetchUserAssignedPullRequests success', (done) => {
    const page = 1
    const repo = 'testrepo'
    const branch = 'default'
    const orderBy = {
      direction: DIRECTION.DESC,
      field: 'name',
    }
    const total = 123
    const data = {
      me: {
        pullRequestsAssigned: {
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

    const variables = { page, orderBy, branch, repo }
    const expected = normalize(data, schema).entities
    expected.me = expected.me.undefined
    const expectedActions = [
      { type: fetchTypes.FETCH_DATA, name: types.FETCH_USER_ASSIGNED_PULL_REQUESTS, variables, query: pullRequestList, operationName: operationNames.pullRequestsAssigned },
      { type: fetchTypes.CLEAR_ERROR, name: types.FETCH_USER_ASSIGNED_PULL_REQUESTS },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_USER_ASSIGNED_PULL_REQUESTS, sending: true },
      { type: SET_QUERIED_ENTITIES, entities: expected },
      { type: RECEIVE_PAGE, namespace: operationNames.pullRequestsAssigned, nodes: data.me.pullRequestsAssigned.nodes, total, page, repo, branch, orderBy },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_USER_ASSIGNED_PULL_REQUESTS, sending: false },
    ]

    fetchMock.mock('*', { data })

    const store = storeMock({}, expectedActions, done)

    store.dispatch(fetchUserAssignedPullRequests(variables))
  })

  it('fetchUserAssignedPullRequests failure ', (done) => {
    const page = 1
    const repo = 'testrepo'
    const branch = 'default'
    const error = new Error('some error')
    const orderBy = {
      direction: DIRECTION.DESC,
      field: 'name',
    }

    const variables = { page, orderBy, branch, repo }
    const expectedActions = [
      { type: fetchTypes.FETCH_DATA, name: types.FETCH_USER_ASSIGNED_PULL_REQUESTS, variables, query: pullRequestList, operationName: operationNames.pullRequestsAssigned },
      { type: fetchTypes.CLEAR_ERROR, name: types.FETCH_USER_ASSIGNED_PULL_REQUESTS },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_USER_ASSIGNED_PULL_REQUESTS, sending: true },
      { type: fetchTypes.REQUEST_ERROR, name: types.FETCH_USER_ASSIGNED_PULL_REQUESTS, error },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_USER_ASSIGNED_PULL_REQUESTS, sending: false },
    ]

    fetchMock.mock('*', { throws: error, status: 503 })

    const store = storeMock({}, expectedActions, done)

    store.dispatch(fetchUserAssignedPullRequests(variables))
  })
})

describe('parse pullRequest response', () => {
  const node1 = {
    id: 'UHVsbFJlcXVlc3Q6MQ==',
    title: 'Some test pull request 1',
    origin: {
      revision: '2d1aa61c80fef159d0a61e8fcbd2150ed1bf6702',
      branch: 'graphics/gi/bugfix/staging1',
      repository: {
        name: 'unity/unity',
      },
    },
    target: {
      branch: 'trunk',
      repository: {
        name: 'unity/unity',
      },
    },
  }

  const node2 = {
    id: 'UHVsbFJlcXVlc3Q6NQ==',
    title: 'Some test pull request 2',
    origin_rev: '2d1aa61c80fef159d0a61e8fcbd2150ed1bf6702',
    origin_branch: 'graphics/gi/bugfix/staging2',
    origin_repository: {
      id: 'UmVwb3NpdG9yeTos',
    },
    dest_branch: 'trunk',
    dest_repository: {
      id: 'UmVwb3NpdG9yeTos',
    },
  }

  const testnodes = [
    {
      node: node1,
    },
    {
      node: node2,
    },
  ]

  const testResponse = (property, pullrequests, total) => {
    const response = {
      data: {
        me: {
        },
      },
    }
    response.data.me[property] = {
      nodes: pullrequests,
      total,
    }

    return response
  }
  it('parseCurrentUserPullRequests', () => {
    const response = testResponse('pullRequestsOwned', testnodes, 12)
    expect(parseCurrentUserPullRequests(response))
      .to.be.eql({ nodes: testnodes, total: 12 })
  })

  it('parseCurrentUserAssignedPullRequests', () => {
    const response = testResponse('pullRequestsAssigned', testnodes, 10)
    expect(parseCurrentUserAssignedPullRequests(response))
      .to.be.eql({ nodes: testnodes, total: 10 })
  })
})
