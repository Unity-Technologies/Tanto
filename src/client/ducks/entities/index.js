/* @flow */
import _ from 'lodash'
import { normalize } from 'normalizr'

export const SET_NORMALIZED_ENTITIES = 'ENTITIES/SET_NORMALIZED_ENTITIES'
export const APPEND_ENTITY = 'ENTITIES/APPEND_ENTITY'

export const types = {
  SET_NORMALIZED_ENTITIES,
  APPEND_ENTITY,
}

/*
Customizes the merge result such that values that should be accepted from upstream
are done so, and values that need to be merged does not lead to duplications in
unique identifiers due to inadvertent updates from the server.

A naive version of lodash's merge would merge something like:
  state: [{id: 2}, {id: 1}]
  entity: [{id: 1}]
to:
  result: [{id: 1}, {id: 1}]

As it tries to update each element's contents and preserve array index ordering.
To work around that, we merge each element uniquely if it has an id field (this can
later be generalized to more primary key fields), and then return the result of that
merge. This has the unfortunate side-effect of reordering the state's array, but until
we identify a need for attempting to preserve the respective array ordering, it seemed
to needlessly complicate the customizer functionality.
 */
const customizer = (merge, objValue, srcValue, key, object, source, stack) => {
  const overwriteKeys = ['reviews', 'missingReviewers', 'comments']
  if (objValue instanceof Array && srcValue instanceof Array) {
    if (overwriteKeys.indexOf(key) !== -1) {
      return srcValue
    }

    if (objValue.length > 0 && objValue[0].hasOwnProperty('id') ||
        srcValue.length > 0 && srcValue[0].hasOwnProperty('id')) {
      const accumulator = (acc, val, ignore1, ignore2) => Object.assign(acc, { [val.id]: val })
      const objKeyed = _.reduce(objValue, accumulator, {})
      const srcKeyed = _.reduce(srcValue, accumulator, {})
      const keys = _.union(Object.keys(objKeyed), Object.keys(srcKeyed))
      return keys.map(k => {
        const objVal = objKeyed.hasOwnProperty(k) ? objKeyed[k] : undefined
        const srcVal = srcKeyed.hasOwnProperty(k) ? srcKeyed[k] : undefined
        if (objVal === undefined) {
          return srcVal
        }
        if (srcVal === undefined) {
          return objVal
        }
        return merge(objVal, srcVal)
      })
    }
  }

  return undefined // undefined triggers auto-merging according to loadash's normal merging logic
}

export const merge = (state: Object, entity: Object): Object => {
  const updatedState = _.mergeWith(
    _.cloneDeep(state),
    entity,
    (objValue, srcValue, key, object, source, stack) =>
      customizer(merge, objValue, srcValue, key, object, source, stack))

  return _.isEqual(updatedState, state) ? state : updatedState
}


/**
 * Appends/updates a new/modified entity and adds references to it at given paths.
 */
export const appendEntity = (state: Object, pathToSource: Array<String>, pathsToReferences: Array<Array<String>>, object: Object, schema: Object): Object => {
  if (!_.has(state, pathToSource) || !_.has(object, 'id')) {
    return state
  }
  const { entities } = normalize(object, schema)

  const updatedState = merge(state, entities)

  const numPaths = pathsToReferences.length

  let referenceList

  for (let i = 0; i < numPaths; i++) {
    referenceList = _.get(updatedState, pathsToReferences[i], null)
    if (!referenceList || _.includes(referenceList, object.id)) {
      continue
    }
    referenceList.push(object.id)
  }

  return updatedState
}

export const entities = (state: Object = {}, action: Object): Object => {
  switch (action.type) {
    case types.SET_NORMALIZED_ENTITIES:
      return merge(state, action.entities)
    case types.APPEND_ENTITY:
      return appendEntity(state, action.sourcePath, action.referencePaths, action.object, action.schema)
    default:
      return state
  }
}
