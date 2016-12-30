/* @flow */
/* eslint-disable  import/no-extraneous-dependencies */

import type { RepositoryType } from 'services/ono/queries/repositories'
export type { RepositoryType } from 'services/ono/queries/repositories'
import {
  entities,
  actions as entitiesActions,
  mergeEntities } from 'ducks/entities'
import { combineReducers } from 'redux'
import { fetchActionCreator } from 'ducks/fetch'

import {
  query,
  parseRepositories,
  REPOSITORY_BRANCHES,
  parseRepository,
} from 'services/ono/queries/repositories'

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


export const groups = (state: Object= {}, action: Object): Object => {
  switch (action.type) {
    case types.SET_GROUPS:
      return mergeEntities(state, entitiesActions.setEntities(action.nodes))
    default:
      return state
  }
}

export const names = (state: Array<Object> = [], action: Object): Array<Object> => (
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
    case types.SET_REPOSITORIES_NAMES:
    case types.SET_GROUPS:
      return entitiesReducer(state, action)
    default:
      return state
  }
}


export const setRepository =
  (node: RepositoryType): Object => ({ type: types.SET_REPOSITORY, node })

export const setRepositoriesNames =
  (nodes: Array<Object>): Object => ({ type: types.SET_REPOSITORIES_NAMES, nodes })

export const searchRepository =
  (filter: string, first: number): Object =>
    ({ type: types.SEARCH_REPOSITORY, filter, first })


export const fetchRepositoryBranches = (id: number): Object =>
  fetchActionCreator(types.FETCH_REPOSITORY_BRANCHES, { id }, REPOSITORY_BRANCHES,
    (data: Object, cbArgs: Object): Array<Object> =>
      [{ type: types.SET_REPOSITORY, node: parseRepository(data) }])

export const fetchRepositories = (name: string): Object =>
  fetchActionCreator(types.FETCH_REPOSITORIES, { name }, query(name),
    (data: Object, cbArgs: Object): Array<Object> => {
      const { groups, repositories } = parseRepositories(data)
      return [
        { type: types.SET_REPOSITORIES, nodes: repositories },
        { type: types.SET_GROUPS, nodes: groups },
      ]
    }
  )

/**
 * Actions
 */
export const actions = {
  setRepository,
  setRepositoriesNames,
  fetchRepositories,
  searchRepository,
  fetchRepositoryBranches,
}
