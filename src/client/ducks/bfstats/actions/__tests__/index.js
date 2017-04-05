/* eslint-disable max-len */

import {
  types,
  fetchLatestBuildsForRevision,
  fetchLatestBuildsForBranch,
} from 'ducks/bfstats/actions'
import { SET_QUERIED_ENTITIES } from 'ducks/entities'
import schema from 'ducks/schema'
import { normalize } from 'normalizr'

import { types as fetchTypes } from 'ducks/fetch'
import storeMock from 'tests/mocks/storeMock'
import fetchMock from 'fetch-mock'

import latestRepositoryBuilds from 'ducks/bfstats/queries/latestRepositoryBuilds.graphql'

describe('bfstats actions', () => {
  afterEach(() => fetchMock.restore())

  it('fetchLatestBuildsForRevision success', (done) => {
    const repository = 'unity/unity'
    const revision = 'a8be7b8fcec0e2146ad43194a9d8fee2c8479c08'

    const data = {
      data: {
        latestRepositoryBuilds: {
          total: 1,
          nodes: [
            {
              builder: {
                name: 'proj0-ABuildVerification',
                id: '58',
              },
              sourceStamps: [
                {
                  id: '187',
                  revision: 'a8be7b8fcec0e2146ad43194a9d8fee2c8479c08',
                  repositoryName: 'unity/unity',
                  repository: 'http://staging-hg-mirror-agents-dub.bf.unity3d.com/all-unity',
                },
              ],
              result: 8,
            },
          ],
        },
      },
    }

    const expectedActions = [
      {
        type: fetchTypes.FETCH_BFSTATS_DATA, name: types.FETCH_LATEST_BUILDS, variables: { repository, revision },
        query: latestRepositoryBuilds,
      },
      { type: fetchTypes.CLEAR_ERROR, name: types.FETCH_LATEST_BUILDS },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_LATEST_BUILDS, sending: true },
      { type: SET_QUERIED_ENTITIES, entities: normalize(data.data, schema).entities },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_LATEST_BUILDS, sending: false },
    ]

    fetchMock.mock('*', {
      data,
    })

    const store = storeMock({}, expectedActions, done)

    store.dispatch(fetchLatestBuildsForRevision(repository, revision))
  })

  it('fetchLatestBuildsForRevision failure', (done) => {
    const repository = 'unity/unity'
    const revision = 'a8be7b8fcec0e2146ad43194a9d8fee2c8479c08'
    const error = new Error('some error')

    const expectedActions = [
      {
        type: fetchTypes.FETCH_BFSTATS_DATA, name: types.FETCH_LATEST_BUILDS, variables: { repository, revision },
        query: latestRepositoryBuilds,
      },
      { type: fetchTypes.CLEAR_ERROR, name: types.FETCH_LATEST_BUILDS },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_LATEST_BUILDS, sending: true },
      { type: fetchTypes.REQUEST_ERROR, name: types.FETCH_LATEST_BUILDS, error },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_LATEST_BUILDS, sending: false },
    ]

    fetchMock.mock('*', { throws: error, status: 503 })

    const store = storeMock({}, expectedActions, done)

    store.dispatch(fetchLatestBuildsForRevision(repository, revision))
  })

  it('fetchLatestBuildsForBranch success', (done) => {
    const repository = 'unity/unity'
    const branch = 'trunk'

    const data = {
      data: {
        latestRepositoryBuilds: {
          total: 1,
          nodes: [
            {
              builder: {
                name: 'proj0-ABuildVerification',
                id: '58',
              },
              sourceStamps: [
                {
                  id: '187',
                  revision: 'a8be7b8fcec0e2146ad43194a9d8fee2c8479c08',
                  repositoryName: 'unity/unity',
                  repository: 'http://staging-hg-mirror-agents-dub.bf.unity3d.com/all-unity',
                },
              ],
              result: 8,
            },
          ],
        },
      },
    }

    const expectedActions = [
      {
        type: fetchTypes.FETCH_BFSTATS_DATA, name: types.FETCH_LATEST_BUILDS, variables: { repository, branch },
        query: latestRepositoryBuilds,
      },
      { type: fetchTypes.CLEAR_ERROR, name: types.FETCH_LATEST_BUILDS },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_LATEST_BUILDS, sending: true },
      { type: SET_QUERIED_ENTITIES, entities: normalize(data.data, schema).entities },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_LATEST_BUILDS, sending: false },
    ]

    fetchMock.mock('*', {
      data,
    })

    const store = storeMock({}, expectedActions, done)

    store.dispatch(fetchLatestBuildsForBranch(repository, branch))
  })

  it('fetchLatestBuildsForBranch failure', (done) => {
    const repository = 'unity/unity'
    const branch = 'trunk'
    const error = new Error('some error')

    const expectedActions = [
      {
        type: fetchTypes.FETCH_BFSTATS_DATA, name: types.FETCH_LATEST_BUILDS, variables: { repository, branch },
        query: latestRepositoryBuilds,
      },
      { type: fetchTypes.CLEAR_ERROR, name: types.FETCH_LATEST_BUILDS },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_LATEST_BUILDS, sending: true },
      { type: fetchTypes.REQUEST_ERROR, name: types.FETCH_LATEST_BUILDS, error },
      { type: fetchTypes.SENDING_REQUEST, name: types.FETCH_LATEST_BUILDS, sending: false },
    ]

    fetchMock.mock('*', { throws: error, status: 503 })

    const store = storeMock({}, expectedActions, done)

    store.dispatch(fetchLatestBuildsForBranch(repository, branch))
  })
})
