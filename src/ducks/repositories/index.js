/* @flow */
/* eslint-disable  import/no-extraneous-dependencies */

import type { RepositoryType, GroupType } from 'services/ono/queries/repositories'
export type { RepositoryType, GroupType } from 'services/ono/queries/repositories'
import {
  entities,
  actions as entitiesActions,
  mergeEntities } from 'ducks/entities'
import { combineReducers } from 'redux'

/**
 * Action types
 */
export const types = {
  SET_REPOSITORIES: 'REPOSITORIES/SET_REPOSITORIES',
  SET_REPOSITORY: 'REPOSITORIES/SET_REPOSITORY',
  SET_REPOSITORIES_NAMES: 'REPOSITORIES/SET_REPOSITORIES_NAMES',
  SET_GROUPS: 'REPOSITORIES/SET_GROUPS',
  FETCH_REPOSITORIES: 'REPOSITORIES/FETCH_REPOSITORIES',
  SEARCH_REPOSITORY: 'REPOSITORIES/SEARCH_REPOSITORY',
  FETCH_REPOSITORY_BRANCHES: 'REPOSITORIES/FETCH_REPOSITORY_BRANCHES',
}

/**
 * Initial state
 */
const initialState = {
  entities: {},
  groups: {},
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
}


export const groups = (state: Object= {}, action: Object): Object => {
  switch (action.type) {
    case types.SET_GROUPS:
      return mergeEntities(state, entitiesActions.setEntities(action.nodes))
    default:
      return state
  }
}

export const names = (state: Array<string> = [], action: Object): Array<string> => (
  action.type === types.SET_REPOSITORIES_NAMES ? action.nodes : state)

export const entitiesReducer = combineReducers({
  entities,
  groups,
  names,
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
    default:
      return entitiesReducer(state, action)
  }
}

export const setRepositories =
  (nodes: Array<RepositoryType>): Object => ({ type: types.SET_REPOSITORIES, nodes })
export const setRepository =
  (node: RepositoryType): Object => ({ type: types.SET_REPOSITORY, node })
export const setGroups = (nodes: Array<GroupType>): Object => ({ type: types.SET_GROUPS, nodes })
export const fetchRepositories =
  (name: string): Object => ({ type: types.FETCH_REPOSITORIES, name })
export const setRepositoriesNames =
  (nodes: Array<string>): Object => ({ type: types.SET_REPOSITORIES_NAMES, nodes })
export const searchRepository =
  (filter: string, first: string): Object =>
    ({ type: types.SEARCH_REPOSITORY, filter, first })
export const fetchRepositoryBranches =
  (name: string): Object => ({ type: types.FETCH_REPOSITORY_BRANCHES, name })

/**
 * Actions
 */
export const actions = {
  setRepositories,
  setRepository,
  setRepositoriesNames,
  setGroups,
  fetchRepositories,
  searchRepository,
  fetchRepositoryBranches,
}
