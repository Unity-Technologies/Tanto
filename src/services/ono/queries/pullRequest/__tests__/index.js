import {
  pullRequestQuery,
} from 'services/ono/queries/pullRequest'

import chai from 'chai'

const expect = chai.expect

describe('pullRequest queries', () => {
  it('pullRequestQuery parses response', () => {
    const pullRequest = { id: 1, title: 'sdfas' }
    const response = { data: { pullRequest } }
    expect(pullRequestQuery(response)).to.eql(pullRequest)
  })
})
