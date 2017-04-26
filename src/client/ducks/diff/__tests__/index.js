/* eslint-disable */

import chai from 'chai'
import {
  types,
  setDiff,
  invalidateDiff,
  processDiff,
  diff
} from '../index'

import storeMock from 'tests/mocks/storeMock'
import fetchMock from 'fetch-mock'

const expect = chai.expect
const chaiSubset = require('chai-subset')
chai.use(chaiSubset)


describe('actions', () => {
  it('invalidateDiff', () => {
    const id = 'testid'
    expect(invalidateDiff(id, diff)).to.eql({ type: types.INVALIDATE_DIFF, id })
  })

  it('processDiff', () => {
    const id = 'testid'
    const diff = 'testdiff'
    const type = 'c/testtype'
    const diffType = 0
    expect(processDiff(id, type, diff, diffType)).to.eql({
      type: types.PROCESS_DIFF,
      meta: {
        WebWorker: true,
      },
      payload: {
        diff,
        type,
        id,
        diffType,
      },
    })
  })
})

describe('diff reducer', () => {
  it('should handle SET_DIFF', () => {

    const id = 'testid'
    const processedDiff = ['testdiff', 'line2']

    const action = {
      type: types.SET_DIFF,
      payload: {
        diffType: 0,
        type: 'javascript',
        id,
        diff: processedDiff,
      },
    }
    const expected = {
      [id]: {
        [0]: processedDiff
      }
    }
    expect(diff({}, action)).to.eql(expected)
  })

  it('should handle SET_DIFF different type', () => {
    const id = 'testid'
    const initialState = {
      [id]: {
        [0]: ['testdiff1', 'line21']
      }
    }

    const processedDiff = ['testdiff', 'line2']

    const action = {
      type: types.SET_DIFF,
      payload: {
        diffType: 1,
        type: 'javascript',
        id,
        diff: processedDiff,
      },
    }
    const expected = {
      [id]: {
        [0]: ['testdiff1', 'line21'],
        [1]: processedDiff
      }
    }
    expect(diff(initialState, action)).to.eql(expected)
  })

  it('should handle INVALIDATE_DIFF different type', () => {
    const id = 'testid'
    const initialState = {
      [id]: {
        [0]: ['testdiff1', 'line21']
      }
    }

    const action = {
      type: types.INVALIDATE_DIFF,
      id
    }
    const expected = {
      [id]: null
    }
    expect(diff(initialState, action)).to.eql(expected)
  })

  it('should return state for undefined action types', () => {
    const id = 'testid'
    const initialState = {
      [id]: {
        [0]: ['testdiff1', 'line21']
      }
    }

    const action = {
      type: types.INVALIDATE_DIFF2,
      id
    }

    expect(diff(initialState, action)).to.eql(initialState)
  })
})


