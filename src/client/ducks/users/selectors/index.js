/* @flow */

import { createSelector } from 'reselect'
import _ from 'lodash'

export const userEntitiesSelector = (state: Object): Array<Object> =>
  _.get(state, ['entities', 'users'], null)

export const getUsers = createSelector(
  userEntitiesSelector,
  users => _.values(users)
)

