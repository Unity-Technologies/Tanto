import chai from 'chai'
import {
  setEntities,
  mergeEntities,
  entities,
  error,
  actions,
  types,

} from '../index'

const expect = chai.expect
const chaiSubset = require('chai-subset')
chai.use(chaiSubset)


describe('pull request actions', () => {
  it('request error', () => {
    const error = 'test error'
    const action = {
      type: types.REQUEST_ERROR,
      error,
    }
    expect(actions.requestError(error)).to.eql(action)
  })

  it('clear error', () => {
    const action = {
      type: types.CLEAR_ERROR,
    }
    expect(actions.clearError()).to.eql(action)
  })

  it('sending request', () => {
    const action = {
      type: types.SENDING_REQUEST,
      sending: true,
    }
    expect(actions.sendingRequest(true)).to.eql(action)
  })
})

describe('entities error reducer', () => {
  it('should handle REQUEST_ERROR', () => {
    const errorMessage = 'test error'
    const action = actions.requestError(errorMessage)
    expect(error({}, action)).to.eql(errorMessage)
  })
})

