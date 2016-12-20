import chai from 'chai'
import { reduceArrayToObj } from 'ducks/normalizer'
import {
  entities,
  error,
  actions,
  types,
  isFetching,

} from '../index'


const expect = chai.expect
const chaiSubset = require('chai-subset')
chai.use(chaiSubset)

describe('entities actions', () => {
  it('request error', () => {
    const errorMessage = 'test error'
    const action = {
      type: types.REQUEST_ERROR,
      error: errorMessage,
    }
    expect(actions.requestError(errorMessage)).to.eql(action)
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

  it('sets entities with default id attribute', () => {
    const nodes = [1, 2, 3]
    const idAttribute = 'id'
    const action = {
      type: types.SET,
      nodes,
      idAttribute,
    }
    expect(actions.setEntities(nodes)).to.eql(action)
  })

  it('sets entities with id attribute', () => {
    const nodes = [1, 2, 3]
    const idAttribute = 'name'
    const action = {
      type: types.SET,
      nodes,
      idAttribute,
    }
    expect(actions.setEntities(nodes, idAttribute)).to.eql(action)
  })
})

describe('entities error reducer', () => {
  it('should handle REQUEST_ERROR', () => {
    const errorMessage = 'test error'
    const action = actions.requestError(errorMessage)
    expect(error('another error', action)).to.eql(errorMessage)
  })

  it('should handle CLEAR_ERROR', () => {
    const action = actions.clearError()
    expect(error('error', action)).to.eql({ message: '' })
  })
})

describe('entities isFetching reducer', () => {
  it('should handle SENDING_REQUEST - true', () => {
    const action = actions.sendingRequest(true)
    expect(isFetching(false, action)).to.eql(true)
  })

  it('should handle SENDING_REQUEST - false', () => {
    const action = actions.sendingRequest(false)
    expect(isFetching(true, action)).to.eql(false)
  })
})

describe('entities reducer', () => {
  it('should handle SET', () => {
    const nodes = [{ id: 1, title: 'test1' }, { id: 4, title: 'test41' }, { id: 3, title: 'test3' }]
    const action = actions.setEntities(nodes)
    expect(entities({}, action)).to.eql(reduceArrayToObj(nodes))
  })

  it('should handle merge new entites', () => {
    const nodes = [
      { id: 1, title: 'test1', description: 'test description1' },
      { id: 4, title: 'test41' }]
    const action = actions.setEntities(nodes)
    const state = {
      1: { id: 1, title: 'test1' },
    }
    const expected = {
      1: { id: 1, title: 'test1', description: 'test description1' },
      4: { id: 4, title: 'test41' },
    }
    expect(entities(state, action)).to.eql(expected)
  })


  it('should handle replace existing values with new ones', () => {
    const nodes = [
      { id: 1, title: 'test1new', user: 'testuser2', description: 'test description1' },
      { id: 4, title: 'test41' }]
    const action = actions.setEntities(nodes)

    const state = {
      1: { id: 1, title: 'test1', user: 'testuser' },
    }
    const expected = {
      1: { id: 1, title: 'test1new', user: 'testuser2', description: 'test description1' },
      4: { id: 4, title: 'test41' },
    }
    expect(entities(state, action)).to.eql(expected)
  })

  it('should not remove missing fields', () => {
    const nodes = [
      { id: 1, description: 'test description1 new' },
      { id: 4, title: 'test41' }]
    const action = actions.setEntities(nodes)

    const state = {
      1: { id: 1, title: 'test1', user: 'testuser2', description: 'test description1' },
    }
    const expected = {
      1: { id: 1, title: 'test1', user: 'testuser2', description: 'test description1 new' },
      4: { id: 4, title: 'test41' },
    }
    expect(entities(state, action)).to.eql(expected)
  })
})

