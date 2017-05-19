/* @flow */
import _ from 'lodash'

const defaultEmptyObject = {}

export const get = (state: Object, props: Array<string>, defaultValue: Object) =>
  _.get(state, props, defaultValue || defaultEmptyObject)
