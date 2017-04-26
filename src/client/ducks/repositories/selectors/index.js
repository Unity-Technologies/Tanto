/* @flow */

import { createSelector, createStructuredSelector } from 'reselect'
import { statusFetchFactory } from 'ducks/fetch/selectors'
import { userEntitiesSelector } from 'ducks/users/selectors'
import { types } from '../actions'
import _ from 'lodash'

export const repoEntitiesSelector = (state : Object, props: Object): Object => {
  const parentGroupName = props.params.splat || null
  return _.pickBy(state.entities.repositories, repo => (repo.groupPath === parentGroupName))
}

export const getRepositories = createSelector(
  repoEntitiesSelector,
  repoEntities => _.values(repoEntities)
)

export const groupsEntitiesSelector = (state: Object, props: Object): Object => {
  const parentGroupName = props.params.splat || null
  return _.pickBy(state.entities.groups, group => (group.parentGroupName === parentGroupName))
}

export const getGroups = createSelector(
  groupsEntitiesSelector,
  groupsEntities => _.values(groupsEntities)
)

export const getRepositoriesFetchStatus = statusFetchFactory(types.FETCH_REPOSITORIES)

export const pathnameSelector = (state: Object): string =>
  state.routing.locationBeforeTransitions.pathname

export const getRepositoriesFetchState = createStructuredSelector({
  pathname: pathnameSelector,
  status: getRepositoriesFetchStatus,
  repositories: getRepositories,
  groups: getGroups,
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

export const repositoryEntities = (state: Object) => state.entities.repositories
export const repositoryName = (state: Object, props: Object) =>
  (props.params ? props.params.splat : '')
export const repoIdSelector = (state: Object, props: Object): any =>
  _.findKey(state.entities.repositories, (v) => (v.fullName === props.params.splat))

export const getRepositoryId = createSelector(
  repositoryEntities, repositoryName,
  (entities, repoName) =>
    _.findKey(entities, (v) => (v.fullName === repoName))
)

export const getChangelogFetchStatus = statusFetchFactory(types.FETCH_CHANGELOG)
export const parseMercurialAuthor = (author:string) => {
  if (!author) {
    return author
  }
  const match = author.match(/([^)]+)\s\<([^)]+)\>/) // eslint-disable-line  no-useless-escape

  if (!match || match.length !== 3) {
    return {
      fullName: author,
    }
  }

  // two captured groups expected here, 1st one is default
  return {
    fullName: match[1],
    email: match[2],
  }
}

export const getChangesetsEntities = (state: Object, props: Object) => state.entities.changesets
export const getRepositoriesEntities = (state: Object, props: Object) => state.entities.repositories
export const getChangelog = createSelector(
  getChangesetsEntities, getRepositoriesEntities, userEntitiesSelector, getRepositoryId,
  (changesets, repositories, users, repoId) => {
    if (!changesets || !repositories || ! users || !repoId) {
      return null
    }
    const repo = repositories[repoId]
    if (!repo || !repo.changelog || !repo.changelog.nodes) {
      return null
    }

    const changelog = _.values(_.pick(changesets, repo.changelog.nodes))
    return changelog.map(ch => ({
      ...ch,
      authorUser: ch.authorUser ? users[ch.authorUser] : parseMercurialAuthor(ch.author),
    }))
  }
)
