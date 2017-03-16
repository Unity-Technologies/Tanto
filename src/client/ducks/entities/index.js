/* @flow */

import _ from 'lodash'

export const SET_QUERIED_ENTITIES = 'ENTITIES/SET_QUERIED_ENTITIES'
export const SET_MUTATED_ENTITIES = 'ENTITIES/SET_MUTATED_ENTITIES'

export const types = {
  SET_QUERIED_ENTITIES,
  SET_MUTATED_ENTITIES,
}

const customizerQuery = (objValue: any, srcValue: any): any => {
  if (_.isArray(objValue)) {
    return _.union(objValue, srcValue)
  }
}

const customizerMutation = (objValue: any, srcValue: any, key, object, source, stack): any => {
  if (_.isArray(objValue)) {
    return srcValue
  }
}

export const mergeOnQuery = (state: Object, entity: Object): Object => {
  const updatedState = _.mergeWith({}, state, entity, customizerQuery)

  return _.isEqual(updatedState, state) ? state : updatedState
}

export const mergeOnMutation = (state: Object, entity: Object): Object => {
  const updatedState = _.mergeWith({}, state, entity, customizerMutation)

  return _.isEqual(updatedState, state) ? state : updatedState
}

export const entities = (state: Object = {}, action: Object): Object => {
  switch (action.type) {
    case types.SET_QUERIED_ENTITIES:
      return mergeOnQuery(state, action.entities)
    case types.SET_MUTATED_ENTITIES:
      return mergeOnMutation(state, action.entities)
    default:
      return state
  }
}

