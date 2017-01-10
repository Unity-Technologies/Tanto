import {
  types,
  searchRepository,
  fetchRepository,
  fetchRepositoryBranches,
  fetchRepositories,
} from '../index'
import { types as fetchTypes } from 'ducks/fetch'

import {
  query,
  REPOSITORY_BRANCHES,
} from 'services/ono/queries/repositories'


import storeMock from '../../../tests/mocks/storeMock'
import fetchMock from 'fetch-mock'

describe('repository actions', () => {
  afterEach(() => fetchMock.restore())

  it('seachRepository success', (done) => {
    const first = 2
    const filter = 'uni'

    const nodes = [
      'unity', 'unity2', 'unify',
    ]
    const actionsList = [
      { type: types.SEARCH_REPOSITORY, first, filter },
      { type: fetchTypes.CLEAR_ERROR, name: types.SEARCH_REPOSITORY },
      { type: fetchTypes.SENDING_REQUEST, name: types.SEARCH_REPOSITORY, sending: true },
      { type: fetchTypes.SENDING_REQUEST, name: types.SEARCH_REPOSITORY, sending: false },
      { type: types.SET_REPOSITORIES_NAMES, nodes },
    ]

    fetchMock.mock('*', {
      data: { repositories: { nodes } },
    })

    const store = storeMock({}, actionsList, done)

    store.dispatch(searchRepository(filter, first))
  })

  it('seachRepository failure', (done) => {
    const first = 2
    const filter = 'uni'

    const error = new Error('some error')

    const actionsList = [
      { type: types.SEARCH_REPOSITORY, first, filter },
      { type: fetchTypes.CLEAR_ERROR, name: types.SEARCH_REPOSITORY },
      { type: fetchTypes.SENDING_REQUEST, name: types.SEARCH_REPOSITORY, sending: true },
      { type: fetchTypes.REQUEST_ERROR, name: types.SEARCH_REPOSITORY, error },
      { type: fetchTypes.SENDING_REQUEST, name: types.SEARCH_REPOSITORY, sending: false },
    ]

    fetchMock.mock('*', { throws: error, status: 503 })

    const store = storeMock({}, actionsList, done)

    store.dispatch(searchRepository(filter, first))
  })

  it('fetchRepository success', (done) => {
    const repositoryName = 'test/repo'
    const query = 'test query'
    const repo = {
      repository: {
        id: 1,
        name: 'testname',
        fullName: 'test/test/name',
      },
    }
    const expectedActions = [
      { type: fetchTypes.FETCH_DATA, name: types.FETCH_REPOSITORY, args: { name: repositoryName }, query },
      { type: fetchTypes.CLEAR_ERROR, name: types.FETCH_REPOSITORY },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_REPOSITORY, sending: true },
      { type: types.SET_REPOSITORY, node: repo.repository },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_REPOSITORY, sending: false },
    ]

    fetchMock.mock('*', {
      data: repo,
    })

    const store = storeMock({}, expectedActions, done)

    store.dispatch(fetchRepository(repositoryName, query))
  })

  it('fetchRepository failure', (done) => {
    const repositoryName = 'test/repo'
    const queryStr = 'test query'
    const error = new Error('some error')

    const expectedActions = [
      { type: fetchTypes.FETCH_DATA, name: types.FETCH_REPOSITORY, args: { name: repositoryName }, query: queryStr },
      { type: fetchTypes.CLEAR_ERROR, name: types.FETCH_REPOSITORY },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_REPOSITORY, sending: true },
      { type: fetchTypes.REQUEST_ERROR, name: types.FETCH_REPOSITORY, error },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_REPOSITORY, sending: false },
    ]

    fetchMock.mock('*', { throws: error, status: 503 })

    const store = storeMock({}, expectedActions, done)

    store.dispatch(fetchRepository(repositoryName, queryStr))
  })

  it('fetchRepositoryBranches success', (done) => {
    const id = 2
    const repo = {
      repository: {
        id,
        branches: [{
          name: 'testbranch',
          revision: 12,
        }, {
          name: 'testbranch2',
          revision: 122,
        }],
      },
    }
    const expectedActions = [
      { type: fetchTypes.FETCH_DATA, name: types.FETCH_REPOSITORY_BRANCHES, args: { id }, query: REPOSITORY_BRANCHES },
      { type: fetchTypes.CLEAR_ERROR, name: types.FETCH_REPOSITORY_BRANCHES },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_REPOSITORY_BRANCHES, sending: true },
      { type: types.SET_REPOSITORY, node: repo.repository },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_REPOSITORY_BRANCHES, sending: false },
    ]

    fetchMock.mock('*', {
      data: repo,
    })

    const store = storeMock({}, expectedActions, done)

    store.dispatch(fetchRepositoryBranches(id))
  })

  it('fetchRepositoryBranches failure', (done) => {
    const id = 2
    const error = new Error('some error')
    const expectedActions = [
      { type: fetchTypes.FETCH_DATA, name: types.FETCH_REPOSITORY_BRANCHES, args: { id }, query: REPOSITORY_BRANCHES },
      { type: fetchTypes.CLEAR_ERROR, name: types.FETCH_REPOSITORY_BRANCHES },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_REPOSITORY_BRANCHES, sending: true },
      { type: fetchTypes.REQUEST_ERROR, name: types.FETCH_REPOSITORY_BRANCHES, error },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_REPOSITORY_BRANCHES, sending: false },
    ]

    fetchMock.mock('*', { throws: error, status: 503 })

    const store = storeMock({}, expectedActions, done)

    store.dispatch(fetchRepositoryBranches(id))
  })

  it('fetchRepositories success(top level)', (done) => {
    const name = ''
    const data = {
      repositories: {
        nodes: [
          {
            id: 1,
            name: 'testrepo',
            branches: [{
              name: 'testbranch',
              revision: 12,
            }],
          },
        ],
      },
      groups: [{
        id: 1, name: 'group1' },
        { id: 2, name: 'group2' }],
    }
    const expectedActions = [
      { type: fetchTypes.FETCH_DATA, name: types.FETCH_REPOSITORIES, args: { name }, query: query(name) },
      { type: fetchTypes.CLEAR_ERROR, name: types.FETCH_REPOSITORIES },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_REPOSITORIES, sending: true },
      { type: types.SET_REPOSITORIES, nodes: data.repositories.nodes },
      { type: types.SET_GROUPS, nodes: data.groups },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_REPOSITORIES, sending: false },
    ]

    fetchMock.mock('*', {
      data,
    })

    const store = storeMock({}, expectedActions, done)

    store.dispatch(fetchRepositories(name))
  })

  it('fetchRepositories success(nested in group)', (done) => {
    const name = 'test'
    const data = {
      group: {
        repositories: {
          nodes: [
            {
              id: 1,
              name: 'testrepo',
              branches: [{
                name: 'testbranch',
                revision: 12,
              }],
            },
          ],
        },
        groups: [{
          id: 1, name: 'group1',
        },
        { id: 2, name: 'group2' }],
      },
    }
    const expectedActions = [
      { type: fetchTypes.FETCH_DATA, name: types.FETCH_REPOSITORIES, args: { name }, query: query(name) },
      { type: fetchTypes.CLEAR_ERROR, name: types.FETCH_REPOSITORIES },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_REPOSITORIES, sending: true },
      { type: types.SET_REPOSITORIES, nodes: data.group.repositories.nodes },
      { type: types.SET_GROUPS, nodes: data.group.groups },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_REPOSITORIES, sending: false },
    ]

    fetchMock.mock('*', {
      data,
    })

    const store = storeMock({}, expectedActions, done)

    store.dispatch(fetchRepositories(name))
  })

  it('fetchRepositories failure', (done) => {
    const name = ''
    const error = new Error('some error')
    const data = {
      repositories: {
        nodes: [
          {
            id: 1,
            name: 'testrepo',
            branches: [{
              name: 'testbranch',
              revision: 12,
            }],
          },
        ],
      },
      groups: [{
        id: 1, name: 'group1',
      },
      { id: 2, name: 'group2' }],
    }
    const expectedActions = [
      { type: fetchTypes.FETCH_DATA, name: types.FETCH_REPOSITORIES, args: { name }, query: query(name) },
      { type: fetchTypes.CLEAR_ERROR, name: types.FETCH_REPOSITORIES },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_REPOSITORIES, sending: true },
      { type: fetchTypes.REQUEST_ERROR, name: types.FETCH_REPOSITORIES, error },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_REPOSITORIES, sending: false },
    ]

    fetchMock.mock('*', { throws: error, status: 503 })

    const store = storeMock({}, expectedActions, done)

    store.dispatch(fetchRepositories(name))
  })
})
