import { createSelector } from 'reselect'
import _ from 'lodash'

export const usersSelector = (state: Object): Array<Object> => state.users.entities
export const getUsers = createSelector(
  usersSelector,
  users => _.values(users) || []
)
