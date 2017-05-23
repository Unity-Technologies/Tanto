/* @flow */
import { combineReducers } from 'redux'

export const RECEIVE_PAGE = 'RECEIVE_PAGE'

type PagePayload = {
  page: number,
  pageSize: number,
  total?: number,
  nodes?: Array<Object>
}

export type PaginationType = {
  total: number,
  pages: Object,
  pageSize: number,
  currentPage: number,
}

export const receivePage = (payload: PagePayload) => ({ ...payload, type: RECEIVE_PAGE })

export const currentPage = (state: number = 0, action: Object = {}): number =>
  (action.type === RECEIVE_PAGE && action.page ? action.page : state)

export const pageSize = (state: number = 15, action: Object = {}): number =>
  (action.type === RECEIVE_PAGE && action.pageSize ? action.pageSize : state)

export const total = (state: number = 0, action: Object = {}): number =>
  (action.type === RECEIVE_PAGE && action.total ? action.total : state)

export const pages = (state: Object = {}, action: Object = {}): Object => {
  switch (action.type) {
    case RECEIVE_PAGE:
      return {
        ...state,
        [action.page]: action.nodes ? action.nodes.map(x => x.id) : [],
      }
    default:
      return state
  }
}

export const pagination = combineReducers({
  pages,
  currentPage,
  total,
  pageSize,
})

