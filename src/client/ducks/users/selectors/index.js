import { createSelector } from 'reselect'
import _ from 'lodash'

export const usersSelector = (state: Object): Array<Object> => state.entities.users
export const getUsers = createSelector(
  usersSelector,
  users => _.values(users) || []
)
