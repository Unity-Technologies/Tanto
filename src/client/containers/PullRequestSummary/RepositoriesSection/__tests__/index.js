import chai from 'chai'
import {
  getRepositoriesData,
} from '../index'

const expect = chai.expect

describe('getRepositoriesData', () => {
  it('full data', () => {
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
})
