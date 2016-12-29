/* @flow */

import { combineReducers } from 'redux'

export const DIRECTION = {
  ASC: 'ASC',
  DESC: 'DESC',
}

export type DirectionType = DIRECTION.ASC | DIRECTION.DESC

export type OrderByType = {
  direction: DirectionType,
  field: string
}

export const direction = (state: string = DIRECTION.ASC, action: Object = {}): string =>
  (action.orderBy ? action.orderBy.direction : state)

export const field = (state: string = '', action: Object = {}): string =>
  (action.orderBy ? action.orderBy.field : state)

export const orderBy = combineReducers({
  direction,
  field,
})
