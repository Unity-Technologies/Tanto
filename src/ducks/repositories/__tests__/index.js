
import chai from 'chai'
import reducer, {
  actions,
  types,
  entitiesReducer,
} from '../index'

import { reduceArrayToObj } from 'ducks/normalizer'

const expect = chai.expect

describe('repositories actions', () => {
  it('setRepositories', () => {
    const nodes = [1, 2, 3]
    const action = {
      type: types.SET_REPOSITORIES,
      nodes,
    }
    expect(actions.setRepositories(nodes)).to.eql(action)
  })

  it('setGroups', () => {
    const nodes = [1, 2, 3]
    const action = {
      type: types.SET_GROUPS,
      nodes,
    }
    expect(actions.setGroups(nodes)).to.eql(action)
  })

  it('fetchRepositories', () => {
    const name = 'groupname'
    const action = {
      type: types.FETCH_REPOSITORIES,
      name,
    }
    expect(actions.fetchRepositories(name)).to.eql(action)
  })
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
    expect(reducer({}, actions.setRepositories(nodes))).to.containSubset(state)
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
    expect(reducer({}, actions.setGroups(nodes))).to.containSubset(state)
  })

  it('should handle ANY action by entities reducer', () => {
    const name = 'groupname'

    const action = {
      type: 'ANY',
      name,
    }
    const state = entitiesReducer({}, action)

    expect(reducer({}, actions.fetchRepositories(name))).to.containSubset(state)
  })
})
