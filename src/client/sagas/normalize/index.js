/* @flow */

import { put } from 'redux-saga/effects'
import { normalize } from 'normalizr'
import schema from 'ducks/schema'
import { types } from 'ducks/entities'

export function* normalizeSaga(data: Object): Generator<any, any, any> {
  if (!data) {
    return
  }

  // HACK: Handle mutation results until we find a more elegant way to deal with it
  const mutations = ['addReviewers']

  let resolvedData = data
  for (let i = 0; i < mutations.length; ++i) {
    const mutation = mutations[i]
    if (resolvedData.hasOwnProperty(mutation)) {
      resolvedData = resolvedData[mutation]
      break
    }
  }

  const { entities } = normalize(resolvedData, schema)

  // NOTE: This is a hack due to ono graphql me scheme design
  if (entities.me) {
    const me = entities.me
    entities.me = me[Object.keys(me)[0]]
  }

  yield (put({ type: types.SET_QUERIED_ENTITIES, entities }))
}
