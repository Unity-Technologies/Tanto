/* @flow */

import { takeLatest, takeEvery } from 'redux-saga'
import { fork } from 'redux-saga/effects'
import { types as usersTypes } from 'ducks/users'
import { fetchAnythingSaga } from 'sagas/fetch'
import { searchRepository } from 'sagas/repositories'
import { fetchUsers } from 'sagas/users'
import { types as repoTypes } from 'ducks/repositories/actions'
import { types as fetchTypes } from 'ducks/fetch'

import rootSaga from '../../index'

const expect = require('chai').expect


describe('root saga', () => {
  it('flow', () => {
    const generator = rootSaga()
    expect(generator.next().value).to.deep.equal(
      fork(takeEvery, fetchTypes.FETCH_DATA, fetchAnythingSaga))
    expect(generator.next().value).to.deep.equal(
      fork(takeLatest, repoTypes.SEARCH_REPOSITORY, searchRepository))
    expect(generator.next().value).to.deep.equal(
      fork(takeEvery, usersTypes.FETCH_USERS, fetchUsers))
  })
})
