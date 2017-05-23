/* @flow */

export const createReducer = (namespace: string, reducer: Function, initState: any): Function =>
  (state = initState, action) => {
    if (action.namespace === namespace) {
      return reducer(state, action)
    }

    return state
  }

export default createReducer
