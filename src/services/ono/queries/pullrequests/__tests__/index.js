import { constants, parsers, transform } from 'services/ono/queries/pullrequests'

const expect = require('chai').expect


const node1 = {
  id: 'UHVsbFJlcXVlc3Q6MQ==',
  title: 'Some test pull request 1',
  origin_rev: '1d1aa61c80fef159d0a61e8fcbd2150ed1bf6702',
  origin_branch: 'graphics/gi/bugfix/staging',
  origin_repository: {
    id: 'UmVwb3NpdG9yeTox',
  },
  dest_branch: 'trunk',
  dest_repository: {
    id: 'UmVwb3NpdG9yeTox',
  },
}
const node1Transformed = {
  id: 'UHVsbFJlcXVlc3Q6MQ==',
  title: 'Some test pull request 1',
  originRev: '1d1aa61c80fef159d0a61e8fcbd2150ed1bf6702',
  originBranch: 'graphics/gi/bugfix/staging',
  originRepository: {
    id: 'UmVwb3NpdG9yeTox',
  },
  destBranch: 'trunk',
  destRepository: {
    id: 'UmVwb3NpdG9yeTox',
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

const node2Transformed = {
  id: 'UHVsbFJlcXVlc3Q6NQ==',
  title: 'Some test pull request 2',
  originRev: '2d1aa61c80fef159d0a61e8fcbd2150ed1bf6702',
  originBranch: 'graphics/gi/bugfix/staging2',
  originRepository: {
    id: 'UmVwb3NpdG9yeTos',
  },
  destBranch: 'trunk',
  destRepository: {
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
    expect(parsers.parseCurrentUserPullRequests(response))
      .to.be.eql([node1Transformed, node2Transformed])
  })

  it('parseCurrentUserPullRequests', () => {
    const response = testResponse(constants.pull_requests_under_review, testnodes)
    expect(parsers.parseCurrentUserAssignedPullRequests(response))
      .to.be.eql([node1Transformed, node2Transformed])
  })

  it('parseCurrentUserPullRequests', () => {
    const response = testResponse(constants.pull_requests_participating, testnodes)
    expect(parsers.parseCurrentUserWatchingPullRequests(response))
      .to.be.eql([node1Transformed, node2Transformed])
  })

  it('transforms reponse to camelCase', () => {
    const obj = {
      id: 'testid',
      title: 'test_title',
      origin_branch: 'graphics',
      dest_branch: 'trunk',
    }
    const objExpected = {
      id: 'testid',
      title: 'test_title',
      originBranch: 'graphics',
      destBranch: 'trunk',
    }
    const keyMap = {
      origin_branch: 'originBranch',
      dest_branch: 'destBranch',
    }
    expect(transform(obj, keyMap)).to.be.eql(objExpected)
  })
})

