/* @flow */

import { actions } from 'ducks/projects'
import { queries,
         parseProjectsData,
         parseToplevelProjectsData } from 'services/ono/queries/projects'
import { put, call } from 'redux-saga/effects'
import { get } from 'services/ono/api'

import { fetchProjects } from '../'

const expect = require('chai').expect

// dummy data

const NESTED_GROUPS = {
  data: {
    group: {
      repositories: {
        nodes: [
          {
            name: 'test',
            id: '2',
            owner: {
              fullName: 'Test Name',
            },
            description: 'Test',
            updated: 'Timestamp',
          },
        ],
      },
      groups: [
        {
          name: 'Nested-Group',
          description: 'Also description',
        },
      ],
    },
  },
}

const TOPLEVEL = {
  data: {
    repositories: {
      nodes: [
        {
          name: 'test',
          id: '2',
          owner: {
            fullName: 'Test Name',
          },
          description: 'Test',
          updated: 'Timestamp',
        },
      ],
    },
    groups: [
      {
        name: 'Single-Group',
        description: 'Also description',
      },
    ],
  },
}


describe('fetchProjects Saga test with empty path', () => {
  const action = { path: '' }
  const generator = fetchProjects(action)

  const step1 = generator.next()
  const step2 = generator.next()
  const step3 = generator.next(TOPLEVEL)
  const step4 = generator.next()
  it('Should set isFetching to true', () => {
    expect(step1.value).to.eql(put(actions.fetchingStatus(true)))
  })

  it('Should call the API with the projects fetch query', () => {
    expect(step2.value).to.eql(call(get, queries.GET_TOPLEVEL_PROJECTS_QUERY))
  })

  it('Should call put the result in the store', () => {
    expect(step3.value).to.eql(
      put(actions.fetchProjectsSuccess(parseToplevelProjectsData(TOPLEVEL))))
  })

  it('Should set isFetching to false', () => {
    expect(step4.value).to.eql(put(actions.fetchingStatus(false)))
  })
})

describe('fetchProjects Saga test with a path', () => {
  const action = { path: 'some/path' }
  const generator = fetchProjects(action)

  const step1 = generator.next()
  const step2 = generator.next()
  const step3 = generator.next(NESTED_GROUPS)
  const step4 = generator.next()
  it('Should set isFetching to true', () => {
    expect(step1.value).to.eql(put(actions.fetchingStatus(true)))
  })

  it('Should call the API with the projects fetch query', () => {
    expect(step2.value).to.eql(call(get, queries.GET_PROJECTS_QUERY, { name: action.path }))
  })

  it('Should call put the result in the store', () => {
    expect(step3.value).to.eql(
      put(actions.fetchProjectsSuccess(parseProjectsData(NESTED_GROUPS), action.path)))
  })

  it('Should set isFetching to false', () => {
    expect(step4.value).to.eql(put(actions.fetchingStatus(false)))
  })
})
