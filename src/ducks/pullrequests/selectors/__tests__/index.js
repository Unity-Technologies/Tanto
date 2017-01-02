import chai from 'chai'
import {
  computePullRequestLink,
  computePullRequestOriginLink,
  computePullRequestTargetLink,
  computePullRequest,
  getPageFetchStatus,
  getPageFetchError,
  getOwnedFetchStatus,
  getAssignedFetchStatus,
  getOwnedFetchError,
  getAssignedError,
  getPullRequest,
} from '../index'

import { types } from 'ducks/pullrequests'


const expect = chai.expect


describe('session selectors computations', () => {
  const pullrequest = {
    id: 'UHVsbFJlcXVlc3Q6MQ==',
    description: 'test description',
    title: 'Some test pull request',
    created: '2016-11-15 16:18:36.628901',
    updated: '2016-11-15 16:18:36.628916',
    status: 'new',
    owner: {
      username: 'test',
      email: 'test@test.tt',
      fullName: 'test test',
    },
    origin: {
      revision: 'd1aa61c80fef159d0a61e8fcbd2150ed1bf6702',
      branch: 'graphics/gi/bugfix/staging',
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

  it('computePullRequestLink', () => {
    const link = (name, id) => `/${name}/pullrequest/${id}`
    expect(computePullRequestLink(pullrequest, link)).to.be.eql({
      ...pullrequest,
      link: link(pullrequest.origin.name, pullrequest.id),
    })
  })

  it('computePullRequestOriginLink', () => {
    const link = (name, branch) => `/${name}?${branch}`
    expect(computePullRequestOriginLink(pullrequest, link)).to.be.eql({
      ...pullrequest,
      originLink: link(pullrequest.origin.name, pullrequest.origin.branch),
    })
  })

  it('computePullRequestTargetLink', () => {
    const link = (name, branch) => `/${name}?${branch}`
    expect(computePullRequestTargetLink(pullrequest, link)).to.be.eql({
      ...pullrequest,
      targetLink: link(pullrequest.target.name, pullrequest.target.branch),
    })
  })

  it('computePullRequest', () => {
    const fn1 = (name, branch) => `/${name}?${branch}`
    const fn2 = (name, id) => `/${name}/pullrequest/${id}`

    const computed = computePullRequest(pullrequest)(fn2)(fn1)
    expect(computed).to.be.eql({
      ...pullrequest,
      link: fn2(pullrequest.origin.name, pullrequest.id),
      targetLink: fn1(pullrequest.target.name, pullrequest.target.branch),
      originLink: fn1(pullrequest.origin.name, pullrequest.origin.branch),
    })
  })
})


describe('fetch status', () => {
  it('isFetching for pull requests', () => {
    const state = { fetch: { [types.FETCH_PULL_REQUESTS]: { isFetching: false } } }
    expect(getPageFetchStatus(state)).equals(false)

    const state2 = { fetch: { [types.FETCH_PULL_REQUESTS]: { isFetching: true } } }
    expect(getPageFetchStatus(state2)).equals(true)

    expect(getPageFetchStatus({ fetch: {} })).equals(false)
  })

  it('isFetching for owned pull requests', () => {
    const state = { fetch: { [types.FETCH_USER_PULL_REQUESTS]: { isFetching: false } } }
    expect(getOwnedFetchStatus(state)).equals(false)

    const state2 = { fetch: { [types.FETCH_USER_PULL_REQUESTS]: { isFetching: true } } }
    expect(getOwnedFetchStatus(state2)).equals(true)

    expect(getOwnedFetchStatus({ fetch: {} })).equals(false)
  })

  it('isFetching for owned pull requests', () => {
    const state = { fetch: { [types.FETCH_USER_ASSIGNED_PULL_REQUESTS]: { isFetching: false } } }
    expect(getAssignedFetchStatus(state)).equals(false)

    const state2 = { fetch: { [types.FETCH_USER_ASSIGNED_PULL_REQUESTS]: { isFetching: true } } }
    expect(getAssignedFetchStatus(state2)).equals(true)

    expect(getAssignedFetchStatus({ fetch: {} })).equals(false)
  })

  it('error for pull requests', () => {
    const testerror = { text: 'error message' }
    const state = { fetch: { [types.FETCH_PULL_REQUESTS]: { error: testerror } } }
    expect(getPageFetchError(state)).equals(testerror)

    expect(getPageFetchError({ fetch: {} })).equals(null)
  })

  it('error for owned pull requests', () => {
    const testerror = { text: 'error message' }
    const state = { fetch: { [types.FETCH_USER_PULL_REQUESTS]: { error: testerror } } }
    expect(getOwnedFetchError(state)).equals(testerror)

    expect(getOwnedFetchError({ fetch: {} })).equals(null)
  })

  it('error for assigned pull requests', () => {
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
