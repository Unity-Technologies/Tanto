import chai from 'chai'
import { reduceArrayToObj } from 'ducks/normalizer'
import {
  entities,
  actions,
  types,
} from '../index'

const expect = chai.expect
const chaiSubset = require('chai-subset')
chai.use(chaiSubset)

describe('entities actions', () => {
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

