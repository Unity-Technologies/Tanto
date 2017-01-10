

import {
  types,
  searchRepository,
  fetchRepository,
  fetchRepositoryBranches,
  fetchRepositories,
} from '../index'
import { types as fetchTypes } from 'ducks/fetch'

import storeMock from '../../../tests/mocks/storeMock'
import fetchMock from 'fetch-mock'

describe('searchRepository action', () => {
  afterEach(() => fetchMock.restore())
  it('success', (done) => {
    const first = 2
    const filter = 'uni'

    const nodes = [
      'unity', 'unity2', 'unify',
    ]
    const searchRepo = {
      type: types.SEARCH_REPOSITORY,
      first, filter,
    }

    const clearError = {
      type: fetchTypes.CLEAR_ERROR,
      name: types.SEARCH_REPOSITORY,
    }

    const sendingRequestTrue = {
      type: fetchTypes.SENDING_REQUEST,
      name: types.SEARCH_REPOSITORY,
      sending: true,
    }

    const setRepoNames = {
      type: types.SET_REPOSITORIES_NAMES,
      nodes,
    }

    const sendingRequestFalse = {
      type: fetchTypes.SENDING_REQUEST,
      name: types.SEARCH_REPOSITORY,
      sending: false,
    }
    const actionsList = [
      searchRepo, clearError, sendingRequestTrue, sendingRequestFalse, setRepoNames,
    ]

    fetchMock.mock('*', {
      data: { repositories: { nodes } },
    })

    const store = storeMock({}, actionsList, done)

    store.dispatch(searchRepository(filter, first))
  })

  it('failure', (done) => {
    const first = 2
    const filter = 'uni'

    const error = new Error('some error')
    const searchRepo = {
      type: types.SEARCH_REPOSITORY,
      first, filter,
    }

    const clearError = {
      type: fetchTypes.CLEAR_ERROR,
      name: types.SEARCH_REPOSITORY,
    }

    const sendingRequestTrue = {
      type: fetchTypes.SENDING_REQUEST,
      name: types.SEARCH_REPOSITORY,
      sending: true,
    }

    const setError = {
      type: fetchTypes.REQUEST_ERROR,
      name: types.SEARCH_REPOSITORY,
      error,
    }

    const setRepoNames = {
      type: types.SET_REPOSITORIES_NAMES,
      nodes: [],
    }

    const sendingRequestFalse = {
      type: fetchTypes.SENDING_REQUEST,
      name: types.SEARCH_REPOSITORY,
      sending: false,
    }
    const actionsList = [
      searchRepo, clearError, sendingRequestTrue, setError, sendingRequestFalse, setRepoNames,
    ]

    fetchMock.mock('*', { throws: error, status: 503 })

    const store = storeMock({}, actionsList, done)

    store.dispatch(searchRepository(filter, first))
  })
})
