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

export const statusFetchFactory = (actionType: string): Function =>
  createSelector(
    fetchSelector,
    (fetchState) => {
      const st = fetchState[actionType] || {}
      return {
        isFetching: st && st.hasOwnProperty('isFetching') ? st.isFetching : false,
        error: st && st.hasOwnProperty('error') ? st.error : null,
      }
    }
  )
