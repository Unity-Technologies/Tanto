import { createSelector } from 'reselect'
import _ from 'lodash'

export const repoEntitiesSelector = (state, props) => {
  const parentGroupName = props.params.splat || null
  return _.pickBy(state.repositories.entities, repo => (repo.groupPath === parentGroupName))
}


export const repositories = createSelector(
  repoEntitiesSelector,
  repoEntities => _.values(repoEntities)
)

export const groupsEntitiesSelector = (state, props) => {
  const parentGroupName = props.params.splat || null
  return _.pickBy(state.repositories.groups, group => (group.parentGroupName === parentGroupName))
}

export const groups = createSelector(
  groupsEntitiesSelector,
  groupsEntities => _.values(groupsEntities)
)

