/* @flow */

import usersQuery from './queries/users.graphql'

export const types = {
  FETCH_USERS: 'USERS/FETCH_USERS',
}

export const fetchUsers = (): Object => ({ type: types.FETCH_USERS, query: usersQuery, variables: {} })
