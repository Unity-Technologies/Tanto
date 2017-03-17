/* @flow */

import _ from 'lodash'

export const SET_QUERIED_ENTITIES = 'ENTITIES/SET_QUERIED_ENTITIES'
export const SET_MUTATED_ENTITIES = 'ENTITIES/SET_MUTATED_ENTITIES'

export const types = {
  SET_QUERIED_ENTITIES,
  SET_MUTATED_ENTITIES,
}

const queryCustomizer = (objValue: any, srcValue: any): any => { // eslint-disable-line consistent-return
  if (_.isArray(objValue)) {
    return _.union(objValue, srcValue)
  }
}

const mutationCustomizer = (objValue: any, srcValue: any, key, object, source, stack): any => { // eslint-disable-line consistent-return
  if (_.isArray(objValue)) {
    return srcValue
  }
}

export const merge = (state: Object, entity: Object, customizer: Function): Object => {
  const updatedState = _.mergeWith({}, state, entity, customizer)

  return _.isEqual(updatedState, state) ? state : updatedState
}

export const entities = (state: Object = {}, action: Object): Object => {
  switch (action.type) {
    case types.SET_QUERIED_ENTITIES:
      return merge(state, action.entities, queryCustomizer)
    case types.SET_MUTATED_ENTITIES:
      return merge(state, action.entities, mutationCustomizer)
    default:
      return state
  }
}

