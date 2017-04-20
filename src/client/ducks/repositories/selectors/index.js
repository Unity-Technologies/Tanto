/* @flow */

import { createSelector, createStructuredSelector } from 'reselect'
import { statusFetchFactory } from 'ducks/fetch/selectors'
import { types } from '../actions'
import _ from 'lodash'

/**
 * Denormalization
 */

const denormalizeRepo = (repo: Object, userEntities: Object) => {
  if (!repo || !repo.owner) {
    return repo
  }

  const denormalizedRepo = _.cloneDeep(repo)

  denormalizedRepo.owner = userEntities[denormalizedRepo.owner]

  return denormalizedRepo
}

const denormalizeGroup = (group: Object, groupEntities: Object, repoEntities: Object, userEntities: Object) => {
  if (!group) {
    return group
  }

  const repoReferences = _.get(group, ['repositories', 'nodes'], [])
  const groupReferences = _.get(group, ['groups', 'nodes'], [])

  const denormalizedGroup = _.cloneDeep(group)

  if (repoReferences.length) {
    denormalizedGroup.repositories.nodes = _.map(repoReferences, (ref) => _.get(repoEntities, [ref]))
    denormalizedGroup.repositories.nodes = _.map(denormalizedGroup.repositories.nodes, (r) => denormalizeRepo(r, userEntities))
  }

  if (groupReferences.length) {
    denormalizedGroup.groups.nodes = _.map(groupReferences, (ref) => _.get(groupEntities, [ref]))
  }

  return denormalizedGroup
}

/**
 * Selectors
 */


export const getPath = (state: Object, props: Object): string => (
  props.match.url
)

export const getFullName = (state: Object, props: Object): string => _.get(props, ['match', 'params', 'path'])

const getGroupEntities = (state: Object): Object => _.get(state, ['entities', 'groups'], null)

const getRepoEntities = (state: Object): Object => _.get(state, ['entities', 'repositories'], null)

const getUserEntities = (state: Object): Object => _.get(state, ['entities', 'users'], null)

export const getToplevelGroups = createSelector(getGroupEntities,
                                                (groups) => _.filter(_.values(groups), (g) => !g.parentGroupName))

export const getToplevelRepos = createSelector(getRepoEntities, getUserEntities,
                                               (repos, users) => _.map(_.filter(_.values(repos), (r) => !r.groupPath),
                                                                       (r) => denormalizeRepo(r, users)))

const getToplevelGroup = createSelector(getToplevelGroups, getToplevelRepos,
                                        (groups, repos) => ({ repositories: { nodes: repos }, groups: { nodes: groups } }))


const getGroup = createSelector(getFullName, getRepoEntities, getGroupEntities, getUserEntities, getToplevelGroup,
                                (path, repos, groups, users, topLevel) =>
                                  (path ? denormalizeGroup(_.get(groups, [path], null), groups, repos, users) : topLevel))

export const getRepo = createSelector(getFullName, getRepoEntities, getUserEntities,
                                      (path, repos, users) => (path ? denormalizeRepo(_.get(repos, [path], null), users) : null))

export const getRepositoriesFetchStatus = statusFetchFactory(types.FETCH_REPOSITORIES)

export const getRepositoriesFetchState = createStructuredSelector({
  path: getPath,
  fullName: getFullName,
  status: getRepositoriesFetchStatus,
  group: getGroup,
  repo: getRepo,
})

export const getSearchRepoFetchStatus = statusFetchFactory(types.SEARCH_REPOSITORY)
export const repoNamesSelector = (state: Object): Array<Object> => state.entities.repositories || []
export const getRepositoriesNames = createSelector(
  repoNamesSelector,
  repoNames => _.values(repoNames).map(x => ({ label: x.fullName, value: x.id }))
)

export const getSearchRepoResultState = createStructuredSelector({
  status: getSearchRepoFetchStatus,
  options: getRepositoriesNames,
})

export const repoBranchesSelector =
  (state: Object, props: Object): Array<Object> => {
    const repo = _.get(state, ['entities', 'repositories'], {})[props.repoId]
    return repo && repo.branches ? repo.branches : []
  }

export const getRepositoryBranches = createSelector(
  repoBranchesSelector,
  repoBranches => repoBranches.map(x => ({ label: x.name, value: x.name }))
)

