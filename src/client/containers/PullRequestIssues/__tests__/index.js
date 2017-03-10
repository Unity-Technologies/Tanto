import chai from 'chai'
import {
  getData,
} from '../index'
import { types } from 'ducks/pullrequests/actions'

const expect = chai.expect

describe('PullRequestIssues selectors', () => {
  it('getData should return full data', () => {
    const user1 = { id: 1, username: 'testusername1' }
    const user3 = { id: 3, username: 'testusername3' }
    const users =
      {
        1: user1,
        3: user3,
      }
    const issue1 = { id: 1, owner: 3, assignee: 3, otherParameter: 'other' }
    const issue13 = { id: 13, owner: 1, assignee: 3, otherParameter: 'other2' }
    const issues = {
      1: issue1,
      13: issue13,
    }
    const expectedIssues = [
      { ...issue1, assignee: user3, owner: user3 },
      { ...issue13, assignee: user3, owner: user1 },
    ]
    const status = {
      isFetching: false,
      error: null,
    }
    const expectedData = {
      issues: expectedIssues,
      status,
    }
    const pullRequests = {
      12: {
        issues: [1, 13],
      },
    }
    const state = {
      fetch: { [types.FETCH_PULL_REQUEST_ISSUES]: {} },
      entities: {
        pullRequests,
        issues,
        users,
      },
    }
    const props = {
      params: {
        prid: 12,
      },
    }
    expect(getData(state, props)(state, props)).to.deep.eql(expectedData)
  })
  it('no PRs in state: getData should return empty data', () => {
    const user1 = { id: 1, username: 'testusername1' }
    const user3 = { id: 3, username: 'testusername3' }
    const users =
      {
        1: user1,
        3: user3,
      }
    const issue1 = { id: 1, owner: 3, assignee: 3, otherParameter: 'other' }
    const issue13 = { id: 13, owner: 1, assignee: 3, otherParameter: 'other2' }
    const issues = {
      1: issue1,
      13: issue13,
    }
    const status = {
      isFetching: false,
      error: null,
    }
    const expectedData = {
      issues: [],
      status,
    }
    const state = {
      fetch: { [types.FETCH_PULL_REQUEST_ISSUES]: {} },
      entities: {
        issues,
        users,
      },
    }
    const props = {
      params: {
        prid: 12,
      },
    }
    expect(getData(state, props)(state, props)).to.deep.eql(expectedData)
  })
  it('no users in state: getData should return empty data', () => {
    const issue1 = { id: 1, owner: 3, assignee: 3, otherParameter: 'other' }
    const issue13 = { id: 13, owner: 1, assignee: 3, otherParameter: 'other2' }
    const issues = {
      1: issue1,
      13: issue13,
    }
    const expectedIssues = [
      { ...issue1, assignee: {}, owner: {} },
      { ...issue13, assignee: {}, owner: {} },
    ]
    const status = {
      isFetching: false,
      error: null,
    }
    const expectedData = {
      issues: expectedIssues,
      status,
    }
    const pullRequests = {
      12: {
        issues: [1, 13],
      },
    }
    const state = {
      fetch: { [types.FETCH_PULL_REQUEST_ISSUES]: {} },
      entities: {
        pullRequests,
        issues,
      },
    }
    const props = {
      params: {
        prid: 12,
      },
    }
    expect(getData(state, props)(state, props)).to.deep.eql(expectedData)
  })
  it('no issues in state: getData should return empty data', () => {
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
    const expectedData = {
      issues: [],
      status,
    }
    const pullRequests = {
      12: {
        issues: [1, 13],
      },
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
    }
    expect(getData(state, props)(state, props)).to.deep.eql(expectedData)
  })
  it('no issues in PR: getData should return empty data', () => {
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
    const expectedData = {
      issues: [],
      status,
    }
    const pullRequests = {
      12: {
        issues: [],
      },
    }
    const issue1 = { id: 1, owner: 3, assignee: 3, otherParameter: 'other' }
    const issue13 = { id: 13, owner: 1, assignee: 3, otherParameter: 'other2' }
    const issues = {
      1: issue1,
      13: issue13,
    }
    const state = {
      fetch: { [types.FETCH_PULL_REQUEST_ISSUES]: {} },
      entities: {
        pullRequests,
        issues,
        users,
      },
    }
    const props = {
      params: {
        prid: 12,
      },
    }
    expect(getData(state, props)(state, props)).to.deep.eql(expectedData)
  })
  it('no entities in state: getData should return empty data', () => {
    const status = {
      isFetching: false,
      error: null,
    }
    const expectedData = {
      issues: [],
      status,
    }
    const state = {
      fetch: { [types.FETCH_PULL_REQUEST_ISSUES]: {} },
      entities: {},
    }
    const props = {
      params: {
        prid: 12,
      },
    }
    expect(getData(state, props)(state, props)).to.deep.eql(expectedData)
  })
  it('nonexistent key in state.fetch: getData should return data with default status', () => {
    const user1 = { id: 1, username: 'testusername1' }
    const user3 = { id: 3, username: 'testusername3' }
    const users =
      {
        1: user1,
        3: user3,
      }
    const issue1 = { id: 1, owner: 3, assignee: 3, otherParameter: 'other' }
    const issue13 = { id: 13, owner: 1, assignee: 3, otherParameter: 'other2' }
    const issues = {
      1: issue1,
      13: issue13,
    }
    const expectedIssues = [
      { ...issue1, assignee: user3, owner: user3 },
      { ...issue13, assignee: user3, owner: user1 },
    ]
    const status = {
      isFetching: false,
      error: null,
    }
    const expectedData = {
      issues: expectedIssues,
      status,
    }
    const pullRequests = {
      12: {
        issues: [1, 13],
      },
    }
    const state = {
      fetch: { 'nonexistent key': {} },
      entities: {
        pullRequests,
        issues,
        users,
      },
    }
    const props = {
      params: {
        prid: 12,
      },
    }
    expect(getData(state, props)(state, props)).to.deep.eql(expectedData)
  })
})
