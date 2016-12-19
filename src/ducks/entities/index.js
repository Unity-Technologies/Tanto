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
  sendingRequest: (sending: boolean): Object => ({ type: types.SENDING_REQUEST, sending }),
  requestError: (error: string): Object => ({ type: types.REQUEST_ERROR, error }),
  clearError: (): Object => ({ type: types.CLEAR_ERROR }),
  setEntities: (nodes: Array<Object>, idAttribute: string = 'id'): Object =>
    ({ type: types.SET, nodes, idAttribute }),
}

export const mergeEntities = (state: Object = {}, action: Object): Object => {
  if (action.nodes) {
    const nodes = reduceArrayToObj(action.nodes, action.idAttribute)
    const updatedState = _.merge({}, state, nodes)
    return _.isEqual(updatedState, state) ? state : updatedState
  }
  return state
}

export const entities = (state: Object = {}, action: Object): Object => {
  switch (action.type) {
    case types.SET:
      return mergeEntities(state, action)
    default:
      return state
  }
}

export const error = (state:Object = {}, action:Object): Object => {
  switch (action.type) {
    case types.REQUEST_ERROR:
      return action.error
    case types.CLEAR_ERROR:
      return {}
    default:
      return state
  }
}

export const isFetching = (state: boolean= false, action:Object): boolean =>
  (action.type === types.SENDING_REQUEST ? action.sending : state)

