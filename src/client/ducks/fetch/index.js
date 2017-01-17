/* @flow */

export const types = {
  SENDING_REQUEST: 'FETCH/SENDING_REQUEST',
  REQUEST_ERROR: 'FETCH/REQUEST_ERROR',
  CLEAR_ERROR: 'FETCH/CLEAR_ERROR',
  FETCH_DATA: 'FETCH/FETCH_DATA',
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

export const fetchStatus = (state: Object = {}, action: Object): Object => {
  switch (action.type) {
    case types.SENDING_REQUEST:
      return {
        ...state,
        [action.name]: {
          isFetching: action.sending,
        },
      }
    case types.REQUEST_ERROR:
      return {
        ...state,
        [action.name]: {
          error: action.error,
        },
      }
    case types.CLEAR_ERROR:
      return {
        ...state,
        [action.name]: {
          error: null,
        },
      }
    default:
      return state
  }
}

export default fetchStatus

export const fetchSelector =
  (key: string, prop: string, defaultValue: any = null): Function => (state: Object): any => {
    const st = state.fetch[key]
    return st && st.hasOwnProperty(prop) ? st[prop] : defaultValue
  }

export const isFetchingSelector =
  (key: string): Function => (state: Object): boolean => {
    const st = state.fetch[key]
    return st && st.hasOwnProperty('isFetching') ? st.isFetching : false
  }

export const errorSelector =
  (key: string): Function => (state: Object): any => {
    const fetchState = state.fetch[key]
    return fetchState && fetchState.hasOwnProperty('error') ? fetchState.error : null
  }

export type FetchAction = {
  type: string,
  name: string,
  query: string,
  args: Object,
  callback: Function
}


export const fetchActionCreator =
  (type: string,
    query: string,
    args: Object = {},
    callback: (data: Object, cbArgs: Object) => Array<Object>): FetchAction => ({
      type: types.FETCH_DATA,
      name: type,
      query,
      args,
      callback,
    })

