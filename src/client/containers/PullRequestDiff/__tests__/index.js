import chai from 'chai'
import {
  getData,
} from '../index'
import { types } from 'ducks/pullrequests/actions'

const expect = chai.expect

describe('PullRequestDiff selectors', () => {
  it('getData should return full data', () => {
    const user1 = { id: 1, username: 'testusername1' }
    const user3 = { id: 3, username: 'testusername3' }
    const users =
      {
        1: user1,
        3: user3,
      }
    const comment1 = { id: 1, message: 'test pr', author: user3 }
    const comment2 = { id: 2, message: 'test pr2', author: user1 }
    const comment4 = { id: 4, message: 'test pr4', author: user3 }
    const comments =
      {
        1: { ...comment1, author: 3 },
        2: { ...comment2, author: 1 },
        4: { ...comment4, author: 3 },
      }
    const file1 = { id: 1, name: 'file name1', comments: [comment1, comment2] }
    const file2 = { id: 2, name: 'file name2', comments: [comment4] }
    const file3 = { id: 2, name: 'file name2', comments: [] }
    const status = {
      isFetching: false,
      error: null,
    }
    const expectedData = {
      files: [
        file2,
        file1,
        file3,
      ],
      status,
      loggedUsername: 'userName',
    }
    const pullRequests = {
      12: {
        files: [
          { ...file2, comments: [4] },
          { ...file1, comments: [1, 2] },
          { ...file3, comments: [] },
        ],
      },
    }
    const state = {
      fetch: { [types.FETCH_PULL_REQUEST_DIFF]: {} },
      entities: {
        me: { username: 'userName' },
        pullRequests,
        comments,
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
  it('no users in state: getData should return data with no authors', () => {
    const comment1 = { id: 1, message: 'test pr', author: {} }
    const comment2 = { id: 2, message: 'test pr2', author: {} }
    const comment4 = { id: 4, message: 'test pr4', author: {} }
    const comments =
      {
        1: { ...comment1, author: 3 },
        2: { ...comment2, author: 1 },
        4: { ...comment4, author: 3 },
      }
    const file1 = { id: 1, name: 'file name1', comments: [comment1, comment2] }
    const file2 = { id: 2, name: 'file name2', comments: [comment4] }
    const file3 = { id: 2, name: 'file name2', comments: [] }
    const status = {
      isFetching: false,
      error: null,
    }
    const expectedData = {
      files: [
        file2,
        file1,
        file3,
      ],
      status,
      loggedUsername: 'userName',
    }
    const pullRequests = {
      12: {
        files: [
          { ...file2, comments: [4] },
          { ...file1, comments: [1, 2] },
          { ...file3, comments: [] },
        ],
      },
    }
    const state = {
      fetch: { [types.FETCH_PULL_REQUEST_DIFF]: {} },
      entities: {
        me: { username: 'userName' },
        pullRequests,
        comments,
      },
    }
    const props = {
      params: {
        prid: 12,
      },
    }
    expect(getData(state, props)(state, props)).to.deep.eql(expectedData)
  })
  it('no comments in state: getData should return data with no comments', () => {
    const file1 = { id: 1, name: 'file name1', comments: [] }
    const file2 = { id: 2, name: 'file name2', comments: [] }
    const file3 = { id: 2, name: 'file name2', comments: [] }
    const status = {
      isFetching: false,
      error: null,
    }
    const expectedData = {
      files: [
        file2,
        file1,
        file3,
      ],
      status,
      loggedUsername: 'userName',
    }
    const pullRequests = {
      12: {
        files: [
          { ...file2, comments: [4] },
          { ...file1, comments: [1, 2] },
          { ...file3, comments: [] },
        ],
      },
    }
    const state = {
      fetch: { [types.FETCH_PULL_REQUEST_DIFF]: {} },
      entities: {
        me: { username: 'userName' },
        pullRequests,
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
      files: [],
      status,
      loggedUsername: null,
    }
    const state = {
      fetch: { [types.FETCH_PULL_REQUEST_DIFF]: {} },
      entities: {},
    }
    const props = {
      params: {
        prid: 12,
      },
    }
    expect(getData(state, props)(state, props)).to.deep.eql(expectedData)
  })
  it('nonexistent key in status.fetch: getData should return data with default status', () => {
    const user1 = { id: 1, username: 'testusername1' }
    const user3 = { id: 3, username: 'testusername3' }
    const users =
      {
        1: user1,
        3: user3,
      }
    const comment1 = { id: 1, message: 'test pr', author: user3 }
    const comment2 = { id: 2, message: 'test pr2', author: user1 }
    const comment4 = { id: 4, message: 'test pr4', author: user3 }
    const comments =
      {
        1: { ...comment1, author: 3 },
        2: { ...comment2, author: 1 },
        4: { ...comment4, author: 3 },
      }
    const file1 = { id: 1, name: 'file name1', comments: [comment1, comment2] }
    const file2 = { id: 2, name: 'file name2', comments: [comment4] }
    const file3 = { id: 2, name: 'file name2', comments: [] }
    const status = {
      isFetching: false,
      error: null,
    }
    const expectedData = {
      files: [
        file2,
        file1,
        file3,
      ],
      status,
      loggedUsername: 'userName',
    }
    const pullRequests = {
      12: {
        files: [
          { ...file2, comments: [4] },
          { ...file1, comments: [1, 2] },
          { ...file3, comments: [] },
        ],
      },
    }
    const state = {
      fetch: { 'nonexistent key': {} },
      entities: {
        me: { username: 'userName' },
        pullRequests,
        comments,
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
