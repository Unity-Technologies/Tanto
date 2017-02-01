/* @flow */

import { fetchActionCreator } from 'ducks/fetch'
import usersQuery from './queries/users.graphql'

export const types = {
  FETCH_USERS: 'USERS/SENDING_REQUEST',
}

export const fetchUsers = (): Object =>
  fetchActionCreator(types.FETCH_USERS, usersQuery, { })
