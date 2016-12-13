export const REQUEST_PAGE = 'REQUEST_PAGE'
export const RECEIVE_PAGE = 'RECEIVE_PAGE'

import { combineReducers } from 'redux'

type PagePayload = {
  page: number,
  pageSize: number,
  total?: number,
  nodes?: Array<Object>
}

export const requestPage = (payload: PagePayload) => ({ type: 'REQUEST_PAGE', payload })
export const receivePage = (payload: PagePayload) => ({ type: 'RECEIVE_PAGE', payload })

export const currentPage = (state = 0, action = {}) =>
  (action.type === RECEIVE_PAGE ? action.payload.page : state)

export const pageSize = (state = 15, action = {}) =>
  (action.type === RECEIVE_PAGE ? action.payload.pageSize : state)

export const total = (state = 0, action = {}) =>
  (action.type === RECEIVE_PAGE ? action.payload.total : state)


export const pages = (state = {}, action = {}) => {
  switch (action.type) {
    case REQUEST_PAGE:
      return {
        ...state,
        [action.payload.page]: [],
      }

    case RECEIVE_PAGE:
      return {
        ...state,
        [action.payload.page]: action.payload.nodes.map(x => x.id),
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

