import chai from 'chai'
import {
  merge,
  queryCustomizer,
  mutationCustomizer,
  types,
  entities,
} from '../index'
// import { schema } from 'normalizr'
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

  it('merge for query request should concat fields of Array type', () => {
    const state = {
      nodes: {
        1: { id: 1, title: 'test1', user: 'testuser', comments: [{ id: 12, text: 12 }, { id: 122, text: 122 }] },
      },
    }
    const data = {
      nodes: {
        1: { id: 1, title: 'test1new', user: 'testuser2', description: 'test description1', comments: [{ id: 13, text: 13 }] },
        4: { id: 4, message: 'messagewe' },
      },
    }

    const expected = {
      nodes: {
        1: {
          id: 1,
          title: 'test1new', user: 'testuser2', description: 'test description1', comments: [{ id: 12, text: 12 }, { id: 122, text: 122 }, { id: 13, text: 13 }],
        },
        4: { id: 4, message: 'messagewe' } },
    }

    expect(merge(state, data, queryCustomizer)).to.eql(expected)
  })

  it('merge for mutation request should replace fields of Array type', () => {
    const state = {
      nodes: {
        1: { id: 1, title: 'test1', user: 'testuser', comments: [{ id: 12, text: 12 }, { id: 122, text: 122 }] },
      },
    }
    const data = {
      nodes: {
        1: { id: 1, title: 'test1new', user: 'testuser2', description: 'test description1', comments: [{ id: 13, text: 13 }] },
        4: { id: 4, message: 'messagewe' },
      },
    }

    const expected = {
      nodes: {
        1: {
          id: 1,
          title: 'test1new', user: 'testuser2', description: 'test description1', comments: [{ id: 13, text: 13 }],
        },
        4: { id: 4, message: 'messagewe' },
      },
    }

    expect(merge(state, data, mutationCustomizer)).to.eql(expected)
  })
})

describe('entities reducer', () => {
  it('should handle SET_QUERIED_ENTITIES', () => {
    const initialState = {
      entities: {
        pullRequests: {
          12: {
            id: 12,
            comments: [1, 2],
          },
        },
        comments: {
          1: { id: 1, text: 12, author: 12 },
          2: { id: 2, text: 122, author: 122 },
        },
      },
    }

    const action = {
      type: types.SET_QUERIED_ENTITIES,
      entities: {
        entities: {
          pullRequests: {
            12: {
              id: 12,
              comments: [1, 2, 3],
            },
          },
          comments: {
            3: { id: 3, text: 1222, author: 1222 },
          },
        },
      },
    }

    const expected = {
      entities: {
        pullRequests: {
          12: {
            id: 12,
            comments: [1, 2, 3],
          },
        },
        comments: {
          1: { id: 1, text: 12, author: 12 },
          2: { id: 2, text: 122, author: 122 },
          3: { id: 3, text: 1222, author: 1222 },
        },
      },
    }

    expect(entities(initialState, action)).to.eql(expected)
  })

  it('should handle SET_MUTATED_ENTITIES', () => {
    const initialState = {
      entities: {
        pullRequests: {
          12: {
            id: 12,
            comments: [1, 2],
          },
        },
        comments: {
          1: { id: 1, text: 12, author: 12 },
          2: { id: 2, text: 122, author: 122 },
        },
      },
    }

    const action = {
      type: types.SET_MUTATED_ENTITIES,
      entities: {
        entities: {
          pullRequests: {
            12: {
              id: 12,
              comments: [3],
            },
          },
          comments: {
            3: { id: 3, text: 1222, author: 1222 },
          },
        },
      },
    }

    const expected = {
      entities: {
        pullRequests: {
          12: {
            id: 12,
            comments: [3],
          },
        },
        comments: {
          1: { id: 1, text: 12, author: 12 },
          2: { id: 2, text: 122, author: 122 },
          3: { id: 3, text: 1222, author: 1222 },
        },
      },
    }

    expect(entities(initialState, action)).to.eql(expected)
  })


  it('should return state for unknown actions type', () => {
    const initialState = {
      entities: {
        pullRequests: {
          12: {
            id: 12,
            comments: [1, 2],
          },
        },
        comments: {
          1: { id: 1, text: 12, author: 12 },
          2: { id: 2, text: 122, author: 122 },
        },
      },
    }

    const action = {
      type: 'STRANGE_ACTION',
      entities: {
        entities: {
          pullRequests: {
            12: {
              id: 12,
              comments: [3],
            },
          },
          comments: {
            3: { id: 3, text: 1222, author: 1222 },
          },
        },
      },
    }

    expect(entities(initialState, action)).to.eql(initialState)
  })

  it('no entities in action', () => {
    const initialState = {
      entities: {
        pullRequests: {
          12: {
            id: 12,
            comments: [1, 2],
          },
        },
        comments: {
          1: { id: 1, text: 12, author: 12 },
          2: { id: 2, text: 122, author: 122 },
        },
      },
    }

    const action = {
      type: 'STRANGE_ACTION',
      no_entities: {
        entities: {
          pullRequests: {
            12: {
              id: 12,
              comments: [3],
            },
          },
          comments: {
            3: { id: 3, text: 1222, author: 1222 },
          },
        },
      },
    }

    expect(entities(initialState, action)).to.eql(initialState)
  })
})
