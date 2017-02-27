import chai from 'chai'
import {
  getHeaderData,
} from '../index'
import { types } from 'ducks/pullrequests/actions'

const expect = chai.expect

describe('getHeaderData', () => {
  it('full data', () => {
    const user1 = { id: 1, username: 'testusername1' }
    const user3 = { id: 3, username: 'testusername3' }
    const users =
      {
        1: user1,
        3: user3,
      }
    const status = {
      isFetching: false,
      error: null,
    }
    const pullRequestHeaderData = {
      title: 'someTitle',
      created: '2017-02-27',
      owner: 1,
    }
    const expectedData = { ...pullRequestHeaderData, owner: user1 }
    const pullRequests = {
      12: pullRequestHeaderData,
    }
    const state = {
      fetch: { [types.FETCH_PULL_REQUEST_ISSUES]: {} },
      entities: {
        pullRequests,
        users,
      },
    }
    const props = {
      params: {
        prid: 12,
      },
      status,
    }
    expect(getHeaderData(state, props)(state, props)).to.deep.eql(expectedData)
  })
})
