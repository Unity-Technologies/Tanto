
// import { call, put } from 'redux-saga/effects'
// import { actions } from 'ducks/session'
// import USER_PROFILE_QUERY from 'services/ono/queries/users'
// import fetchCurrentUserProfile from '../index'
// import fetchSaga from 'sagas/fetch'

// const expect = require('chai').expect

// describe('session sagas', () => {
//   it('fetchUserProfile should fetch user profile', () => {
//     const action = {
//       type: 'SOME_ACTION',
//     }
//     const generator = fetchCurrentUserProfile(action)
//     const profile = { username: 'test_user', email: 'test@test.com' }
//     const response = { data: { me: profile } }

//     expect(generator.next().value).to.deep.equal(call(fetchSaga, action.type, USER_PROFILE_QUERY))
//     expect(generator.next(response).value).to.deep.equal(put(actions.setProfile(profile)))
//   })
// })
