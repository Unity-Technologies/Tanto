/* @flow */
/* eslint-disable  import/no-undef */

import { combineReducers } from 'redux'

export const DIRECTION = {
  ASC: 'ASC',
  DESC: 'DESC',
}

export type DirectionType = 'ASC' | 'DESC'

export type OrderByType = {
  direction: DirectionType,
  field: string
}

export const direction =
  (state: DirectionType = DIRECTION.ASC, action: Object = {}): DirectionType =>
  (action.orderBy ? action.orderBy.direction : state)

export const field = (state: string = '', action: Object = {}): string =>
  (action.orderBy ? action.orderBy.field : state)

export const orderBy = combineReducers({
  direction,
  field,
})
