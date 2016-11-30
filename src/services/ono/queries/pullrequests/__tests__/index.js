import { constants, parsers } from 'services/ono/queries/pullrequests'

const expect = require('chai').expect


const node1 = {
  id: 'UHVsbFJlcXVlc3Q6MQ==',
  title: 'Some test pull request 1',
}
const node2 = {
  id: 'UHVsbFJlcXVlc3Q6NQ==',
  title: 'Some test pull request 2',
}
const node3 = {
  id: 'UHVsbFJlcXVlc3Q6DQ==',
  title: 'Some test pull request 3',
}

const testnodes = [
  {
    node: node1,
  },
  {
    node: node2,
  },
  {
    node: node3,
  },
]

const testResponse = (property, pullrequests) => {
  const response = {
    data: {
      me: {
      },
    },
  }
  response.data.me[property] = {
    edges: pullrequests,
  }

  return response
}

describe('services pullrequests query parsers', () => {
  it('parseCurrentUserPullRequests', () => {
    const response = testResponse(constants.pull_requests_owned, testnodes)
    expect(parsers.parseCurrentUserPullRequests(response)).to.be.eql([node1, node2, node3])
  })

  it('parseCurrentUserPullRequests', () => {
    const response = testResponse(constants.pull_requests_under_review, testnodes)
    expect(parsers.parseCurrentUserAssignedPullRequests(response)).to.be.eql([node1, node2, node3])
  })

  it('parseCurrentUserPullRequests', () => {
    const response = testResponse(constants.pull_requests_participating, testnodes)
    expect(parsers.parseCurrentUserWatchingPullRequests(response)).to.be.eql([node1, node2, node3])
  })
})
