import chai from 'chai'
import {
  getPageFetchStatus,
  getPageFetchError,
  getOwnedFetchStatus,
  getAssignedFetchStatus,
  getOwnedFetchError,
  getAssignedError,
  getPullRequest,
  pullRequestsEntitiesSelector,
  pullRequestsIdsSelector,
} from '../index'

import { types } from 'ducks/pullrequests'


const expect = chai.expect

describe('fetch status', () => {
  it('getPageFetchStatus for pull requests', () => {
    const state = { fetch: { [types.FETCH_PULL_REQUESTS]: { isFetching: false } } }
    expect(getPageFetchStatus(state)).equals(false)

    const state2 = { fetch: { [types.FETCH_PULL_REQUESTS]: { isFetching: true } } }
    expect(getPageFetchStatus(state2)).equals(true)

    expect(getPageFetchStatus({ fetch: {} })).equals(false)
  })

  it('getOwnedFetchStatus for owned pull requests', () => {
    const state = { fetch: { [types.FETCH_USER_PULL_REQUESTS]: { isFetching: false } } }
    expect(getOwnedFetchStatus(state)).equals(false)

    const state2 = { fetch: { [types.FETCH_USER_PULL_REQUESTS]: { isFetching: true } } }
    expect(getOwnedFetchStatus(state2)).equals(true)

    expect(getOwnedFetchStatus({ fetch: {} })).equals(false)
  })

  it('getAssignedFetchStatus for owned pull requests', () => {
    const state = { fetch: { [types.FETCH_USER_ASSIGNED_PULL_REQUESTS]: { isFetching: false } } }
    expect(getAssignedFetchStatus(state)).equals(false)

    const state2 = { fetch: { [types.FETCH_USER_ASSIGNED_PULL_REQUESTS]: { isFetching: true } } }
    expect(getAssignedFetchStatus(state2)).equals(true)

    expect(getAssignedFetchStatus({ fetch: {} })).equals(false)
  })

  it('getPageFetchError for pull requests', () => {
    const testerror = { text: 'error message' }
    const state = { fetch: { [types.FETCH_PULL_REQUESTS]: { error: testerror } } }
    expect(getPageFetchError(state)).equals(testerror)

    expect(getPageFetchError({ fetch: {} })).equals(null)
  })

  it('getOwnedFetchError for owned pull requests', () => {
    const testerror = { text: 'error message' }
    const state = { fetch: { [types.FETCH_USER_PULL_REQUESTS]: { error: testerror } } }
    expect(getOwnedFetchError(state)).equals(testerror)

    expect(getOwnedFetchError({ fetch: {} })).equals(null)
  })

  it('getAssignedError for assigned pull requests', () => {
    const testerror = { text: 'error message' }
    const state = { fetch: { [types.FETCH_USER_ASSIGNED_PULL_REQUESTS]: { error: testerror } } }
    expect(getAssignedError(state)).equals(testerror)

    expect(getAssignedError({ fetch: {} })).equals(null)
  })
})

describe('pullRequestSelector', () => {
  it('should select pull request by params prid', () => {
    const pullRequest = {
      id: 12,
      title: 'test pr',
      description: 'test pr description',
    }
    const state = { pullrequests: { entities: { 12: pullRequest } } }
    const props = { params: { prid: 12 } }
    expect(getPullRequest(state, props)).to.eql(pullRequest)
  })
})

describe('getPullRequests', () => {
  it('pullRequestsEntitiesSelector', () => {
    const pullRequest = {
      id: 12,
      title: 'test pr',
      description: 'test pr description',
    }
    const state = { pullrequests: { entities: { 12: pullRequest } } }

    expect(pullRequestsEntitiesSelector(state, {})).to.eql(state.pullrequests.entities)
  })

  it('pullRequestsIdsSelector', () => {
    const pullRequest1 = {
      id: 12,
      title: 'test pr',
      description: 'test pr description',
    }

    const pullRequest2 = {
      id: 122,
      title: 'test pr2',
      description: 'test pr description2',
    }
    const state = {
      pullrequests: {
        entities: { 12: pullRequest1, 122: pullRequest2 },
        pagination: {
          currentPage: 1,
          pages: {
            1: [12],
          },
        },
      },
    }

    expect(pullRequestsIdsSelector(state, {})).to.eql([12])
  })

  it('getPullRequests', () => {
    const pullRequest1 = {
      id: 12,
      title: 'test pr',
      description: 'test pr description',
    }

    const pullRequest2 = {
      id: 122,
      title: 'test pr2',
      description: 'test pr description2',
    }

    const pullRequest3 = {
      id: 2,
      title: 'test pr22',
      description: 'test pr description22',
    }
    const state = {
      pullrequests: {
        entities: { 12: pullRequest1, 122: pullRequest2, 2: pullRequest3 },
        pagination: {
          currentPage: 1,
          pages: {
            1: [12, 2],
          },
        },
      },
    }

    expect(pullRequestsIdsSelector(state, {})).to.eql([12, 2])
  })
})
