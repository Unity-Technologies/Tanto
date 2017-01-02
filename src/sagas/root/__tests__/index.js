/* eslint-disable max-len */
import { takeLatest, takeEvery } from 'redux-saga'
import { fork } from 'redux-saga/effects'

import { types as repoTypes } from 'ducks/repositories'
import { searchRepository } from 'sagas/repositories'
import { types as fetchTypes } from 'ducks/fetch'
import { fetchAnythingSaga } from 'sagas/fetch'

import rootSaga from 'sagas'

const expect = require('chai').expect


describe('root saga', () => {
  it('flow', () => {
    const generator = rootSaga()
    expect(generator.next().value).to.deep.equal(
      fork(takeEvery, fetchTypes.FETCH_DATA, fetchAnythingSaga))
    expect(generator.next().value).to.deep.equal(
      fork(takeLatest, repoTypes.SEARCH_REPOSITORY, searchRepository))
  })
})
