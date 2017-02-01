/* @flow */
import userProfileQuery from 'ducks/session/queries/me.graphql'
import { fetchActionCreator } from 'ducks/fetch'

/**
 * Action types
 */
export const types = {
  FETCH_USER_PROFILE: 'SESSION/FETCH_USER_PROFILE',
}

/**
 * Action creators
 */
export const fetchProfile = (): Object =>
  fetchActionCreator(types.FETCH_USER_PROFILE, userProfileQuery, {}, '',
    (data: Object, cbArgs: Object): Array<Object> =>
      [{ type: types.SET_USER_PROFILE, profile: data.data.me }])

export const setProfile = (profile: Object): Object => ({ type: types.SET_USER_PROFILE, profile })

export const setPersona = (persona: string): Object => ({ type: types.SET_USER_PERSONA, persona })
