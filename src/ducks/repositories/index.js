/* @flow */

import type { ProjectType, GroupType } from 'services/ono/queries/projects'
import {
  isFetching,
  error,
  entities,
  actions as entitiesActions,
  mergeEntities } from 'ducks/entities'
import { combineReducers } from 'redux'

/**
 * Action types
 */
export const types = {
  SET_REPOSITORIES: 'REPOSITORIES/SET_REPOSITORIES',
  SET_GROUPS: 'REPOSITORIES/SET_GROUPS',
  FETCH_REPOSITORIES: 'REPOSITORIES/FETCH_REPOSITORIES',
}


/**
 * Initial state
 */
const initialState = {
  error: null,
  isFetching: false,
  entities: {},
  groups: {},
}

export type RepositoryDictionary = {
  [id: string]: Object
}

export type GroupDictionary = {
  [name: string]: Object
}

export type RepositoryStateType = {
  error: ?string,
  isFetching: boolean,
  groups: GroupDictionary,
  entities: RepositoryDictionary,
}


export const groups = (state = {}, action) => {
  switch (action.type) {
    case types.SET_GROUPS:
      return mergeEntities(state, entitiesActions.setEntities(action.nodes))
    default:
      return state
  }
}

export const entitiesReducer = combineReducers({
  entities,
  error,
  isFetching,
  groups,
})

/**
 * Repositories reducer
 */
export default (
  state: RepositoryStateType = initialState, action: Object): RepositoryStateType => {
  switch (action.type) {
    case types.SET_REPOSITORIES:
      return entitiesReducer(state, entitiesActions.setEntities(action.nodes))
    case types.FETCH_REPOSITORIES:
      return entitiesReducer(state, action)
    default:
      return entitiesReducer(state, action)
  }
}

export const setRepositories =
  (nodes: Array<ProjectType>) => ({ type: types.SET_REPOSITORIES, nodes })
export const setGroups = (nodes: Array<GroupType>) => ({ type: types.SET_GROUPS, nodes })
export const fetchRepositories = (name: string) => ({ type: types.FETCH_REPOSITORIES, name })

/**
 * Actions
 */
export const actions = {
  setRepositories,
  setGroups,
  fetchRepositories,
}
