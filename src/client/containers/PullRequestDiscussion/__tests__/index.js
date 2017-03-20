import chai from 'chai'
import {
  getPRequest,
} from '../PullRequestDiscussion'

const expect = chai.expect

describe('PullRequestDiscussion selectors', () => {
  it('getPRequest, full data', () => {
    const user1 = { id: 1, username: 'testusername1' }
    const user3 = { id: 3, username: 'testusername3' }
    const users =
      {
        1: user1,
        3: user3,
      }
    const comment1 = { id: 1, author: 1 }
    const comment2 = { id: 2, author: 3 }
    const comments =
      {
        1: comment1,
        2: comment2,
      }
    const expectedPullRequestData = {
      description: 'testdescription',
      created: '2017-02-28',
      owner: user1,
      origin: 'origin',
      comments: [
          { ...comment1, author: user1 },
          { ...comment2, author: user3 },
      ],
    }
    const pullRequests = {
      12: {
        ...expectedPullRequestData,
        otherAttribute: 'otherAttribute',
        owner: 1,
        comments: [1, 2],
      },
    }
    const state = {
      entities: {
        pullRequests,
        users,
        comments,
      },
    }
    const props = {
      params: {
        prid: 12,
      },
    }
    expect(getPRequest(state, props)).to.deep.eql(expectedPullRequestData)
  })
  it('no users in state: getPRequest should return data without users', () => {
    const comment1 = { id: 1, author: 1 }
    const comment2 = { id: 2, author: 3 }
    const comments =
      {
        1: comment1,
        2: comment2,
      }
    const expectedPullRequestData = {
      description: 'testdescription',
      created: '2017-02-28',
      owner: undefined,
      origin: 'origin',
      comments: [
          { ...comment1, author: {} },
          { ...comment2, author: {} },
      ],
    }
    const pullRequests = {
      12: {
        ...expectedPullRequestData,
        otherAttribute: 'otherAttribute',
        owner: 1,
        comments: [1, 2],
      },
    }
    const state = {
      entities: {
        pullRequests,
        comments,
      },
    }
    const props = {
      params: {
        prid: 12,
      },
    }
    expect(getPRequest(state, props)).to.deep.eql(expectedPullRequestData)
  })
  it('no PRs in state: getPRequest should return empty data', () => {
    const user1 = { id: 1, username: 'testusername1' }
    const user3 = { id: 3, username: 'testusername3' }
    const users =
      {
        1: user1,
        3: user3,
      }
    const comment1 = { id: 1, author: 1 }
    const comment2 = { id: 2, author: 3 }
    const comments =
      {
        1: comment1,
        2: comment2,
      }
    const expectedPullRequestData = {
      comments: [],
    }
    const state = {
      entities: {
        users,
        comments,
      },
    }
    const props = {
      params: {
        prid: 12,
      },
    }
    expect(getPRequest(state, props)).to.deep.eql(expectedPullRequestData)
  })
  it('no comments in state: getPRequest should return data without comments', () => {
    const user1 = { id: 1, username: 'testusername1' }
    const user3 = { id: 3, username: 'testusername3' }
    const users =
      {
        1: user1,
        3: user3,
      }
    const expectedPullRequestData = {
      description: 'testdescription',
      created: '2017-02-28',
      owner: user1,
      origin: 'origin',
      comments: [],
    }
    const pullRequests = {
      12: {
        ...expectedPullRequestData,
        otherAttribute: 'otherAttribute',
        owner: 1,
        comments: [1, 2],
      },
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
    expect(getPRequest(state, props)).to.deep.eql(expectedPullRequestData)
  })
  it('no entities in state: getPRequest should return empty data', () => {
    const expectedPullRequestData = {
      comments: [],
    }
    const state = {
      entities: {},
    }
    const props = {
      params: {
        prid: 12,
      },
    }
    expect(getPRequest(state, props)).to.deep.eql(expectedPullRequestData)
  })
  it('no prid in props: getPRequest should return empty data', () => {
    const user1 = { id: 1, username: 'testusername1' }
    const user3 = { id: 3, username: 'testusername3' }
    const users =
      {
        1: user1,
        3: user3,
      }
    const comment1 = { id: 1, author: 1 }
    const comment2 = { id: 2, author: 3 }
    const comments =
      {
        1: comment1,
        2: comment2,
      }
    const expectedPullRequestData = {
      comments: [],
    }
    const pullRequests = {
      12: {
        ...expectedPullRequestData,
        otherAttribute: 'otherAttribute',
        owner: 1,
        comments: [1, 2],
      },
    }
    const state = {
      entities: {
        pullRequests,
        users,
        comments,
      },
    }
    const props = { params: {} }
    expect(getPRequest(state, props)).to.deep.eql(expectedPullRequestData)
  })
})
