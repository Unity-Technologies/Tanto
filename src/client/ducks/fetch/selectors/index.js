/* @flow */
import { createSelector } from 'reselect'

export type StatusType = {
  isFetching: boolean,
  error: Object
}

export type StateType = {
  fetch: {
    [key: string]: StatusType
  }
}

export const fetchSelector = (state: Object): Object => state.fetch
const defaultValue = {
  isFetching: false,
  error: null,
}
export const statusFetchFactory = (actionType: string): Function =>
  createSelector(
    fetchSelector,
    (fetchState) => {
      const st = fetchState[actionType]
      if (!st) {
        return defaultValue
      }
      return {
        isFetching: st && 'isFetching' in st ? st.isFetching : false,
        error: st && 'error' in st ? st.error : null,
      }
    },
  )
