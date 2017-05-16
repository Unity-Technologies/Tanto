import chai from 'chai'
import {
  getData,
} from '../index'

const expect = chai.expect

describe('CodeDiffContainer selectors', () => {
  it('getData should return full data', () => {
    const file1 = { id: 1, name: 'file name1', comments: [1], 0: 'unified diff 1', 1: 'side by side diff 1' }
    const file2 = { id: 2, name: 'file name2', comments: [4, 2], 0: 'unified diff 2', 1: 'side by side diff 2' }
    const files = {
      1: file1,
      2: file2,
    }
    const users = {
      16: {
        id: 16,
        username: 'test2',
        email: 'test1@test.tt',
        fullName: 'test test11',
      },
      12: {
        id: 12,
        username: 'test5',
        email: 'test5@test.tt',
        fullName: 'test test55',
      },
      13: {
        id: 13,
        username: 'test4',
        email: 'test4@test.tt',
        fullName: 'test test44',
      },
    }
    const comments = {
      1: { id: 1, message: 'test pr', author: 16, location: { lineNumber: 10 } },
      2: { id: 2, message: 'test pr2', author: 12, location: { lineNumber: 11 } },
      4: { id: 4, message: 'test pr4', author: 16, location: { lineNumber: 42 } },
    }
    const expectedData = {
      comments: {
        11: [{ ...comments[2], author: users[comments[2].author] }],
        42: [{ ...comments[4], author: users[comments[4].author] }],
      },
      file: file2,
      loggedUser: users[13],
      sideBySideDiff: 'side by side diff 2',
      unifiedDiff: 'unified diff 2',
    }
    const state = {
      entities: {
        me: { id: 13 },
        files,
        users,
        comments,
      },
      ui: {
        diff: { 1: file1, 2: file2 },
      },
    }
    const props = {
      id: 2,
    }
    expect(getData(state, props)).to.deep.eql(expectedData)
  })
  it('no files in state.entities: getData should return data without file and comments', () => {
    const file1 = { id: 1, name: 'file name1', comments: [1], 0: 'unified diff 1', 1: 'side by side diff 1' }
    const file2 = { id: 2, name: 'file name2', comments: [4, 2], 0: 'unified diff 2', 1: 'side by side diff 2' }
    const users = {
      16: {
        id: 16,
        username: 'test2',
        email: 'test1@test.tt',
        fullName: 'test test11',
      },
      12: {
        id: 12,
        username: 'test5',
        email: 'test5@test.tt',
        fullName: 'test test55',
      },
      13: {
        id: 13,
        username: 'test4',
        email: 'test4@test.tt',
        fullName: 'test test44',
      },
    }
    const comments = {
      1: { id: 1, message: 'test pr', author: 16, location: { lineNumber: 10 } },
      2: { id: 2, message: 'test pr2', author: 12, location: { lineNumber: 11 } },
      4: { id: 4, message: 'test pr4', author: 16, location: { lineNumber: 42 } },
    }
    const expectedData = {
      comments: {},
      file: null,
      loggedUser: users[13],
      sideBySideDiff: 'side by side diff 2',
      unifiedDiff: 'unified diff 2',
    }
    const state = {
      entities: {
        me: { id: 13 },
        users,
        comments,
      },
      ui: {
        diff: { 1: file1, 2: file2 },
      },
    }
    const props = {
      id: 2,
    }
    expect(getData(state, props)).to.deep.eql(expectedData)
  })
  it('no comments in state.entities: getData should return data without comments', () => {
    const file1 = { id: 1, name: 'file name1', comments: [1], 0: 'unified diff 1', 1: 'side by side diff 1' }
    const file2 = { id: 2, name: 'file name2', comments: [4, 2], 0: 'unified diff 2', 1: 'side by side diff 2' }
    const files = {
      1: file1,
      2: file2,
    }
    const users = {
      16: {
        id: 16,
        username: 'test2',
        email: 'test1@test.tt',
        fullName: 'test test11',
      },
      12: {
        id: 12,
        username: 'test5',
        email: 'test5@test.tt',
        fullName: 'test test55',
      },
      13: {
        id: 13,
        username: 'test4',
        email: 'test4@test.tt',
        fullName: 'test test44',
      },
    }
    const expectedData = {
      comments: {},
      file: file2,
      loggedUser: users[13],
      sideBySideDiff: 'side by side diff 2',
      unifiedDiff: 'unified diff 2',
    }
    const state = {
      entities: {
        me: { id: 13 },
        files,
        users,
      },
      ui: {
        diff: { 1: file1, 2: file2 },
      },
    }
    const props = {
      id: 2,
    }
    expect(getData(state, props)).to.deep.eql(expectedData)
  })
  it('no users in state.entities: getData should return data without loggedUser and authors', () => {
    const file1 = { id: 1, name: 'file name1', comments: [1], 0: 'unified diff 1', 1: 'side by side diff 1' }
    const file2 = { id: 2, name: 'file name2', comments: [4, 2], 0: 'unified diff 2', 1: 'side by side diff 2' }
    const files = {
      1: file1,
      2: file2,
    }
    const comments = {
      1: { id: 1, message: 'test pr', author: 16, location: { lineNumber: 10 } },
      2: { id: 2, message: 'test pr2', author: 12, location: { lineNumber: 11 } },
      4: { id: 4, message: 'test pr4', author: 16, location: { lineNumber: 42 } },
    }
    const expectedData = {
      comments: {
        11: [{ ...comments[2], author: {} }],
        42: [{ ...comments[4], author: {} }],
      },
      file: file2,
      loggedUser: undefined,
      sideBySideDiff: 'side by side diff 2',
      unifiedDiff: 'unified diff 2',
    }
    const state = {
      entities: {
        me: { id: 13 },
        files,
        comments,
      },
      ui: {
        diff: { 1: file1, 2: file2 },
      },
    }
    const props = {
      id: 2,
    }
    expect(getData(state, props)).to.deep.eql(expectedData)
  })
  it('empty state.entities: getData should return data without file, comments and loggedUser', () => {
    const file1 = { id: 1, name: 'file name1', comments: [1], 0: 'unified diff 1', 1: 'side by side diff 1' }
    const file2 = { id: 2, name: 'file name2', comments: [4, 2], 0: 'unified diff 2', 1: 'side by side diff 2' }
    const expectedData = {
      comments: {},
      file: null,
      loggedUser: undefined,
      sideBySideDiff: 'side by side diff 2',
      unifiedDiff: 'unified diff 2',
    }
    const state = {
      entities: { },
      ui: {
        diff: { 1: file1, 2: file2 },
      },
    }
    const props = {
      id: 2,
    }
    expect(getData(state, props)).to.deep.eql(expectedData)
  })
  it('empty state.ui.diff: getData should return data without diffs', () => {
    const file1 = { id: 1, name: 'file name1', comments: [1], 0: 'unified diff 1', 1: 'side by side diff 1' }
    const file2 = { id: 2, name: 'file name2', comments: [4, 2], 0: 'unified diff 2', 1: 'side by side diff 2' }
    const files = {
      1: file1,
      2: file2,
    }
    const users = {
      16: {
        id: 16,
        username: 'test2',
        email: 'test1@test.tt',
        fullName: 'test test11',
      },
      12: {
        id: 12,
        username: 'test5',
        email: 'test5@test.tt',
        fullName: 'test test55',
      },
      13: {
        id: 13,
        username: 'test4',
        email: 'test4@test.tt',
        fullName: 'test test44',
      },
    }
    const comments = {
      1: { id: 1, message: 'test pr', author: 16, location: { lineNumber: 10 } },
      2: { id: 2, message: 'test pr2', author: 12, location: { lineNumber: 11 } },
      4: { id: 4, message: 'test pr4', author: 16, location: { lineNumber: 42 } },
    }
    const expectedData = {
      comments: {
        11: [{ ...comments[2], author: users[comments[2].author] }],
        42: [{ ...comments[4], author: users[comments[4].author] }],
      },
      file: file2,
      loggedUser: users[13],
      sideBySideDiff: null,
      unifiedDiff: null,
    }
    const state = {
      entities: {
        me: { id: 13 },
        files,
        users,
        comments,
      },
      ui: {
        diff: {},
      },
    }
    const props = {
      id: 2,
    }
    expect(getData(state, props)).to.deep.eql(expectedData)
  })
  it('empty props: getData should return empty data only with loggedUser', () => {
    const file1 = { id: 1, name: 'file name1', comments: [1], 0: 'unified diff 1', 1: 'side by side diff 1' }
    const file2 = { id: 2, name: 'file name2', comments: [4, 2], 0: 'unified diff 2', 1: 'side by side diff 2' }
    const files = {
      1: file1,
      2: file2,
    }
    const users = {
      16: {
        id: 16,
        username: 'test2',
        email: 'test1@test.tt',
        fullName: 'test test11',
      },
      12: {
        id: 12,
        username: 'test5',
        email: 'test5@test.tt',
        fullName: 'test test55',
      },
      13: {
        id: 13,
        username: 'test4',
        email: 'test4@test.tt',
        fullName: 'test test44',
      },
    }
    const comments = {
      1: { id: 1, message: 'test pr', author: 16, location: { lineNumber: 10 } },
      2: { id: 2, message: 'test pr2', author: 12, location: { lineNumber: 11 } },
      4: { id: 4, message: 'test pr4', author: 16, location: { lineNumber: 42 } },
    }
    const expectedData = {
      comments: {},
      file: null,
      loggedUser: users[13],
      sideBySideDiff: null,
      unifiedDiff: null,
    }
    const state = {
      entities: {
        me: { id: 13 },
        files,
        users,
        comments,
      },
      ui: {
        diff: { 1: file1, 2: file2 },
      },
    }
    const props = {}
    expect(getData(state, props)).to.deep.eql(expectedData)
  })
})
