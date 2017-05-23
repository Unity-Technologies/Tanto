/* @flow */

export const getEntityById = (entities: Object, id: any, defaultValue: any) =>
  (entities && id && id in entities ? entities[id] :
    (typeof defaultValue === 'function' ? defaultValue() : null : null))


export default getEntityById
