/* eslint-disable max-len */
import chai from 'chai'
import {
  types,
  fetchPullRequestData,
  fetchPullRequests,
  fetchUserPullRequests,
  fetchUserAssignedPullRequests,
  operationNames,
  parsePullRequest,
  parseCurrentUserPullRequests,
  parseCurrentUserAssignedPullRequests,
} from '../index'
import { types as fetchTypes } from 'ducks/fetch'
import { DIRECTION } from 'ducks/order'
import pullRequestList from 'ducks/pullrequests/queries/pullRequestList.graphql'
import storeMock from 'tests/mocks/storeMock'
import fetchMock from 'fetch-mock'
import { types as sessionTypes } from 'ducks/session/actions'
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
      { type: fetchTypes.FETCH_DATA, name: types.FETCH_PULL_REQUEST, args: { id }, query: testQuery, operationName: '' },
      { type: fetchTypes.CLEAR_ERROR, name: types.FETCH_PULL_REQUEST },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_PULL_REQUEST, sending: true },
      { type: types.SET_PULL_REQUEST, node: pr.pullRequest },
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
      { type: fetchTypes.FETCH_DATA, name: types.FETCH_PULL_REQUEST, args: { id }, query: testQuery, operationName: '' },
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

    const args = { page, orderBy, pageSize }
    const expectedActions = [
      { type: fetchTypes.FETCH_DATA, name: types.FETCH_PULL_REQUESTS, args, query: pullRequestList, operationName: operationNames.pullRequests },
      { type: fetchTypes.CLEAR_ERROR, name: types.FETCH_PULL_REQUESTS },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_PULL_REQUESTS, sending: true },
      { type: types.SET_PULL_REQUESTS, nodes: data.repository.pullRequests.nodes },
      { type: types.SET_PULL_REQUESTS_PAGE, nodes: data.repository.pullRequests.nodes, total, ...args },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_PULL_REQUESTS, sending: false },
    ]

    fetchMock.mock('*', { data })

    const store = storeMock({}, expectedActions, done)

    store.dispatch(fetchPullRequests(args))
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

    const args = { page, orderBy, branch, repo, pageSize }
    const expectedActions = [
      { type: fetchTypes.FETCH_DATA, name: types.FETCH_PULL_REQUESTS, args, query: pullRequestList, operationName: operationNames.pullRequests },
      { type: fetchTypes.CLEAR_ERROR, name: types.FETCH_PULL_REQUESTS },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_PULL_REQUESTS, sending: true },
      { type: types.SET_PULL_REQUESTS, nodes: data.repository.pullRequests.nodes },
      { type: types.SET_PULL_REQUESTS_PAGE, nodes: data.repository.pullRequests.nodes, total, ...args },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_PULL_REQUESTS, sending: false },
    ]

    fetchMock.mock('*', { data })

    const store = storeMock({}, expectedActions, done)

    store.dispatch(fetchPullRequests(args))
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

    const args = { page, orderBy, branch, repo, pageSize }
    const expectedActions = [
      { type: fetchTypes.FETCH_DATA, name: types.FETCH_PULL_REQUESTS, args, query: pullRequestList, operationName: operationNames.pullRequests },
      { type: fetchTypes.CLEAR_ERROR, name: types.FETCH_PULL_REQUESTS },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_PULL_REQUESTS, sending: true },
      { type: fetchTypes.REQUEST_ERROR, name: types.FETCH_PULL_REQUESTS, error },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_PULL_REQUESTS, sending: false },
    ]

    fetchMock.mock('*', { throws: error, status: 503 })

    const store = storeMock({}, expectedActions, done)

    store.dispatch(fetchPullRequests(args))
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

    const args = { page, orderBy, branch, repo }
    const expectedActions = [
      { type: fetchTypes.FETCH_DATA, name: types.FETCH_USER_PULL_REQUESTS, args, query: pullRequestList, operationName: operationNames.pullRequestsOwned },
      { type: fetchTypes.CLEAR_ERROR, name: types.FETCH_USER_PULL_REQUESTS },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_USER_PULL_REQUESTS, sending: true },
      { type: types.SET_PULL_REQUESTS, nodes: data.me.pullRequestsOwned.nodes },
      { type: sessionTypes.SET_PULL_REQUESTS_OWNED, nodes: data.me.pullRequestsOwned.nodes, total, ...args },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_USER_PULL_REQUESTS, sending: false },
    ]

    fetchMock.mock('*', { data })

    const store = storeMock({}, expectedActions, done)

    store.dispatch(fetchUserPullRequests(args))
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

    const args = { page, orderBy, branch, repo, pageSize }
    const expectedActions = [
      { type: fetchTypes.FETCH_DATA, name: types.FETCH_USER_PULL_REQUESTS, args, query: pullRequestList, operationName: operationNames.pullRequestsOwned },
      { type: fetchTypes.CLEAR_ERROR, name: types.FETCH_USER_PULL_REQUESTS },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_USER_PULL_REQUESTS, sending: true },
      { type: fetchTypes.REQUEST_ERROR, name: types.FETCH_USER_PULL_REQUESTS, error },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_USER_PULL_REQUESTS, sending: false },
    ]

    fetchMock.mock('*', { throws: error, status: 503 })

    const store = storeMock({}, expectedActions, done)

    store.dispatch(fetchUserPullRequests(args))
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

    const args = { page, orderBy, branch, repo }
    const expectedActions = [
      { type: fetchTypes.FETCH_DATA, name: types.FETCH_USER_ASSIGNED_PULL_REQUESTS, args, query: pullRequestList, operationName: operationNames.pullRequestsAssigned },
      { type: fetchTypes.CLEAR_ERROR, name: types.FETCH_USER_ASSIGNED_PULL_REQUESTS },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_USER_ASSIGNED_PULL_REQUESTS, sending: true },
      { type: types.SET_PULL_REQUESTS, nodes: data.me.pullRequestsAssigned.nodes },
      { type: sessionTypes.SET_PULL_REQUESTS_ASSIGNED, nodes: data.me.pullRequestsAssigned.nodes, total, ...args },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_USER_ASSIGNED_PULL_REQUESTS, sending: false },
    ]

    fetchMock.mock('*', { data })

    const store = storeMock({}, expectedActions, done)

    store.dispatch(fetchUserAssignedPullRequests(args))
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

    const args = { page, orderBy, branch, repo }
    const expectedActions = [
      { type: fetchTypes.FETCH_DATA, name: types.FETCH_USER_ASSIGNED_PULL_REQUESTS, args, query: pullRequestList, operationName: operationNames.pullRequestsAssigned },
      { type: fetchTypes.CLEAR_ERROR, name: types.FETCH_USER_ASSIGNED_PULL_REQUESTS },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_USER_ASSIGNED_PULL_REQUESTS, sending: true },
      { type: fetchTypes.REQUEST_ERROR, name: types.FETCH_USER_ASSIGNED_PULL_REQUESTS, error },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_USER_ASSIGNED_PULL_REQUESTS, sending: false },
    ]

    fetchMock.mock('*', { throws: error, status: 503 })

    const store = storeMock({}, expectedActions, done)

    store.dispatch(fetchUserAssignedPullRequests(args))
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
  it('pullRequestQuery parses response', () => {
    const pullRequest = { id: 1, title: 'sdfas' }
    const response = { data: { pullRequest } }
    expect(parsePullRequest(response)).to.eql(pullRequest)
  })

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

