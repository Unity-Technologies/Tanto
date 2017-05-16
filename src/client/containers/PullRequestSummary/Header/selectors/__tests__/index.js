import chai from 'chai'
import {
  getHeaderData,
} from '../index'

const expect = chai.expect

describe('PullRequestSummary/Header selectors', () => {
  it('getHeaderData, full data', () => {
    const user1 = { id: 1, username: 'testusername1' }
    const user3 = { id: 3, username: 'testusername3' }
    const users =
      {
        1: user1,
        3: user3,
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
      entities: {
        pullRequests,
        users,
      },
    }
    const props = {
      params: {
        prid: 12,
      },
    }
    expect(getHeaderData(state, props)(state, props)).to.deep.eql(expectedData)
  })
  it('getHeaderData, no users in state', () => {
    const pullRequestHeaderData = {
      title: 'someTitle',
      created: '2017-02-27',
      owner: 1,
    }
    const expectedData = { ...pullRequestHeaderData, owner: undefined }
    const pullRequests = {
      12: pullRequestHeaderData,
    }
    const state = {
      entities: {
        pullRequests,
        users: {},
      },
    }
    const props = {
      params: {
        prid: 12,
      },
    }
    expect(getHeaderData(state, props)(state, props)).to.deep.eql(expectedData)
  })
  it('getHeaderData, no pr (no prid in props)', () => {
    const user1 = { id: 1, username: 'testusername1' }
    const user3 = { id: 3, username: 'testusername3' }
    const users =
      {
        1: user1,
        3: user3,
      }
    const pullRequestHeaderData = {
      title: 'someTitle',
      created: '2017-02-27',
      owner: 1,
    }
    const expectedData = {}
    const pullRequests = {
      12: pullRequestHeaderData,
    }
    const state = {
      entities: {
        pullRequests,
        users,
      },
    }
    const props = {}
    expect(getHeaderData(state, props)(state, props)).to.deep.eql(expectedData)
  })
  it('getHeaderData, no pr in state', () => {
    const user1 = { id: 1, username: 'testusername1' }
    const user3 = { id: 3, username: 'testusername3' }
    const users =
      {
        1: user1,
        3: user3,
      }
    const expectedData = {}
    const state = {
      entities: {
        users,
      },
    }
    const props = {
      params: {
        prid: 12,
      },
    }
    expect(getHeaderData(state, props)(state, props)).to.deep.eql(expectedData)
  })
})
