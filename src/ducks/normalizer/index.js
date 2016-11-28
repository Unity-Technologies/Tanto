/* @flow */

/* eslint-disable*/

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

/**
 * It's dummy merge of two objects or two arrays
 */
export const merge = (obj1: Object, obj2: Object): Object => {
  return { ...obj1, ...obj2 }
}

