/* @flow */
import { types } from './actions'
import { combineReducers } from 'redux'

const initialState = {}

export const files = (state: Object = {}, action: Object): Object => {
  switch (action.type) {
    case types.SET_FILE_REVIEW:
      return {
        ...state,
        [action.fileId]: {
          ...state[action.fileId],
          reviewed: action.reviewed,
        },
      }
    case types.SET_FILE_BOOKMARK:
      return {
        ...state,
        [action.fileId]: {
          ...state[action.fileId],
          bookmarked: action.bookmarked,
        },
      }
    default:
      return state
  }
}

export const review = combineReducers({
  files,
})


export const pullrequests = (state: Object = initialState, action: Object): Object => {
  if (!action.pullRequestId) {
    return state
  }

  return {
    ...state,
    [action.pullRequestId]: review(state[action.pullRequestId], action),
  }
}


export default pullrequests
