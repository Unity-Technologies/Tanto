
import chai from 'chai'
import reducer, {
  namesReducer,
  types,
} from '../index'

import { reduceArrayToObj } from 'ducks/normalizer'

const expect = chai.expect

describe('repositories actions', () => {

})

describe('repositories reducer', () => {
  it('should return initial state', () => {
    const initialState = {
      entities: {},
      groups: {},
      names: [],
    }

    expect(reducer(undefined, {})).to.eql(initialState)
  })


  it('should handle SET_REPOSITORIES', () => {
    const nodes = [
      {
        id: 1,
        name: 'testProject',
        description: 'testProject description',
      },
      {
        id: 2,
        name: 'testProject2',
        description: 'testProject description2',
      },
      {
        id: 3,
        name: 'testProject3',
        description: 'testProject description3',
      },
    ]

    const state = {
      entities: reduceArrayToObj(nodes),
    }
    const action = {
      type: types.SET_REPOSITORIES,
      nodes,
    }
    expect(reducer({}, action)).to.containSubset(state)
  })

  it('should handle SET_GROUPS', () => {
    const nodes = [
      {
        id: 1,
        name: 'testProject',
        description: 'testProject description',
      },
      {
        id: 2,
        name: 'testProject2',
        description: 'testProject description2',
      },
      {
        id: 3,
        name: 'testProject3',
        description: 'testProject description3',
      },
    ]

    const state = {
      groups: reduceArrayToObj(nodes),
    }

    const action = {
      type: types.SET_GROUPS,
      nodes,
    }
    expect(reducer({}, action)).to.containSubset(state)
  })

  it('should handle SET_REPOSITORIES_NAMES', () => {
    const nodes = [
      {
        id: 1,
        fullName: 'testProject',
      },
      {
        id: 2,
        fullName: 'testProject2',
      },
      {
        id: 3,
        fullName: 'testProject3',
      },
    ]

    const state = {
      groups: {},
      entities: {},
      names: nodes,
    }

    const action = {
      type: types.SET_REPOSITORIES_NAMES,
      nodes,
    }
    expect(reducer({}, action)).to.eql(state)
  })

  it('should handle SET_REPOSITORY', () => {
    const node = {
      id: 1,
      name: 'testProject',
      description: 'testProject description',
    }

    const action = {
      type: types.SET_REPOSITORY,
      node,
    }

    const initialState = {
      entities: {
        3: {
          id: 3,
          name: 'testProject3',
          description: 'testProject description3',
        },
      },
    }
    const state = {
      entities: {
        3: {
          id: 3,
          name: 'testProject3',
          description: 'testProject description3',
        },
        1: {
          id: 1,
          name: 'testProject',
          description: 'testProject description',
        },
      },
    }
    expect(reducer(initialState, action)).to.containSubset(state)
  })

  it('should return state for not recognized action types', () => {
    const name = 'groupname'

    const action = {
      type: 'ANY',
      name,
    }
    const initialState = {
      entities: {
        1: {
          name: 'test',
        },
      },
      groups: {
        group1: {
          name: 'group1',
        },
      },
      names: ['test'],
    }

    expect(reducer(initialState, action)).to.containSubset(initialState)
  })
})

describe('repositories names reducer', () => {
  it('should handle SET_REPOSITORIES_NAMES', () => {
    const nodes = [
      {
        id: 1,
        fullName: 'testProject',
      },
      {
        id: 2,
        fullName: 'testProject2',
      },
      {
        id: 3,
        fullName: 'testProject3',
      },
    ]
    const action = {
      type: types.SET_REPOSITORIES_NAMES,
      nodes,
    }

    expect(namesReducer([], action)).to.eql(nodes)
  })

  it('should not handle not recognized action', () => {
    const nodes = [
      {
        id: 1,
        fullName: 'testProject',
      },
      {
        id: 2,
        fullName: 'testProject2',
      },
      {
        id: 3,
        fullName: 'testProject3',
      },
    ]
    const action = {
      type: types.ANY,
      nodes,
    }

    expect(namesReducer(nodes, action)).to.eql(nodes)
  })
})
