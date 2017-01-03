/* @flow */

import { createSelector } from 'reselect'
import { isFetchingSelector, errorSelector } from 'ducks/fetch'
import { types } from '../index'
import _ from 'lodash'

export const repoEntitiesSelector = (state : Object, props: Object): Object => {
  const parentGroupName = props.params.splat || null
  return _.pickBy(state.repositories.entities, repo => (repo.groupPath === parentGroupName))
}

export const repositories = createSelector(
  repoEntitiesSelector,
  repoEntities => _.values(repoEntities)
)

export const groupsEntitiesSelector = (state: Object, props: Object): Object => {
  const parentGroupName = props.params.splat || null
  return _.pickBy(state.repositories.groups, group => (group.parentGroupName === parentGroupName))
}

export const groups = createSelector(
  groupsEntitiesSelector,
  groupsEntities => _.values(groupsEntities)
)

type StateType = {
  fetch: {
    [key: string]: {
      isFetching: boolean,
      error: Object
    }
  }
}

export const isFetching =
  (state: StateType): boolean => isFetchingSelector(types.FETCH_REPOSITORIES)(state)
export const error =
  (state: StateType): Object => errorSelector(types.FETCH_REPOSITORIES)(state)


export const isSearchingRepository =
  (state: StateType): boolean => isFetchingSelector(types.SEARCH_REPOSITORY)(state)
export const searchRepositoryError =
  (state: StateType): Object => errorSelector(types.SEARCH_REPOSITORY)(state)

export const repoBranchesSelector =
  (state: Object, props: Object): Array<Object> => {
    const repo = state.repositories.entities[props.repoId]
    return repo && repo.branches ? repo.branches : []
  }
export const branchesSelector = createSelector(
  repoBranchesSelector,
  repoBranches => repoBranches.map(x => ({ label: x.name, value: x.revision }))
)

export const repoNamesSelector = (state: Object): Array<Object> => state.repositories.names
export const repositoriesNames = createSelector(
  repoNamesSelector,
  repoNames => repoNames.map(x => ({ label: x.fullName, value: x.id }))
)

export const repoNameSelector = (state: Object, props: Object): any =>
  _.findKey(state.repositories.entities, { fullName: props.params.splat })

export const getRepositoryId = createSelector(
  repoNameSelector,
  repoName => repoName
)
