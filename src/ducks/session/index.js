/* @flow */

/**
 * Action types
 */
export const types = {
  SENDING_REQUEST: 'SESSION/SENDING_REQUEST',
  REQUEST_ERROR: 'SESSION/REQUEST_ERROR',
  FETCH_USER_PROFILE: 'SESSION/FETCH_USER_PROFILE',
  SET_USER_PROFILE: 'SESSION/SET_USER_PROFILE',
  CLEAR_ERROR: 'SESSION/CLEAR_ERROR',
  SET_USER_PERSONA: 'SESSION/SET_USER_PERSONA',
  SET_PRS_IDS: 'SESSION/SET_PRS_IDS',
  SET_ASSIGNED_PRS_IDS: 'SESSION/SET_ASSIGNED_PRS_IDS',
  SET_WATCHING_PRS_IDS: 'SESSION/SET_WATCHING_PRS_IDS',
}

/**
 * Available user personas (for testing purposes only !!!)
 */
export const USER_PERSONA = 'USER_PERSONA'
export const DEVELOPER_PERSONA = 'DEVELOPER_PERSONA'
export const MANAGER_PERSONA = 'MANAGER_PERSONA'
export const GUARDIAN_PERSONA = 'GUARDIAN_PERSONA'

/**
 * Initial state
 */
const initialState = {
  error: null,
  isFetching: false,
  persona: DEVELOPER_PERSONA,
  pr_ids: [],
  pr_ids_assigned: [],
  pr_ids_watching: [],
  profile: {
    username: null,
    email: null,
    full_name: null,
  },
}

/**
 * Current user reducer
 */
export default (state: Object = initialState, action: Object): Object => {
  switch (action.type) {
    case types.SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile,
      }
    case types.SET_USER_PERSONA:
      return {
        ...state,
        persona: action.persona,
      }
    case types.SET_PRS_IDS:
      return {
        ...state,
        pr_ids: action.ids,
      }
    case types.SET_ASSIGNED_PRS_IDS:
      return {
        ...state,
        pr_assigned_ids: action.ids,
      }
    case types.SET_WATCHING_PRS_IDS:
      return {
        ...state,
        pr_watching_ids: action.ids,
      }
    case types.SENDING_REQUEST:
      return {
        ...state,
        isFetching: action.sending,
      }
    case types.REQUEST_ERROR:
      return {
        ...state,
        error: action.error,
      }
    case types.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      }
    default:
      return state
  }
}

/**
 * Actions
 */
export const actions = {
  sendingRequest: (sending: boolean): Object => ({ type: types.SENDING_REQUEST, sending }),
  requestError: (error: string): Object => ({ type: types.REQUEST_ERROR, error }),
  clearError: (): Object => ({ type: types.CLEAR_ERROR }),
  fetchProfile: (): Object => ({ type: types.FETCH_USER_PROFILE }),
  setProfile: (profile: Object): Object => ({ type: types.SET_USER_PROFILE, profile }),
  setPersona: (persona: string): Object => ({ type: types.SET_USER_PERSONA, persona }),
  setUserPRIds: (ids: Array<string>): Object => ({ type: types.SET_PRS_IDS, ids }),
  setUserAssignedPRIds: (ids: Array<string>): Object => ({ type: types.SET_ASSIGNED_PRS_IDS, ids }),
  setUserWatchingPRsIds:
  (ids: Array<string>): Object => ({ type: types.SET_WATCHING_PRS_IDS, ids }),
}
