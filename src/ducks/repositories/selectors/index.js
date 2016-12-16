import { createSelector } from 'reselect'
import _ from 'lodash'

// export const entitiesSelector = (state, props) => state.repositories.entities

export const entitiesSelector = (state, props) =>
  (_.pick(state.repositories.entities, (repo) => {
    console.log(repo.groupName)
    return repo.groupName === props.params.splat
  }))

export const repositories = createSelector(
  entitiesSelector,
  (entities) => _.values(entities)
  )

export const groupsSelector = (state, props) =>
  (_.pick(state.repositories.groups, (group) => (group.parentGroupName === props.params.splat)))

export const nestedGroups = createSelector(
  groupsSelector,
  (groups) => _.values(groups)
)
