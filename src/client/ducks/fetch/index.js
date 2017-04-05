/* @flow */

export const types = {
  SENDING_REQUEST: 'FETCH/SENDING_REQUEST',
  REQUEST_ERROR: 'FETCH/REQUEST_ERROR',
  CLEAR_ERROR: 'FETCH/CLEAR_ERROR',
  FETCH_ONO_DATA: 'FETCH/FETCH_ONO_DATA',
  FETCH_BFSTATS_DATA: 'FETCH/FETCH_BFSTATS_DATA',
}

/**
 * Fetch reducer
 */
export const fetchStatus = (state: Object = {}, action: Object): Object => {
  switch (action.type) {
    case types.SENDING_REQUEST:
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          isFetching: action.sending,
        },
      }
    case types.REQUEST_ERROR:
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          error: action.error,
        },
      }
    case types.CLEAR_ERROR:
      return {
        ...state,
        [action.name]: {
          ...state[action.name],
          error: null,
        },
      }
    default:
      return state
  }
}

export default fetchStatus


/**
 * Fetch types and action creators
 */

export type FetchAction = {
  type: string,
  name: string,
  query: string,
  operationName?: string,
  varibles?: Object,
  callback?: Function
}

export type ActionType = {
  type: string,
  query: string,
  operationName?: string,
  variables?: Object,
  callback?: (data: Object, cbArgs: Object) => Array<Object>
}

export const sendingRequest = (name: string, sending: boolean): Object =>
  ({ type: types.SENDING_REQUEST, sending, name })

export const requestError = (name: string, error: string): Object =>
  ({ type: types.REQUEST_ERROR, error, name })

export const clearError = (name: string): Object =>
  ({ type: types.CLEAR_ERROR, name })

export const actions = {
  sendingRequest,
  requestError,
  clearError,
}

export const fetchAction =
  (type: string, action: ActionType): FetchAction => ({
    ...action,
    name: action.type,
    type,
  })

export const fetchOnoActionCreator =
  (type: string,
    query: string,
    variables: Object = {},
    operationName: string = '',
    callback: (data: Object, cbArgs: Object) => Array<Object>): FetchAction => ({
      type: types.FETCH_ONO_DATA,
      operationName,
      name: type,
      query,
      variables,
      callback,
    })

export const fetchOnoAction =
  (action: ActionType): FetchAction => fetchAction(types.FETCH_ONO_DATA, action)

export const fetchBfStatsAction =
  (action: ActionType): FetchAction => fetchAction(types.FETCH_BFSTATS_DATA, action)
