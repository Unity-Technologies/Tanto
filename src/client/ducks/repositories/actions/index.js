/* @flow */

import { fetchActionCreator } from 'ducks/fetch'
import type { RepositoryType, GroupType } from 'universal/types'
import repositoriesQuery from '../queries/repositories.graphql'
import repoBranchesQuery from '../queries/branches.graphql'

/**
 * Action types
 */
export const types = {
  SET_REPOSITORIES: 'REPOSITORIES/SET_REPOSITORIES',
  SET_REPOSITORY: 'REPOSITORIES/SET_REPOSITORY',
  SET_REPOSITORIES_NAMES: 'REPOSITORIES/SET_REPOSITORIES_NAMES',
  SET_GROUPS: 'REPOSITORIES/SET_GROUPS',
  FETCH_REPOSITORIES: 'REPOSITORIES/FETCH_REPOSITORIES',
  FETCH_REPOSITORY: 'REPOSITORIES/FETCH_REPOSITORY',
  SEARCH_REPOSITORY: 'REPOSITORIES/SEARCH_REPOSITORY',
  FETCH_REPOSITORY_BRANCHES: 'REPOSITORIES/FETCH_REPOSITORY_BRANCHES',
}

export const operationNames = {
  repositoriesNested: 'repositoriesNested',
  repositoriesTopLevel: 'repositoriesTopLevel',
}

export type ReturnType = {
  repositories: Array<RepositoryType>,
  groups: Array<GroupType>,
}

export function parseRepositories(data: any): ReturnType {
  const root = (data.data.group || data.data)
  return {
    repositories: root.repositories.nodes,
    groups: root.groups,
  }
}

export function parseAllRepositoriesNames(data: any): Array<Object> {
  return data ? data.data.repositories.nodes : []
}

export function parseRepository(data: any): Object {
  return data.data.repository
}

/**
 * Action creators
 */

export const setRepository =
  (node: RepositoryType): Object => ({ type: types.SET_REPOSITORY, node })

export const setRepositoriesNames =
  (nodes: Array<Object>): Object => ({ type: types.SET_REPOSITORIES_NAMES, nodes })

export const searchRepository =
  (filter: string, limit: number): Object =>
    ({ type: types.SEARCH_REPOSITORY, filter, limit })

export const fetchRepository = (name: string, queryStr: string): Object =>
  fetchActionCreator(types.FETCH_REPOSITORY, queryStr, { name }, '',
    (data: Object, cbArgs: Object): Array<Object> =>
      [{ type: types.SET_REPOSITORY, node: parseRepository(data) }])

export const fetchRepositoryBranches = (id: number): Object =>
  fetchActionCreator(types.FETCH_REPOSITORY_BRANCHES, repoBranchesQuery, { id }, '',
    (data: Object, cbArgs: Object): Array<Object> =>
      [{ type: types.SET_REPOSITORY, node: parseRepository(data) }])

export const fetchRepositories = (name: string): Object =>
  fetchActionCreator(types.FETCH_REPOSITORIES, repositoriesQuery, { name },
    name ? operationNames.repositoriesNested : operationNames.repositoriesTopLevel,
    (data: Object, cbArgs: Object): Array<Object> => {
      const { groups, repositories } = parseRepositories(data)
      return [
        { type: types.SET_REPOSITORIES, nodes: repositories },
        { type: types.SET_GROUPS, nodes: groups },
      ]
    }
  )
