/* @flow */

import { fetchActionCreator, fetchAction } from 'ducks/fetch'
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
  fetchAction({ type: types.FETCH_REPOSITORY, query: repository, variables: { name } })

export const fetchRepositoryBranches = (id: number): Object =>
  fetchAction({
    type: types.FETCH_REPOSITORY_BRANCHES, query: repoBranchesQuery, variables: { id },
  })

export const fetchRepositories = (name: string): Object =>
  fetchAction({
    type: types.FETCH_REPOSITORIES,
    query: repositoriesQuery,
    variables: { name },
    operationName: name ? operationNames.repositoriesNested : operationNames.repositoriesTopLevel,
  })
