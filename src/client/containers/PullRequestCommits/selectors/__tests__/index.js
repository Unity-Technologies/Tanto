import chai from 'chai'
import getContainerData from 'containers/PullRequestCommits/selectors'
import { types } from 'ducks/pullrequests/actions'

const expect = chai.expect

describe('PullRequestCommits selectors', () => {
  it('full data - with one pr, using [props.params.prid]', () => {
    const pullRequest = {
      id: 12,
      origin: {
        repository: {
          fullName: 'repoFullName',
        },
      },
      changeset: [
        'd7fdb5f9d95e446ea42865e6abbff9abf04a93c6',
      ],
    }

    const changesets = {
      d7fdb5f9d95e446ea42865e6abbff9abf04a93c6: {
        id: 'd7fdb5f9d95e446ea42865e6abbff9abf04a93c6',
        branch: 'test2',
        message: 'sadfdsf',
        author: 'Kateryna Musina <kateryna@unity3d.com>',
        files: [
          'C--f2907f116ca3',
        ],
        date: '2017-04-19T10:42:03',
        status: 'not_reviewed',
      },
    }

    const status = {
      isFetching: false,
      error: null,
    }
    const expectedData = {
      commits: [{
        id: 'd7fdb5f9d95e446ea42865e6abbff9abf04a93c6',
        branch: 'test2',
        message: 'sadfdsf',
        author: 'Kateryna Musina <kateryna@unity3d.com>',
        authorUser: {
          fullName: 'Kateryna Musina',
          email: 'kateryna@unity3d.com',
        },
        files: [
          'C--f2907f116ca3',
        ],
        date: '2017-04-19T10:42:03',
        status: 'not_reviewed',
      }],
      status,
    }
    const key = types.FETCH_PULL_REQUEST_CHANGESET
    const state = {
      fetch: { [key]: {} },
      entities: { pullRequests: { 12: pullRequest }, changesets },
    }
    const props = {
      params: {
        prid: 12,
      },
    }
    expect(getContainerData(state, props)).to.deep.eql(expectedData)
  })

  it('no matching PR in state', () => {
    const status = {
      isFetching: false,
      error: null,
    }
    const data = {
      commits: null,
      status,
    }
    const key = types.FETCH_PULL_REQUEST_CHANGESET
    const state = {
      fetch: { [key]: {} },
      entities: { pullRequests: { 12: 'pullRequest' } },
    }
    const props = {
      params: {
        prid: 13,
      },
    }
    expect(getContainerData(state, props)).to.deep.eql(data)
  })

  it('no PRs in state: getData should return empty data', () => {
    const status = {
      isFetching: false,
      error: null,
    }
    const data = {
      commits: null,
      status,
    }
    const key = types.FETCH_PULL_REQUEST_CHANGESET
    const state = {
      fetch: { [key]: {} },
      entities: { pullRequests: {} },
    }
    const props = {
      params: {
        prid: 12,
      },
    }
    expect(getContainerData(state, props)).to.deep.eql(data)
  })

  it('no entities in state: getData should return empty data', () => {
    const status = {
      isFetching: false,
      error: null,
    }
    const data = {
      commits: null,
      status,
    }
    const key = types.FETCH_PULL_REQUEST_CHANGESET
    const state = {
      fetch: { [key]: {} },
      entities: {},
    }
    const props = {
      params: {
        prid: 12,
      },
    }
    expect(getContainerData(state, props)).to.deep.eql(data)
  })

  it('empty fetch: getData should return full data and default status', () => {
    const pullRequest = {
      id: 12,
      origin: {
        repository: {
          fullName: 'repoFullName',
        },
      },
      changeset: [
        'd7fdb5f9d95e446ea42865e6abbff9abf04a93c6',
      ],
    }

    const changesets = {
      d7fdb5f9d95e446ea42865e6abbff9abf04a93c6: {
        id: 'd7fdb5f9d95e446ea42865e6abbff9abf04a93c6',
        branch: 'test2',
        message: 'sadfdsf',
        author: 'Kateryna Musina <kateryna@unity3d.com>',
        files: [
          'C--f2907f116ca3',
        ],
        date: '2017-04-19T10:42:03',
        status: 'not_reviewed',
      },
    }
    const status = {
      isFetching: false,
      error: null,
    }
    const data = {
      commits: [{
        id: 'd7fdb5f9d95e446ea42865e6abbff9abf04a93c6',
        branch: 'test2',
        message: 'sadfdsf',
        author: 'Kateryna Musina <kateryna@unity3d.com>',
        authorUser: {
          fullName: 'Kateryna Musina',
          email: 'kateryna@unity3d.com',
        },
        files: [
          'C--f2907f116ca3',
        ],
        date: '2017-04-19T10:42:03',
        status: 'not_reviewed',
      }],
      status,
    }
    const state = {
      fetch: {},
      entities: { pullRequests: { 12: pullRequest }, changesets },
    }
    const props = {
      params: {
        prid: 12,
      },
    }
    expect(getContainerData(state, props)).to.deep.eql(data)
  })
})
