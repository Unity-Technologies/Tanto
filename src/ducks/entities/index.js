/* @flow */

/* eslint-disable import/no-extraneous-dependencies*/

import { reduceArrayToObj } from 'ducks/normalizer'
import _ from 'lodash'

export const types = {
  SET: 'ENTITIES/CLEAR_ERROR',
}

export type ErrorType = {
  message: string
}

export const actions = {
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

