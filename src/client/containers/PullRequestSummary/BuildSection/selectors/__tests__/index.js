import chai from 'chai'
import {
  getPRSourceStamp,
} from '../index'

const expect = chai.expect

describe('PullRequestSummary selectors', () => {
  it('getPRSourceStamp should return full data', () => {
    const pullRequests = {
      12: {
        id: 12,
        owner: 12,
        origin: {
          revision: 'rev',
          repository: {
            fullName: 'repoName',
          },
        },
      },
    }
    const expectedData = {
      repository: 'repoName',
      revision: 'rev',
    }
    const state = {
      entities: {
        pullRequests,
      },
    }
    const props = {
      params: { prid: 12 },
    }
    expect(getPRSourceStamp(state, props)(state, props)).to.eql(expectedData)
  })
  it('no PRs in state.entities: getPRSourceStamp should return nulls', () => {
    const expectedData = {
      repository: null,
      revision: null,
    }
    const state = {
      entities: {},
    }
    const props = {
      params: { prid: 12 },
    }
    expect(getPRSourceStamp(state, props)(state, props)).to.eql(expectedData)
  })
  it('no state.entities: getPRSourceStamp should return nulls', () => {
    const expectedData = {
      repository: null,
      revision: null,
    }
    const state = {
      entities: {},
    }
    const props = {
      params: { prid: 12 },
    }
    expect(getPRSourceStamp(state, props)(state, props)).to.eql(expectedData)
  })
  it('empty props: getPRSourceStamp should return nulls', () => {
    const pullRequests = {
      12: {
        id: 12,
        owner: 12,
        origin: {
          revision: 'rev',
          repository: {
            fullName: 'repoName',
          },
        },
      },
    }
    const expectedData = {
      repository: null,
      revision: null,
    }
    const state = {
      entities: {
        pullRequests,
      },
    }
    const props = {}
    expect(getPRSourceStamp(state, props)(state, props)).to.eql(expectedData)
  })
})
