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
  setEntities: (nodes, idAttribute: string = 'id') => ({ type: types.SET, nodes, idAttribute }),
}

export const mergeEntities = (state = {}, action) => {
  if (action.nodes) {
    const nodes = reduceArrayToObj(action.nodes, action.idAttribute)
    const updatedState = _.merge({}, state, nodes)
    return _.isEqual(updatedState, state) ? state : updatedState
  }
  return state
}

export const entities = (state = {}, action) => {
  switch (action.type) {
    case types.SET:
      return mergeEntities(state, action)
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

