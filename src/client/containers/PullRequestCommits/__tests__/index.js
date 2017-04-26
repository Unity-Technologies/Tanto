import chai from 'chai'
import {
  getData,
} from '../index'
import { types } from 'ducks/pullrequests/actions'

const expect = chai.expect

describe('PullRequestCommits selectors', () => {
  it('full data - with one pr, using [props.params.prid]', () => {
    const changeset = 'changeset'
    const pullRequest = {
      id: 12,
      origin: {
        repository: {
          fullName: 'repoFullName',
        },
      },
      changeset,
    }
    const status = {
      isFetching: false,
      error: null,
    }
    const data = {
      commits: changeset,
      projectName: 'repoFullName',
      status,
    }
    const key = types.FETCH_PULL_REQUEST_CHANGESET
    const state = {
      fetch: { [key]: {} },
      entities: { pullRequests: { 12: pullRequest } },
    }
    const props = {
      params: {
        prid: 12,
      },
    }
    expect(getData(state, props)(state, props)).to.deep.eql(data)
  })
  it('no matching PR in state: getData should return empty data', () => {
    const status = {
      isFetching: false,
      error: null,
    }
    const data = {
      commits: [],
      projectName: '',
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
    expect(getData(state, props)(state, props)).to.deep.eql(data)
  })
  it('no PRs in state: getData should return empty data', () => {
    const status = {
      isFetching: false,
      error: null,
    }
    const data = {
      commits: [],
      projectName: '',
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
    expect(getData(state, props)(state, props)).to.deep.eql(data)
  })
  it('no entities in state: getData should return empty data', () => {
    const status = {
      isFetching: false,
      error: null,
    }
    const data = {
      commits: [],
      projectName: '',
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
    expect(getData(state, props)(state, props)).to.deep.eql(data)
  })
  it('empty fetch: getData should return full data and default status', () => {
    const changeset = 'changeset'
    const pullRequest = {
      id: 12,
      origin: {
        repository: {
          fullName: 'repoFullName',
        },
      },
      changeset,
    }
    const status = {
      isFetching: false,
      error: null,
    }
    const data = {
      commits: changeset,
      projectName: 'repoFullName',
      status,
    }
    const state = {
      fetch: {},
      entities: { pullRequests: { 12: pullRequest } },
    }
    const props = {
      params: {
        prid: 12,
      },
    }
    expect(getData(state, props)(state, props)).to.deep.eql(data)
  })
})
