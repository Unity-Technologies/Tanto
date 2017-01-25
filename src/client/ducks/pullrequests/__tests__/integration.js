/* eslint-disable max-len */

import {
  types,
  fetchPullRequestData,
  fetchPullRequests,
  fetchUserPullRequests,
  fetchUserAssignedPullRequests,
} from '../index'
import { types as fetchTypes } from 'ducks/fetch'
import PULL_REQUEST_QUERY from 'services/ono/queries/pullRequest'
import { DIRECTION } from 'ducks/order'
import {
  projectPullRequestsQuery,
  queries,
} from 'services/ono/queries/pullrequests'
import storeMock from '../../../tests/mocks/storeMock'
import fetchMock from 'fetch-mock'
import { types as sessionTypes } from 'ducks/session'

describe('pullrequests actions', () => {
  afterEach(() => fetchMock.restore())

  it('fetchPullRequest success', (done) => {
    const id = 2
    const pr = {
      pullRequest: {
        id,
        name: 'testpr',
        title: 'test pr title',
        description: 'test pr description',
      },
    }

    const expectedActions = [
      { type: fetchTypes.FETCH_DATA, name: types.FETCH_PULL_REQUEST, args: { id }, query: PULL_REQUEST_QUERY },
      { type: fetchTypes.CLEAR_ERROR, name: types.FETCH_PULL_REQUEST },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_PULL_REQUEST, sending: true },
      { type: types.SET_PULL_REQUEST, node: pr.pullRequest },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_PULL_REQUEST, sending: false },
    ]

    fetchMock.mock('*', {
      data: pr,
    })

    const store = storeMock({}, expectedActions, done)

    store.dispatch(fetchPullRequestData(types.FETCH_PULL_REQUEST, PULL_REQUEST_QUERY, { id }))
  })

  it('fetchPullRequest failure', (done) => {
    const id = 2
    const error = new Error('some error')

    const expectedActions = [
      { type: fetchTypes.FETCH_DATA, name: types.FETCH_PULL_REQUEST, args: { id }, query: PULL_REQUEST_QUERY },
      { type: fetchTypes.CLEAR_ERROR, name: types.FETCH_PULL_REQUEST },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_PULL_REQUEST, sending: true },
      { type: fetchTypes.REQUEST_ERROR, name: types.FETCH_PULL_REQUEST, error },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_PULL_REQUEST, sending: false },
    ]

    fetchMock.mock('*', { throws: error, status: 503 })

    const store = storeMock({}, expectedActions, done)

    store.dispatch(fetchPullRequestData(types.FETCH_PULL_REQUEST, PULL_REQUEST_QUERY, { id }))
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
      { type: fetchTypes.FETCH_DATA, name: types.FETCH_PULL_REQUESTS, args, query: projectPullRequestsQuery },
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
      { type: fetchTypes.FETCH_DATA, name: types.FETCH_PULL_REQUESTS, args, query: projectPullRequestsQuery },
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
      { type: fetchTypes.FETCH_DATA, name: types.FETCH_PULL_REQUESTS, args, query: projectPullRequestsQuery },
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
      { type: fetchTypes.FETCH_DATA, name: types.FETCH_USER_PULL_REQUESTS, args, query: queries.USER_PULL_REQUESTS },
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
      { type: fetchTypes.FETCH_DATA, name: types.FETCH_USER_PULL_REQUESTS, args, query: queries.USER_PULL_REQUESTS },
      { type: fetchTypes.CLEAR_ERROR, name: types.FETCH_USER_PULL_REQUESTS },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_USER_PULL_REQUESTS, sending: true },
      { type: fetchTypes.REQUEST_ERROR, name: types.FETCH_USER_PULL_REQUESTS, error },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_USER_PULL_REQUESTS, sending: false },
    ]

    fetchMock.mock('*', { throws: error, status: 503 })

    const store = storeMock({}, expectedActions, done)

    store.dispatch(fetchUserPullRequests(args))
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
      { type: fetchTypes.FETCH_DATA, name: types.FETCH_USER_ASSIGNED_PULL_REQUESTS, args, query: queries.USER_ASSIGNED_PULL_REQUESTS },
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

  it('fetchUserPullRequests failure ', (done) => {
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
      { type: fetchTypes.FETCH_DATA, name: types.FETCH_USER_ASSIGNED_PULL_REQUESTS, args, query: queries.USER_ASSIGNED_PULL_REQUESTS },
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
