
import { call, put } from 'redux-saga/effects'
import { actions } from 'ducks/session'
import USER_PROFILE_QUERY from 'services/ono/queries/users'
import { get } from 'services/ono/api'
import fetchCurrentUserProfile from '../index'

const expect = require('chai').expect

describe('session sagas', () => {
  it('fetchUserProfile should fetch user profile', () => {
    const generator = fetchCurrentUserProfile()
    const profile = { username: 'test_user', email: 'test@test.com' }
    const response = { data: { me: profile } }

    expect(generator.next().value).to.deep.equal(put(actions.sendingRequest(true)))
    expect(generator.next().value).to.deep.equal(call(get, USER_PROFILE_QUERY))
    expect(generator.next(response).value).to.deep.equal(put(actions.setProfile(profile)))
    expect(generator.next().value).to.deep.equal(put(actions.sendingRequest(false)))
  })

  it('fetchUserProfile catches fetch user profile exception', () => {
    const generator = fetchCurrentUserProfile()
    const error = 'TEST ERROR fetchUserProfile'

    expect(generator.next().value).to.deep.equal(put(actions.sendingRequest(true)))
    expect(generator.next().value).to.deep.equal(call(get, USER_PROFILE_QUERY))
    expect(generator.throw(error).value).to.deep.equal(put(actions.requestError(error)))
    expect(generator.next().value).to.deep.equal(put(actions.sendingRequest(false)))
  })
})
