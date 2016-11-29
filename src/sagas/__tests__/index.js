/* @flow */

/* eslint-disable func-names, prefer-arrow-callback */

import { actions } from 'ducks/projects'
import { queries } from 'services/ono/queries/projects'
import { put, call } from 'redux-saga/effects'
import { get } from 'services/ono/api'

import { fetchProjects } from '../'

const expect = require('chai').expect

// dummy data

const data = {
  data: 'some data',
}

describe('fetchProjects Saga test', function () {
  const generator = fetchProjects()

  const step1 = generator.next()
  const step2 = generator.next()
  const step3 = generator.next(data)
  const step4 = generator.next()
  it('Should set isFetching to true', function () {
    expect(step1.value).to.eql(put(actions.fetchingStatus(true)))
  })

  it('Should call the API with the projects fetch query', function () {
    expect(step2.value).to.eql(call(get, queries.PROJECT_LIST_QUERY))
  })

  it('Should call put the result in the store', function () {
    expect(step3.value).to.eql(put(actions.fetchProjectsSuccess(data.data)))
  })

  it('Should set isFetching to false', function () {
    expect(step4.value).to.eql(put(actions.fetchingStatus(false)))
  })
})
