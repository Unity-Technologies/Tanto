/* @flow */
import _ from 'lodash'

export const SET_NORMALIZED_ENTITIES = 'ENTITIES/SET_NORMALIZED_ENTITIES'

export const types = {
  SET_NORMALIZED_ENTITIES,
}

export const merge = (state: Object, entity: Object): Object => {
  const updatedState = _.merge({}, state, entity)
  return _.isEqual(updatedState, state) ? state : updatedState
}

export const entities = (state: Object = {}, action: Object): Object => {
  switch (action.type) {
    case types.SET_NORMALIZED_ENTITIES:
      return merge(state, action.entities)
    default:
      return state
  }
}

