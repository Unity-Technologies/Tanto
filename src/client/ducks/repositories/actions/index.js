/* @flow */

import { fetchActionCreator } from 'ducks/fetch'
import repositoriesQuery from '../queries/repositories.graphql'
import repoBranchesQuery from '../queries/branches.graphql'
import repository from '../queries/repository.graphql'

/**
 * Action types
 */
export const types = {
  FETCH_REPOSITORIES: 'REPOSITORIES/FETCH_REPOSITORIES',
  FETCH_REPOSITORY: 'REPOSITORIES/FETCH_REPOSITORY',
  SEARCH_REPOSITORY: 'REPOSITORIES/SEARCH_REPOSITORY',
  FETCH_REPOSITORY_BRANCHES: 'REPOSITORIES/FETCH_REPOSITORY_BRANCHES',
}

export const operationNames = {
  repositoriesNested: 'repositoriesNested',
  repositoriesTopLevel: 'repositoriesTopLevel',
}

/**
 * Action creators
 */
export const searchRepository =
  (filter: string, limit: number): Object =>
    ({ type: types.SEARCH_REPOSITORY, filter, limit })

export const fetchRepository = (name: string): Object =>
  fetchActionCreator(types.FETCH_REPOSITORY, repository, { name })

export const fetchRepositoryBranches = (id: number): Object =>
  fetchActionCreator(types.FETCH_REPOSITORY_BRANCHES, repoBranchesQuery, { id })

export const fetchRepositories = (name: string): Object =>
  fetchActionCreator(types.FETCH_REPOSITORIES, repositoriesQuery, { name },
    name ? operationNames.repositoriesNested : operationNames.repositoriesTopLevel
  )
