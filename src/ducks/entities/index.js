/* @flow */

import { reduceArrayToObj } from 'ducks/normalizer'
import _ from 'lodash'

export const types = {
  SENDING_REQUEST: 'ENTITIES/SENDING_REQUEST',
  REQUEST_ERROR: 'ENTITIES/REQUEST_ERROR',
  CLEAR_ERROR: 'ENTITIES/CLEAR_ERROR',
  SET: 'ENTITIES/CLEAR_ERROR',
}

export const actions = {
  sendingRequest: (sending: boolean) => ({ type: types.SENDING_REQUEST, sending }),
  requestError: (error: string) => ({ type: types.REQUEST_ERROR, error }),
  clearError: () => ({ type: types.CLEAR_ERROR }),
  setEntities: (nodes) => ({ type: types.SET, nodes }),
}

export const mergeEntities =
  (state = {}, action) => (action.nodes ? _.merge({}, state, action.nodes) : state)

export const entities = (state = {}, action) => {
  switch (action.type) {
    case types.SET: {
      const updatedState = mergeEntities(state, { nodes: reduceArrayToObj(action.nodes) })
      return _.isEqual(updatedState, state) ? state : updatedState
    }
    default:
      return state
  }
}

export const error = (state = null, action) => {
  switch (action.type) {
    case types.REQUEST_ERROR:
      return action.error
    case types.CLEAR_ERROR:
      return null
    default:
      return state
  }
}

export const isFetching = (state = false, action) =>
  (action.type === types.SENDING_REQUEST ? action.sending : state)
