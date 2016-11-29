// TODO: add flow annotations

import { createSelector } from 'reselect'
import _ from 'lodash'

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
export default (state = initialState, action) => {
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
  sendingRequest: sending => ({ type: types.SENDING_REQUEST, sending }),
  requestError: error => ({ type: types.REQUEST_ERROR, error }),
  clearError: () => ({ type: types.CLEAR_ERROR }),
  fetchProfile: () => ({ type: types.FETCH_USER_PROFILE }),
  setProfile: profile => ({ type: types.SET_USER_PROFILE, profile }),
  setPersona: persona => ({ type: types.SET_USER_PERSONA, persona }),
  setUserPRIds: ids => ({ type: types.SET_PRS_IDS, ids }),
  setUserAssignedPRIds: ids => ({ type: types.SET_ASSIGNED_PRS_IDS, ids }),
  setUserWatchingPRsIds: ids => ({ type: types.SET_WATCHING_PRS_IDS, ids }),
}

/**
 * Selectors
 */

const pullRequestsOwnedIdsSelector = state => state.session.pr_ids
const pullRequestsAssignedIdsSelector = state => state.session.pr_assigned_ids
const pullRequestsWatchingIdsSelector = state => state.session.pr_watching_ids

const pullRequestsSelector = state => state.pullrequests.byId


const pullRequestsOwned = createSelector(
  pullRequestsSelector, pullRequestsOwnedIdsSelector,
  (pullRequests, pullRequestsOwnedIds) => _.values(_.pick(pullRequests, pullRequestsOwnedIds))
)

const pullRequestsAssigned = createSelector(
  pullRequestsSelector, pullRequestsAssignedIdsSelector,
  (pullRequests, pullRequestsAssignedIds) => _.values(_.pick(pullRequests, pullRequestsAssignedIds))
)

const pullRequestsWatching = createSelector(
  pullRequestsSelector, pullRequestsWatchingIdsSelector,
  (pullRequests, pullRequestsWatchingIds) => _.values(_.pick(pullRequests, pullRequestsWatchingIds))
)

export const selectors = {
  getPersona: state => state.session.persona,
  getProfile: state => state.session.profile,
  getPullRequests: state => pullRequestsOwned(state),
  getPullRequestsAssigned: state => pullRequestsAssigned(state),
  getPullRequestsWatching: state => pullRequestsWatching(state),
}
