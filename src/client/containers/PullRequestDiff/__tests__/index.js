import chai from 'chai'
import {
  getData,
} from '../index'
import { types } from 'ducks/pullrequests/actions'

const expect = chai.expect

describe('PullRequestDiff selectors', () => {
  it('getData should return full data', () => {
    const file1 = { id: 1, name: 'file name1', comments: [1, 2] }
    const file2 = { id: 2, name: 'file name2', comments: [4] }
    const file3 = { id: 2, name: 'file name2', comments: [] }
    const files = {
      1: file1,
      2: file2,
      3: file3,
    }
    const expectedData = {
      files: [
        file1,
        file2,
        file3,
      ],
      loggedUsername: 'userName',
    }
    const pullRequests = {
      12: {
        files: [2, 1, 3],
      },
    }
    const state = {
      fetch: { [types.FETCH_PULL_REQUEST_DIFF]: {} },
      entities: {
        me: { username: 'userName' },
        pullRequests,
        files,
      },
    }
    const props = {
      params: {
        prid: 12,
      },
    }
    expect(getData(state, props)(state, props)).to.deep.eql(expectedData)
  })
  it('no PRs in state: getData should return data without files', () => {
    const file1 = { id: 1, name: 'file name1', comments: [1, 2] }
    const file2 = { id: 2, name: 'file name2', comments: [4] }
    const file3 = { id: 2, name: 'file name2', comments: [] }
    const files = {
      1: file1,
      2: file2,
      3: file3,
    }
    const expectedData = {
      files: [],
      loggedUsername: 'userName',
    }
    const state = {
      fetch: { [types.FETCH_PULL_REQUEST_DIFF]: {} },
      entities: {
        me: { username: 'userName' },
        files,
      },
    }
    const props = {
      params: {
        prid: 12,
      },
    }
    expect(getData(state, props)(state, props)).to.deep.eql(expectedData)
  })
  it('no files in state: getData should return data without files', () => {
    const expectedData = {
      files: [],
      loggedUsername: 'userName',
    }
    const pullRequests = {
      12: {
        files: [2, 1, 3],
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
    const expectedData = {
      files: [],
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
  it('nonexistent key in status.fetch: getData should return data with no status', () => {
    const file1 = { id: 1, name: 'file name1', comments: [1, 2] }
    const file2 = { id: 2, name: 'file name2', comments: [4] }
    const file3 = { id: 3, name: 'file name2', comments: [] }
    const files = {
      1: file1,
      2: file2,
      3: file3,
    }
    const expectedData = {
      files: [
        file1,
        file2,
        file3,
      ],
      loggedUsername: 'userName',
    }
    const pullRequests = {
      12: {
        files: [1, 2, 3],
      },
    }
    const state = {
      fetch: { 'nonexistent key': {} },
      entities: {
        me: { username: 'userName' },
        pullRequests,
        files,
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
