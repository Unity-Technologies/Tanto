/* @flow */

import { entities, actions as entitiesActions } from 'ducks/entities'
import { fetchActionCreator } from 'ducks/fetch'
import type { UserType } from 'universal/types'
import usersQuery from './queries/users.graphql'

export const types = {
  FETCH_USERS: 'USERS/SENDING_REQUEST',
  SET_USERS: 'USERS/SET_USERS',
  SET_USER: 'USERS/SET_USER',
}

/**
 * Initial state
 */
const initialState = {
  entities: {},
}

/**
 * Users reducer
 */
export default (
  state: Object = initialState, action: Object): Object => {
  switch (action.type) {
    case types.SET_USERS:
      return {
        ...state,
        entities: entities(state.entities, entitiesActions.setEntities(action.nodes)),
      }
    case types.SET_USER:
      return {
        ...state,
        entities: entities(state.entities, entitiesActions.setEntity(action.node)),
      }
    default:
      return state
  }
}

export const parseUsers = (data: Object): Array<UserType> => data.data.users

export const fetchUsers = (): Object =>
  fetchActionCreator(types.FETCH_USERS, usersQuery, { }, '',
    (data: Object, cbArgs: Object): Array<Object> => {
      const nodes = parseUsers(data)
      return [
        { type: types.SET_USERS, nodes },
      ]
    })
