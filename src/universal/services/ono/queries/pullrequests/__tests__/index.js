import { constants, parsers } from 'services/ono/queries/pullrequests'

const expect = require('chai').expect

const node1 = {
  id: 'UHVsbFJlcXVlc3Q6MQ==',
  title: 'Some test pull request 1',
  origin: {
    revision: '2d1aa61c80fef159d0a61e8fcbd2150ed1bf6702',
    branch: 'graphics/gi/bugfix/staging1',
    repository: {
      name: 'unity/unity',
    },
  },
  target: {
    branch: 'trunk',
    repository: {
      name: 'unity/unity',
    },
  },
}

const node2 = {
  id: 'UHVsbFJlcXVlc3Q6NQ==',
  title: 'Some test pull request 2',
  origin_rev: '2d1aa61c80fef159d0a61e8fcbd2150ed1bf6702',
  origin_branch: 'graphics/gi/bugfix/staging2',
  origin_repository: {
    id: 'UmVwb3NpdG9yeTos',
  },
  dest_branch: 'trunk',
  dest_repository: {
    id: 'UmVwb3NpdG9yeTos',
  },
}

const testnodes = [
  {
    node: node1,
  },
  {
    node: node2,
  },
]

const testResponse = (property, pullrequests, total) => {
  const response = {
    data: {
      me: {
      },
    },
  }
  response.data.me[property] = {
    nodes: pullrequests,
    total,
  }

  return response
}

describe('services pullrequests query parsers', () => {
  it('parseCurrentUserPullRequests', () => {
    const response = testResponse(constants.pullRequestsOwned, testnodes, 12)
    expect(parsers.parseCurrentUserPullRequests(response))
      .to.be.eql({ nodes: testnodes, total: 12 })
  })

  it('parseCurrentUserAssignedPullRequests', () => {
    const response = testResponse(constants.pullRequestsAssigned, testnodes, 10)
    expect(parsers.parseCurrentUserAssignedPullRequests(response))
      .to.be.eql({ nodes: testnodes, total: 10 })
  })
})

