import { target } from '../index'

import { PullRequestSource } from 'universal/constants'
const expect = require('chai').expect


describe('target reducer', () => {
  it('empty target branch name', () => {
    const branchName = 'testbranch'
    const action = {
      type: 'ANY',
      target: {
        name: branchName,
        type: 'branch',
      },
    }
    expect(target(undefined, action)).to.eql({ name: branchName, type: 'branch' })
  })

  it('default branch name', () => {
    const action = {
      type: 'ANY',
    }
    expect(target(undefined, action)).to.eql({ name: '', type: PullRequestSource.BRANCH })
  })
})

