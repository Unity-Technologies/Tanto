/* @flow */
import {
  entities,
  actions as entitiesActions,
  mergeEntities } from 'ducks/entities'
import { combineReducers } from 'redux'
import { types } from './actions'


/**
 * Initial state
 */
const initialState = {
  entities: {},
  groups: {},
  names: [],
}

export type RepositoryDictionary = {
  [id: string]: Object
}

export type GroupDictionary = {
  [name: string]: Object
}

export type StateType = {
  groups: GroupDictionary,
  entities: RepositoryDictionary,
  names: Array<Object>
}


export const groupsReducer = (state: Object= {}, action: Object): Object => {
  switch (action.type) {
    case types.SET_GROUPS:
      return mergeEntities(state, entitiesActions.setEntities(action.nodes))
    default:
      return state
  }
}

export const namesReducer = (state: Array<Object> = [], action: Object): Array<Object> => (
  action.type === types.SET_REPOSITORIES_NAMES ? action.nodes : state)

export const entitiesReducer = combineReducers({
  entities,
  groups: groupsReducer,
  names: namesReducer,
})

/**
 * Repositories reducer
 */
export default (
  state: StateType = initialState, action: Object): StateType => {
  switch (action.type) {
    case types.SET_REPOSITORIES:
      return entitiesReducer(state, entitiesActions.setEntities(action.nodes))
    case types.SET_REPOSITORY:
      return entitiesReducer(state, entitiesActions.setEntity(action.node))
    case types.SET_REPOSITORIES_NAMES:
    case types.SET_GROUPS:
      return entitiesReducer(state, action)
    default:
      return state
  }
}


export const searchRepository =
  (filter: string, limit: number): Object =>
    ({ type: types.SEARCH_REPOSITORY, filter, limit })
