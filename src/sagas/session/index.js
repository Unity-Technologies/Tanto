// /* @flow */

// import { call, put } from 'redux-saga/effects'
// import { actions } from 'ducks/session'
// import USER_PROFILE_QUERY from 'services/ono/queries/users'
// import fetchSaga from 'sagas/fetch'

// export default function* fetchCurrentUserProfile(action: Object): Generator<any, any, any> {
//   const reponse = yield call(fetchSaga, action.type, USER_PROFILE_QUERY)
//   const profile = reponse.data.me
//   yield put(actions.setProfile(profile))
// }
