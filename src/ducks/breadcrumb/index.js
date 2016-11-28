/* @flow */

export const BREADCRUMB_PUSH_LINK = 'BREADCRUMB_PUSH_LINK'
export const BREADCRUMB_UPDATE = 'BREADCRUMB_UPDATE'
export const BREADCRUMB_CLEAN = 'BREADCRUMB_CLEAN'

const update = (items, value) => {
  if (items && items.length && value > -1 && value < items.length) {
    return items.slice(0, value)
  }
  return items
}

const initialState = {
  items: [],
}

export default function breadcrumb(state = initialState, action) {
  switch (action.type) {
    case BREADCRUMB_PUSH_LINK:
      return {
        ...state,
        items: [...state.items, action.result],
      }
    case BREADCRUMB_UPDATE:
      return {
        ...state,
        items: update(state.items, action.result),
      }
    case BREADCRUMB_CLEAN:
      return {
        ...state,
        items: [],
      }
    default:
      return state
  }
}
