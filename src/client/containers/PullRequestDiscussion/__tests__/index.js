import chai from 'chai'
import {
  getPullRequestDiscussion,
} from '../PullRequestDiscussion'
import { types } from 'ducks/pullrequests/actions'

const expect = chai.expect

describe('getPullRequestDiscussion', () => {
  it('full data', () => {
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
    const expectedPullRequest = {
      description: 'testdescription',
      created: '2017-02-28',
      owner: user1,
      comments: [
          { ...comment1, author: user1 },
          { ...comment2, author: user3 },
      ],
    }
    const pullRequests = {
      12: {
        ...expectedPullRequest,
        otherAttribute: 'otherAttribute',
        owner: 1,
        comments: [1, 2],
      },
    }
    const state = {
      fetch: { [types.FETCH_PULL_REQUEST_DISCUSSION]: {} },
      entities: {
        pullRequests,
        users,
        comments,
      },
      session: {
        profile: {
          fullName: 'userName',
        },
      },
    }
    const status = {
      isFetching: false,
      error: null,
    }
    const props = {
      params: {
        prid: 12,
      },
      status,
    }
    const expectedData = {
      pullRequest: expectedPullRequest,
      user: 'userName',
      status,
    }
    expect(getPullRequestDiscussion(state, props)(state, props)).to.deep.eql(expectedData)
  })
})
