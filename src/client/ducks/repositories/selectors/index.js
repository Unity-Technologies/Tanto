/* @flow */

import { createSelector, createStructuredSelector } from 'reselect'
import { statusFetchFactory } from 'ducks/fetch/selectors'
import { userEntitiesSelector } from 'ducks/users/selectors'
import _ from 'lodash'
import { getEntityById } from 'ducks/selectors'
import { types } from '../actions'

export const repositoryEntities = (state: Object) => state.entities.repositories
export const getRepositoryName = (state: Object, props: Object) =>
  (props.repoName || (props.params ? props.params.splat : ''))

export const repoEntitiesSelector = (state: Object, props: Object): Object => {
  const parentGroupName = props.params.splat || null
  return _.pickBy(state.entities.repositories, repo => (repo.groupPath === parentGroupName))
}

export const getRepositories = createSelector(
  repoEntitiesSelector,
  repoEntities => _.values(repoEntities),
)

export const groupsEntitiesSelector = (state: Object, props: Object): Object => {
  const parentGroupName = props.params.splat || null
  return _.pickBy(state.entities.groups, group => (group.parentGroupName === parentGroupName))
}

export const getGroups = createSelector(
  groupsEntitiesSelector,
  groupsEntities => _.values(groupsEntities),
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

export const getRepositoriesNames = createSelector(
  repositoryEntities,
  repoNames => _.values(repoNames).map(x => ({ label: x.fullName, value: x.fullName })),
)

export const getRepository = createSelector(
  repositoryEntities, getRepositoryName,
  (entities, repoName) => _.find(entities, v => (v.fullName === repoName)),
)

export const getRepositoryBranches = createSelector(
  getRepository,
  (repo) => {
    if (repo && repo.branches) {
      return repo.branches.nodes.map(x => ({ label: x.name, value: x.name }))
    }
    return null
  },
)

export const repoIdSelector = (state: Object, props: Object): any =>
  _.findKey(state.entities.repositories, v => (v.fullName === props.params.splat))

export const getRepositoryId = createSelector(
  repositoryEntities, getRepositoryName,
  (entities, repoName) =>
    _.findKey(entities, v => (v.fullName === repoName)),
)

export const getChangelogFetchStatus = statusFetchFactory(types.FETCH_CHANGELOG)
export const parseMercurialAuthor = (author: string) => {
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
export const getBranchName = (state: Object, props: Object) => (props && props.branch ? props.branch : null)
export const getChangelog = createSelector(
  getChangesetsEntities, userEntitiesSelector, getRepository, getBranchName,
  (changesets, users, repo, branch) => {
    if (!changesets || !users || !repo || !repo.changelog || !repo.changelog.nodes) {
      return null
    }

    let changelog = _.values(_.pick(changesets, repo.changelog.nodes))

    if (branch) {
      changelog = changelog.filter(ch => ch.branch === branch)
    }
    return changelog.map(ch => ({
      ...ch,
      authorUser: getEntityById(users, ch.authorUser, () => parseMercurialAuthor(ch.author)),
    }))
  },
)

export const getRepoDescription = createSelector(
  repositoryEntities, getRepositoryName,
  (entities, repoName) => {
    if (!entities || !repoName) {
      return null
    }
    const repo = _.find(entities, v => (v.fullName === repoName))
    return repo ? repo.description : null
  })
