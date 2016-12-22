/* @flow */

/* eslint-disable import/no-extraneous-dependencies*/

import { reduceArrayToObj, reduceObjById } from 'ducks/normalizer'
import _ from 'lodash'

export const types = {
  SET_ENTITIES: 'ENTITIES/SET_ENTITIES',
  SET_ENTITY: 'ENTITIES/SET_ENTITY',
}

export type ErrorType = {
  message: string
}

export const actions = {
  setEntities: (nodes: Array<Object>, idAttribute: string = 'id'): Object =>
    ({ type: types.SET_ENTITIES, nodes, idAttribute }),
  setEntity: (node: Object, idAttribute: string = 'id'): Object =>
    ({ type: types.SET_ENTITY, node, idAttribute }),
}

export const merge = (state: Object, entity: Object): Object => {
  const updatedState = _.merge({}, state, entity)
  return _.isEqual(updatedState, state) ? state : updatedState
}

export const mergeEntities = (state: Object = {}, action: Object): Object => {
  if (action.nodes) {
    const nodes = reduceArrayToObj(action.nodes, action.idAttribute)
    return merge(state, nodes)
  }
  return state
}

export const entities = (state: Object = {}, action: Object): Object => {
  switch (action.type) {
    case types.SET_ENTITIES:
      return mergeEntities(state, action)
    case types.SET_ENTITY:
      return merge(state, reduceObjById(action.node))
    default:
      return state
  }
}

