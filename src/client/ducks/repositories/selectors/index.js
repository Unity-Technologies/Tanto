/* @flow */

import { createSelector, createStructuredSelector } from 'reselect'
import { isFetchingSelector, errorSelector } from 'ducks/fetch'
import { types } from '../index'
import _ from 'lodash'

type StateType = {
  fetch: {
    [key: string]: {
      isFetching: boolean,
      error: Object
    }
  }
}


export const repoEntitiesSelector = (state : Object, props: Object): Object => {
  const parentGroupName = props.params.splat || null
  return _.pickBy(state.repositories.entities, repo => (repo.groupPath === parentGroupName))
}

export const getRepositories = createSelector(
  repoEntitiesSelector,
  repoEntities => _.values(repoEntities)
)

export const groupsEntitiesSelector = (state: Object, props: Object): Object => {
  const parentGroupName = props.params.splat || null
  return _.pickBy(state.repositories.groups, group => (group.parentGroupName === parentGroupName))
}

export const getGroups = createSelector(
  groupsEntitiesSelector,
  groupsEntities => _.values(groupsEntities)
)

export const getRepoFetchingStatus =
  (state: StateType): boolean => isFetchingSelector(types.FETCH_REPOSITORIES)(state)

export const getRepoFetchError =
  (state: StateType): Object => errorSelector(types.FETCH_REPOSITORIES)(state)

export const pathnameSelector = (state: Object): string =>
  state.routing.locationBeforeTransitions.pathname

export const getRepositoriesFetchState = createStructuredSelector({
  pathname: pathnameSelector,
  isFetching: getRepoFetchingStatus,
  error: getRepoFetchError,
  repositories: getRepositories,
  groups: getGroups,
})

export const getSearchRepoStatus =
  (state: StateType): boolean => isFetchingSelector(types.SEARCH_REPOSITORY)(state)
export const getSearchRepoError =
  (state: StateType): Object => errorSelector(types.SEARCH_REPOSITORY)(state)

export const repoNamesSelector = (state: Object): Array<Object> => state.repositories.names
export const getRepositoriesNames = createSelector(
  repoNamesSelector,
  repoNames => repoNames.map(x => ({ label: x.fullName, value: x.id }))
)

export const getSearchRepoResultState = createStructuredSelector({
  isFetching: getSearchRepoStatus,
  error: getSearchRepoError,
  options: getRepositoriesNames,
})

export const repoBranchesSelector =
  (state: Object, props: Object): Array<Object> => {
    const repo = state.repositories.entities[props.repoId]
    return repo && repo.branches ? repo.branches : []
  }

export const getRepositoryBranches = createSelector(
  repoBranchesSelector,
  repoBranches => repoBranches.map(x => ({ label: x.name, value: x.name }))
)

export const repoIdSelector = (state: Object, props: Object): any =>
  _.findKey(state.repositories.entities, { fullName: props.params.splat })

export const getRepositoryId = createSelector(
  repoIdSelector,
  repoId => repoId
)

