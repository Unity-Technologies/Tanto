import chai from 'chai'
import {
  isCurrentUserOwner,
} from '../index'

const expect = chai.expect

describe('PullRequestDiscussion selectors', () => {
  it('isCurrentUserOwner should return false', () => {
    const pullRequests = {
      12: {
        id: 12,
        owner: 12,
      },
    }
    const state = {
      entities: {
        me: { id: 13 },
        pullRequests,
      },
    }
    const props = {
      params: { prid: 12 },
    }
    expect(isCurrentUserOwner(state, props)).to.eql(false)
  })
  it('isCurrentUserOwner should return true', () => {
    const pullRequests = {
      12: {
        id: 12,
        owner: 12,
      },
    }
    const state = {
      entities: {
        me: { id: 12 },
        pullRequests,
      },
    }
    const props = {
      params: { prid: 12 },
    }
    expect(isCurrentUserOwner(state, props)).to.eql(true)
  })
  it('no PRs in state: isCurrentUserOwner should return null', () => {
    const state = {
      entities: {
        me: { id: 12 },
      },
    }
    const props = {
      params: { prid: 12 },
    }
    expect(isCurrentUserOwner(state, props)).to.eql(null)
  })
  it('no state.me: isCurrentUserOwner should return null', () => {
    const pullRequests = {
      12: {
        id: 12,
        owner: 12,
      },
    }
    const state = {
      entities: {
        pullRequests,
      },
    }
    const props = {
      params: { prid: 12 },
    }
    expect(isCurrentUserOwner(state, props)).to.eql(null)
  })
  it('empty state.entities: isCurrentUserOwner should return null', () => {
    const state = {
      entities: {},
    }
    const props = {
      params: { prid: 12 },
    }
    expect(isCurrentUserOwner(state, props)).to.eql(null)
  })
  it('empty props: isCurrentUserOwner should return null', () => {
    const pullRequests = {
      12: {
        id: 12,
        owner: 12,
      },
    }
    const state = {
      entities: {
        me: { id: 12 },
        pullRequests,
      },
    }
    const props = {}
    expect(isCurrentUserOwner(state, props)).to.eql(null)
  })
})
