/* eslint-disable max-len */

import { repo, profile, pullRequestsAssigned, pullRequestsOwned } from '../index'
import { types } from '../actions'
const expect = require('chai').expect
import { DEVELOPER_PERSONA } from 'universal/constants'


describe('session profile reducer', () => {
  it('should handle SET_USER_PERSONA', () => {
    const newPersona = 'test'
    const initialState = {
      persona: DEVELOPER_PERSONA,
    }

    expect(profile(initialState, { type: types.SET_USER_PERSONA, persona: newPersona })).to.eql({ persona: newPersona })
  })

  it('should not other actions', () => {
    const newPersona = 'test'
    const initialState = {
      persona: DEVELOPER_PERSONA,
    }

    expect(profile(initialState, { type: 'OTHER_ACTION', persona: newPersona })).to.eql(initialState)
  })
})


// describe('pullRequestsOwned reducers', () => {
//   it('repo reducer', () => {
//     const repoName = 'testrepo'
//     const action = {
//       type: 'ANY',
//       repo: repoName,
//     }
//     expect(pullRequestsOwned({}, action)).to.eql(null)
//     throw new Error('fail')
//   })
// })

// describe('pullRequestsAssigned reducers', () => {
//   it('repo reducer', () => {
//     const repoName = 'testrepo'
//     const action = {
//       type: 'ANY',
//       repo: repoName,
//     }
//     // expect(pullRequestsOwned({}, action)).to.eql(repoName)
//     throw new Error('fail')
//   })
// })

