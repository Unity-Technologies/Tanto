import chai from 'chai'
import {
  getRepositoriesData,
} from '../index'

const expect = chai.expect

describe('PullRequestSummary/RepositoriesSection selectors', () => {
  it('getRepositoriesData, full data', () => {
    const expectedData = {
      origin: 'origin',
      target: 'target',
    }
    const pullRequests = {
      12: {
        ...expectedData,
        otherParameter: 'otherParameter',
      },
    }
    const state = {
      entities: {
        pullRequests,
      },
    }
    const props = {
      params: {
        prid: 12,
      },
    }
    expect(getRepositoriesData(state, props)(state, props)).to.deep.eql(expectedData)
  })
  it('getRepositoriesData, no pr (no prid in props)', () => {
    const expectedData = {}
    const pullRequests = {
      12: {
        ...expectedData,
        otherParameter: 'otherParameter',
      },
    }
    const state = {
      entities: {
        pullRequests,
      },
    }
    const props = {
      params: {},
    }
    expect(getRepositoriesData(state, props)(state, props)).to.deep.eql(expectedData)
  })
  it('getRepositoriesData, no pr in state', () => {
    const expectedData = {}
    const state = {
      entities: {},
    }
    const props = {
      params: {
        prid: 12,
      },
    }
    expect(getRepositoriesData(state, props)(state, props)).to.deep.eql(expectedData)
  })
})
