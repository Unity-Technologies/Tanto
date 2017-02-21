import chai from 'chai'
import {
  getData,
} from '../index'
import { types } from 'ducks/pullrequests/actions'

const expect = chai.expect

describe('data selectors', () => {
  it('getData returns something', () => {
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
      status,
    }
    expect(getData(state, props)(state, props)).to.deep.eql(data)
  })
})
