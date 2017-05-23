/* eslint-disable max-len */

import {
  types,
  searchRepository,
  fetchRepository,
  fetchRepositoryBranches,
  fetchRepositories,
  fetchChangelog,
  operationNames,
} from 'ducks/repositories/actions'
import { SET_QUERIED_ENTITIES } from 'ducks/entities'
import schema from 'ducks/schema'
import { normalize } from 'normalizr'

import { types as fetchTypes } from 'ducks/fetch'
import storeMock from 'tests/mocks/storeMock'
import fetchMock from 'fetch-mock'

import repositoriesQuery from 'ducks/repositories/queries/repositories.graphql'
import repositoryQuery from 'ducks/repositories/queries/repository.graphql'
import repoBranchesQuery from 'ducks/repositories/queries/branches.graphql'
import changelogQuery from 'ducks/repositories/queries/changelog.graphql'

describe('repository actions', () => {
  afterEach(() => fetchMock.restore())


  it('seachRepository success', (done) => {
    const limit = 2
    const filter = 'uni'

    const nodes = [
      'unity', 'unity2', 'unify',
    ]
    const actionsList = [
      { type: types.SEARCH_REPOSITORY, limit, filter },
      { type: fetchTypes.CLEAR_ERROR, name: types.SEARCH_REPOSITORY },
      { type: fetchTypes.SENDING_REQUEST, name: types.SEARCH_REPOSITORY, sending: true },
      { type: fetchTypes.SENDING_REQUEST, name: types.SEARCH_REPOSITORY, sending: false },
      { type: SET_QUERIED_ENTITIES, entities: normalize({ repositories: { nodes } }, schema).entities },
    ]

    fetchMock.mock('*', {
      data: { repositories: { nodes } },
    })

    const store = storeMock({}, actionsList, done)

    store.dispatch(searchRepository(filter, limit))
  })

  it('seachRepository failure', (done) => {
    const limit = 2
    const filter = 'uni'

    const error = new Error('some error')

    const actionsList = [
      { type: types.SEARCH_REPOSITORY, limit, filter },
      { type: fetchTypes.CLEAR_ERROR, name: types.SEARCH_REPOSITORY },
      { type: fetchTypes.SENDING_REQUEST, name: types.SEARCH_REPOSITORY, sending: true },
      { type: fetchTypes.REQUEST_ERROR, name: types.SEARCH_REPOSITORY, error },
      { type: fetchTypes.SENDING_REQUEST, name: types.SEARCH_REPOSITORY, sending: false },
    ]

    fetchMock.mock('*', { throws: error, status: 503 })

    const store = storeMock({}, actionsList, done)

    store.dispatch(searchRepository(filter, limit))
  })

  it('fetchRepository success', (done) => {
    const repositoryName = 'test/repo'

    const repo = {
      repository: {
        id: 1,
        name: 'testname',
        fullName: 'test/test/name',
      },
    }
    const expectedActions = [
      { type: fetchTypes.FETCH_ONO_DATA, name: types.FETCH_REPOSITORY, variables: { name: repositoryName }, query: repositoryQuery },
      { type: fetchTypes.CLEAR_ERROR, name: types.FETCH_REPOSITORY },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_REPOSITORY, sending: true },
      { type: SET_QUERIED_ENTITIES, entities: normalize(repo, schema).entities },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_REPOSITORY, sending: false },
    ]

    fetchMock.mock('*', {
      data: repo,
    })

    const store = storeMock({}, expectedActions, done)

    store.dispatch(fetchRepository(repositoryName, repositoryQuery))
  })

  it('fetchRepository failure', (done) => {
    const repositoryName = 'test/repo'
    const error = new Error('some error')

    const expectedActions = [
      { type: fetchTypes.FETCH_ONO_DATA, name: types.FETCH_REPOSITORY, variables: { name: repositoryName }, query: repositoryQuery },
      { type: fetchTypes.CLEAR_ERROR, name: types.FETCH_REPOSITORY },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_REPOSITORY, sending: true },
      { type: fetchTypes.REQUEST_ERROR, name: types.FETCH_REPOSITORY, error },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_REPOSITORY, sending: false },
    ]

    fetchMock.mock('*', { throws: error, status: 503 })

    const store = storeMock({}, expectedActions, done)

    store.dispatch(fetchRepository(repositoryName, repositoryQuery))
  })

  it('fetchRepositoryBranches success', (done) => {
    const name = 'repotest'
    const repo = {
      repository: {
        id: 1,
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
      { type: fetchTypes.FETCH_ONO_DATA, name: types.FETCH_REPOSITORY_BRANCHES, variables: { name }, query: repoBranchesQuery },
      { type: fetchTypes.CLEAR_ERROR, name: types.FETCH_REPOSITORY_BRANCHES },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_REPOSITORY_BRANCHES, sending: true },
      { type: SET_QUERIED_ENTITIES, entities: normalize(repo, schema).entities },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_REPOSITORY_BRANCHES, sending: false },
    ]

    fetchMock.mock('*', {
      data: repo,
    })

    const store = storeMock({}, expectedActions, done)

    store.dispatch(fetchRepositoryBranches(name))
  })

  it('fetchRepositoryBranches failure', (done) => {
    const name = 'repotest'
    const error = new Error('some error')
    const expectedActions = [
      { type: fetchTypes.FETCH_ONO_DATA, name: types.FETCH_REPOSITORY_BRANCHES, variables: { name }, query: repoBranchesQuery },
      { type: fetchTypes.CLEAR_ERROR, name: types.FETCH_REPOSITORY_BRANCHES },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_REPOSITORY_BRANCHES, sending: true },
      { type: fetchTypes.REQUEST_ERROR, name: types.FETCH_REPOSITORY_BRANCHES, error },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_REPOSITORY_BRANCHES, sending: false },
    ]

    fetchMock.mock('*', { throws: error, status: 503 })

    const store = storeMock({}, expectedActions, done)

    store.dispatch(fetchRepositoryBranches(name))
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
      {
        type: fetchTypes.FETCH_ONO_DATA,
        name: types.FETCH_REPOSITORIES,
        variables: { name },
        query: repositoriesQuery,
        operationName: name ? operationNames.repositoriesNested : operationNames.repositoriesTopLevel,
      },
      { type: fetchTypes.CLEAR_ERROR, name: types.FETCH_REPOSITORIES },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_REPOSITORIES, sending: true },
      { type: SET_QUERIED_ENTITIES, entities: normalize(data, schema).entities },
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
        id: 3,
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
      {
        type: fetchTypes.FETCH_ONO_DATA,
        name: types.FETCH_REPOSITORIES,
        variables: { name },
        query: repositoriesQuery,
        operationName: name ? operationNames.repositoriesNested : operationNames.repositoriesTopLevel,
      },
      { type: fetchTypes.CLEAR_ERROR, name: types.FETCH_REPOSITORIES },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_REPOSITORIES, sending: true },
      { type: SET_QUERIED_ENTITIES, entities: normalize(data, schema).entities },
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

    const expectedActions = [
      {
        type: fetchTypes.FETCH_ONO_DATA,
        name: types.FETCH_REPOSITORIES,
        variables: { name },
        query: repositoriesQuery,
        operationName: name ? operationNames.repositoriesNested : operationNames.repositoriesTopLevel,
      },
      { type: fetchTypes.CLEAR_ERROR, name: types.FETCH_REPOSITORIES },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_REPOSITORIES, sending: true },
      { type: fetchTypes.REQUEST_ERROR, name: types.FETCH_REPOSITORIES, error },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_REPOSITORIES, sending: false },
    ]

    fetchMock.mock('*', { throws: error, status: 503 })

    const store = storeMock({}, expectedActions, done)

    store.dispatch(fetchRepositories(name))
  })

  it('fetchChangelog success', (done) => {
    const repositoryName = 'test/repo'

    const repo = {
      repository: {
        id: 1,
        name: 'testname',
        fullName: 'test/test/name',
      },
    }
    const expectedActions = [
      { type: fetchTypes.FETCH_ONO_DATA, name: types.FETCH_CHANGELOG, variables: { name: repositoryName }, query: changelogQuery },
      { type: fetchTypes.CLEAR_ERROR, name: types.FETCH_CHANGELOG },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_CHANGELOG, sending: true },
      { type: SET_QUERIED_ENTITIES, entities: normalize(repo, schema).entities },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_CHANGELOG, sending: false },
    ]

    fetchMock.mock('*', {
      data: repo,
    })

    const store = storeMock({}, expectedActions, done)

    store.dispatch(fetchChangelog(repositoryName))
  })

  it('fetchChangelog failure', (done) => {
    const name = ''
    const error = new Error('some error')

    const expectedActions = [
      {
        type: fetchTypes.FETCH_ONO_DATA,
        name: types.FETCH_CHANGELOG,
        variables: { name },
        query: changelogQuery,
      },
      { type: fetchTypes.CLEAR_ERROR, name: types.FETCH_CHANGELOG },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_CHANGELOG, sending: true },
      { type: fetchTypes.REQUEST_ERROR, name: types.FETCH_CHANGELOG, error },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_CHANGELOG, sending: false },
    ]

    fetchMock.mock('*', { throws: error, status: 503 })

    const store = storeMock({}, expectedActions, done)

    store.dispatch(fetchChangelog(name))
  })
})
