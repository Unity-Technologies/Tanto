/* @flow */
import _ from 'lodash'

export const types = {
  SET_ENTITIES: 'ENTITIES/SET_ENTITIES',
  SET_NORMALIZED_ENTITIES: 'ENTITIES/SET_NORMALIZED_ENTITIES',
  SET_ENTITY: 'ENTITIES/SET_ENTITY',
}

export type ErrorType = {
  message: string
}

/* @flow */

/**
 * Transforms object to the object with the ID property(state normalizaton)
 * Example:
 * const obj = { id: 'kdhfkjsa', name: 'Test name', title: 'Tests title' }
 * to be transformed to
 * const objNormalized = { 'kdhfkjsa': { id: 'kdhfkjsa', name: 'Test name', title: 'Tests title' } }
 */
export const reduceObjById = (obj: Object, idAttribute: string = 'id'): Object => {
  const res = {}
  res[obj[idAttribute]] = obj
  return res
}

/**
 * Transforms object to the object with the ID property(state normalizaton)
 * Example:
 * const obj = { id: 'kdhfkjsa', name: 'Test name', title: 'Tests title' }
 * to be transformed to
 * const objNormalized = { 'kdhfkjsa': { id: 'kdhfkjsa', name: 'Test name', title: 'Tests title' } }
 */
export const reduceArrayToObj = (arr: Array<Object>, idAttribute: string = 'id'): Object => {
  const res = {}

  for (const x of arr) {
    res[x[idAttribute]] = x
  }

  return res
}


export const setEntities = (nodes: Array<Object>, idAttribute: string = 'id'): Object =>
  ({ type: types.SET_ENTITIES, nodes, idAttribute })

export const setEntity = (node: Object, idAttribute: string = 'id'): Object =>
({ type: types.SET_ENTITY, node, idAttribute })

export const actions = {
  setEntities,
  setEntity,
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
    case types.SET_NORMALIZED_ENTITIES:
      return merge(state, action.entities)
    case types.SET_ENTITY:
      return merge(state, reduceObjById(action.node))
    default:
      return state
  }
}

