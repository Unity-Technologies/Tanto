/* @flow */

import { fetchOnoAction } from 'ducks/fetch'
import type { FetchAction } from 'ducks/fetch'
import repositoriesQuery from '../queries/repositories.graphql'
import repoBranchesQuery from '../queries/branches.graphql'
import repository from '../queries/repository.graphql'
import changelog from '../queries/changelog.graphql'

/**
 * Action types
 */
export const types = {
  FETCH_REPOSITORIES: 'REPOSITORIES/FETCH_REPOSITORIES',
  FETCH_REPOSITORY: 'REPOSITORIES/FETCH_REPOSITORY',
  SEARCH_REPOSITORY: 'REPOSITORIES/SEARCH_REPOSITORY',
  FETCH_REPOSITORY_BRANCHES: 'REPOSITORIES/FETCH_REPOSITORY_BRANCHES',
  FETCH_CHANGELOG: 'REPOSITORIES/FETCH_CHANGELOG',
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

export const fetchRepository = (name: string): FetchAction =>
  fetchOnoAction({ type: types.FETCH_REPOSITORY, query: repository, variables: { name } })

export const fetchChangelog = (name: string): FetchAction =>
  fetchAction({ type: types.FETCH_CHANGELOG, query: changelog, variables: { name } })

export const fetchRepositoryBranches = (id: number): FetchAction =>
  fetchOnoAction({
    type: types.FETCH_REPOSITORY_BRANCHES, query: repoBranchesQuery, variables: { id },
  })

export const fetchRepositories = (name: string): FetchAction =>
  fetchOnoAction({
    type: types.FETCH_REPOSITORIES,
    query: repositoriesQuery,
    variables: { name },
    operationName: name ? operationNames.repositoriesNested : operationNames.repositoriesTopLevel,
  })
