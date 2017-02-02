/* @flow */

import { fetchAction } from 'ducks/fetch'
import usersQuery from './queries/users.graphql'
import type { FetchAction } from 'ducks/fetch'

export const types = {
  FETCH_USERS: 'USERS/SENDING_REQUEST',
}

export const fetchUsers = (): FetchAction =>
  fetchAction({ type: types.FETCH_USERS, query: usersQuery })
