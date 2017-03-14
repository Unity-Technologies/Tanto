import chai from 'chai'
import {
  merge,
  appendEntity,
} from '../index'
import { schema } from 'normalizr'
const expect = chai.expect
const chaiSubset = require('chai-subset')
chai.use(chaiSubset)


describe('entities merge', () => {
  it('should handle merge new entites', () => {
    const nodes = {
      nodes: [
        { id: 1, title: 'test1', description: 'test description1' },
        { id: 4, title: 'test41' }],
    }
    const state = {
      nodes: [{ id: 1, title: 'test1' }],
    }
    const expected = {
      nodes: [
        { id: 1, title: 'test1', description: 'test description1' },
        { id: 4, title: 'test41' },
      ],
    }
    expect(merge(state, nodes)).to.eql(expected)
  })

  it('should handle replace existing values with new ones', () => {
    const nodes = {
      nodes: [
        { id: 1, title: 'test1new', user: 'testuser2', description: 'test description1' },
        { id: 4, title: 'test41' }],
    }

    const state = {
      nodes: [{ id: 1, title: 'test1', user: 'testuser' }],
    }
    const expected = {
      nodes: [
        { id: 1, title: 'test1new', user: 'testuser2', description: 'test description1' },
        { id: 4, title: 'test41' }],
    }
    expect(merge(state, nodes)).to.eql(expected)
  })

  it('should not remove missing fields', () => {
    const state = {
      nodes: {
        1: { id: 1, title: 'test1', user: 'testuser' },
      },
    }
    const nodes = {
      nodes: {
        1: { id: 1, title: 'test1new', user: 'testuser2', description: 'test description1' },
        4: { id: 4, message: 'messagewe' },
      },
    }

    const expected = {
      nodes: {
        1: { id: 1, title: 'test1new', user: 'testuser2', description: 'test description1' },
        4: { id: 4, message: 'messagewe' } },
    }

    expect(merge(state, nodes)).to.eql(expected)
  })

  it('should handle merge new entity', () => {
    const nodes = { nodes: [{ id: 1, title: 'test1', description: 'test description1' }] }
    const state = {
      nodes: [{ id: 1, title: 'test1' }],
    }
    const expected = {
      nodes: [{ id: 1, title: 'test1', description: 'test description1' }],
    }
    expect(merge(state, nodes)).to.eql(expected)
  })

  it('should handle replace existing values with new ones', () => {
    const nodes = {
      nodes:
      [{ id: 1, title: 'test1new', user: 'testuser2', description: 'test description1' }],
    }

    const state = {
      nodes: [{ id: 1, title: 'test1', user: 'testuser2' }],
    }
    const expected = {
      nodes: [{ id: 1, title: 'test1new', user: 'testuser2', description: 'test description1' }],
    }
    expect(merge(state, nodes)).to.eql(expected)
  })

  it('should not remove missing fields', () => {
    const nodes = { nodes: { 1: { id: 1, description: 'test description1 new' } } }

    const state = {
      nodes: { 1: { id: 1, title: 'test1', user: 'testuser2', description: 'test description1' } },
    }
    const expected = {
      nodes: {
        1:
        { id: 1, title: 'test1', user: 'testuser2', description: 'test description1 new' },
      },
    }
    expect(merge(state, nodes)).to.eql(expected)
  })

  it('should not create new instance of state object', () => {
    const nodes = {
      nodes:
      [{ id: 1, title: 'test1', user: 'testuser2', description: 'test description1' },
      ],
    }

    const state = {
      nodes: [{ id: 1, title: 'test1', user: 'testuser2', description: 'test description1' }],
    }

    expect(merge(state, nodes)).to.equal(state)
  })

  it('merge by id and accept upstream for certain keys', () => {
    const nodes = {
      reviews: [{ user: 1, status: null }],
      missingReviewers: [{ area: 'x', reviewers: [{ id: 2, username: 'y' }] }],
      nodes: [{ id: 2 }],
    }

    const state = {
      reviews: [{ user: 2, status: null }, { user: 1, status: null }],
      missingReviewers: [
        { area: 'x', reviewers: [{ id: 2, username: 'y' }, { id: 1, username: 'x' }] }],
      nodes: [{ id: 3 }, { id: 2 }],
    }

    const expected = {
      reviews: [{ user: 1, status: null }],
      missingReviewers: [{ area: 'x', reviewers: [{ id: 2, username: 'y' }] }],
      nodes: [{ id: 2 }, { id: 3 }],
    }

    expect(merge(state, nodes)).to.eql(expected)
  })
})

describe('appendEntity', () => {
  it('should merge input with existing object if there', () => {
    const id = '2'
    const entityBefore = { text: 'test', number: 24, id }
    const entityToAdd = { text: 'anothertest', id, email: 'test@test.test' }
    const expectedEntity = { text: 'anothertest', number: 24, id, email: 'test@test.test' }

    const initialState = { objects: {}, otherObjects: 'dont change this' }
    initialState.objects[id] = entityBefore

    const expectedState = { objects: {}, otherObjects: 'dont change this' }
    expectedState.objects[id] = expectedEntity

    const objectSchema = new schema.Entity('objects')

    expect(appendEntity(initialState, ['objects'], [], entityToAdd, objectSchema)).to.eql(expectedState)
  })

  it('should append references to specified lists', () => {
    const initialList = [2, 4, 5]
    const initialState = { objects: {}, path: { to: { refs: initialList } } }
    const entityToAdd = { id: 7, data: 'test' }
    const expectedList = [2, 4, 5, 7]

    const expectedState = { objects: { 7: entityToAdd }, path: { to: { refs: expectedList } } }
    const objectSchema = new schema.Entity('objects')

    expect(appendEntity(initialState, ['objects'], [['path', 'to', 'refs']], entityToAdd, objectSchema)).to.eql(expectedState)
  })

  it('should do nothing if the entity destination is nonexistant', () => {
    const initialState = { objects: {}, otherObjects: 'dont change this' }
    const entityToAdd = { text: 'anothertest', id: '2', email: 'test@test.test' }
    expect(appendEntity(initialState, ['notThere'], [], entityToAdd, null)).to.eql(initialState)
  })

  it('should do nothing if the input enitity has no id', () => {
    const initialState = { objects: {}, otherObjects: 'dont change this' }
    const entityToAdd = { text: 'anothertest', email: 'test@test.test' }
    const objectSchema = new schema.Entity('objects')
    expect(appendEntity(initialState, ['objects'], [], entityToAdd, objectSchema)).to.eql(initialState)
  })
})
