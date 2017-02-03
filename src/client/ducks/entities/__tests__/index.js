import chai from 'chai'
import {
  merge,
} from '../index'

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
})

