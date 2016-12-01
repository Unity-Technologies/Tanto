/* eslint-disable max-len */

import chai from 'chai'
import reducer, {
  computePullRequestLink,
  computePullRequestOriginLink,
  computePullRequestTargetLink,
  flattenPullRequestUsername,
  computePullRequest,
  actions,
  types,
} from '../index'

const expect = chai.expect
const chaiSubset = require('chai-subset')
chai.use(chaiSubset)

const pr1 = {
  id: '1UHVsbFJlcXVlc3Q6MQ==',
  description: 'test description',
  title: 'Some test pull request 1',
  created: '2016-11-15 16:18:36.628901',
  updated: '2016-11-15 16:18:36.628916',
  status: 'new',
  originBranch: 'graphics/gi/bugfix/staging',
  destBranch: 'trunk',
  owner: {
    username: 'test1',
    email: 'test1@test.tt',
    full_name: 'test test1',
  },
  originRepository: {
    name: 'unity/unity',
  },
  originRev: '1d1aa61c80fef159d0a61e8fcbd2150ed1bf6702',
  destRepository: {
    name: 'unity/unity',
  },
}

const pr2 = {
  id: '2UHVsbFJlcXVlc3Q6MF==',
  description: 'test description2',
  title: 'Some test pull request 2',
  created: '2016-11-14 16:18:36.628901',
  updated: '2016-11-14 16:18:36.628916',
  status: 'new',
  originBranch: 'graphics/gi/bugfix/staging2',
  destBranch: 'trunk',
  owner: {
    username: 'test2',
    email: 'test2@test.tt',
    full_name: 'test test2',
  },
  originRepository: {
    name: 'unity/unity',
  },
  originRev: '1d1aa61c80fef159d0a61e8fcbd2150ed1bf6702',
  destRepository: {
    name: 'unity/unity',
  },
}

const pr3 = {
  id: '3UHVsbFJlcXVlc3Q6MR==',
  description: 'test description3',
  title: 'Some test pull request 3',
  created: '2016-11-13 16:18:36.628901',
  updated: '2016-11-13 16:18:36.628916',
  status: 'new',
  originBranch: 'graphics/gi/bugfix/staging3',
  destBranch: 'trunk',
  owner: {
    username: 'test3',
    email: 'test3@test.tt',
    full_name: 'test test23',
  },
  originRepository: {
    name: 'unity/unity',
  },
  originRev: '1d1aa61c80fef159d0a61e8fcbd2150ed1bf6702',
  destRepository: {
    name: 'unity/unity',
  },
}

const pr4 = {
  id: '4UHVsbFJlcXVlc3Q6MF==',
  description: 'test description4',
  title: 'Some test pull request4',
  created: '2016-11-12 16:18:36.628901',
  updated: '2016-11-12 16:18:36.628916',
  status: 'new',
  originBranch: 'graphics/gi/bugfix/staging4',
  destBranch: 'trunk',
  owner: {
    username: 'test4',
    email: 'test4@test.tt',
    full_name: 'test test4',
  },
  originRepository: {
    name: 'unity/unity',
  },
  originRev: '1d1aa61c80fef159d0a61e8fcbd2150ed1bf6702',
  destRepository: {
    name: 'unity/unity',
  },
}

const pr5 = {
  id: '5UHVsbFJlcXVlc3Q6MR==',
  description: 'test description5',
  title: 'Some test pull request 5',
  created: '2016-11-13 16:18:36.628901',
  updated: '2016-11-13 16:18:36.628916',
  status: 'new',
  originBranch: 'graphics/gi/bugfix/staging5',
  destBranch: 'trunk',
  owner: {
    username: 'test5',
    email: 'test5@test.tt',
    full_name: 'test test55',
  },
  originRepository: {
    name: 'unity/unity',
  },
  originRev: '1d1aa61c80fef159d0a61e8fcbd2150ed1bf6702',
  destRepository: {
    name: 'unity/unity',
  },
}

describe('actions', () => {
  it('request error', () => {
    const error = 'test error'
    const action = {
      type: types.REQUEST_ERROR,
      error,
    }
    expect(actions.requestError(error)).to.eql(action)
  })

  it('clear error', () => {
    const action = {
      type: types.CLEAR_ERROR,
    }
    expect(actions.clearError()).to.eql(action)
  })

  it('sending request', () => {
    const action = {
      type: types.SENDING_REQUEST,
      sending: true,
    }
    expect(actions.sendingRequest(true)).to.eql(action)
  })

  it('fetch pull requests', () => {
    const action = {
      type: types.SENDING_REQUEST,
      sending: true,
    }
    expect(actions.sendingRequest(true)).to.eql(action)
  })

  it('set request', () => {
    const pullrequests = [pr1, pr2, pr3]

    const action = {
      type: types.SET_PULL_REQUESTS,
      pullrequests,
    }
    expect(actions.setPullRequests(pullrequests)).to.eql(action)
  })

  it('fetch user pull request', () => {
    expect(actions.fetchUserPullRequests()).to.eql({ type: types.FETCH_USER_PULL_REQUESTS })
  })

  it('fetch user assigned pull request', () => {
    expect(actions.fetchUserAssignedPullRequests()).to.eql({ type: types.FETCH_USER_ASSIGNED_PULL_REQUESTS })
  })

  it('fetch user watching pull request', () => {
    expect(actions.fatchUserWatchingPullRequests()).to.eql({ type: types.FETCH_USER_WATCHING_PULL_REQUESTS })
  })
})


describe('pullrequests reducer', () => {
  const byId = {}
  byId[pr1.id] = pr1
  byId[pr2.id] = pr2
  byId[pr3.id] = pr3
  byId[pr4.id] = pr4
  byId[pr5.id] = pr5

  it('should return initial state', () => {
    const initialState = {
      error: null,
      isFetching: false,
      byId: {},
      allIds: [],
    }
    expect(reducer(undefined, {})).to.eql(initialState)
  })

  it('should handle SET_PULL_REQUESTS', () => {
    const prs = [pr1, pr2, pr3, pr4, pr5]
    const state = {
      byId,
      allIds: prs.map(x => x.id),
    }
    expect(reducer({}, actions.setPullRequests(prs))).to.containSubset(state)
  })

  it('should handle REQUEST_ERROR', () => {
    const error = 'test error message'
    expect(reducer({}, actions.requestError(error))).to.eql({ error })
  })

  it('should handle SENDING_REQUEST', () => {
    expect(reducer({}, actions.sendingRequest(true))).to.eql({ isFetching: true })
    expect(reducer({ isFetching: false }, actions.sendingRequest(true))).to.eql({ isFetching: true })
    expect(reducer({ isFetching: true }, actions.sendingRequest(false))).to.eql({ isFetching: false })
  })

  it('should handle CLEAR_ERROR', () => {
    const error = 'test error message'
    expect(reducer({ error }, actions.clearError(error))).to.eql({ error: null })
  })
})

describe('session selectors computations', () => {
  const pullrequest = {
    id: '1UHVsbFJlcXVlc3Q6MQ==',
    description: 'test description',
    title: 'Some test pull request 1',
    created: '2016-11-15 16:18:36.628901',
    updated: '2016-11-15 16:18:36.628916',
    status: 'new',
    originBranch: 'graphics/gi/bugfix/staging',
    destBranch: 'trunk',
    owner: {
      username: 'test1',
      email: 'test1@test.tt',
      full_name: 'test test1',
    },
    originRepository: {
      name: 'unity/unity',
    },
    originRev: '1d1aa61c80fef159d0a61e8fcbd2150ed1bf6702',
    destRepository: {
      name: 'unity/unity',
    },
  }

  it('computePullRequestLink', () => {
    const link = (name, id) => `/${name}/pullrequest/${id}`
    expect(computePullRequestLink(pullrequest, link)).to.be.eql({
      ...pullrequest,
      link: link(pullrequest.originRepository.name, pullrequest.id),
    })
  })

  it('computePullRequestOriginLink', () => {
    const link = (name, branch) => `/${name}?${branch}`
    expect(computePullRequestOriginLink(pullrequest, link)).to.be.eql({
      ...pullrequest,
      originLink: link(pullrequest.originRepository.name, pullrequest.originBranch),
    })
  })

  it('computePullRequestTargetLink', () => {
    const link = (name, branch) => `/${name}?${branch}`
    expect(computePullRequestTargetLink(pullrequest, link)).to.be.eql({
      ...pullrequest,
      destLink: link(pullrequest.destRepository.name, pullrequest.destBranch),
    })
  })

  it('flattenPullRequestUsername', () => {
    expect(flattenPullRequestUsername(pullrequest)).to.be.eql({
      ...pullrequest,
      username: pullrequest.owner.username,
    })
  })

  it('computePullRequest', () => {
    const fn1 = (name, branch) => `/${name}?${branch}`
    const fn2 = (name, id) => `/${name}/pullrequest/${id}`

    const computed = computePullRequest(pullrequest)(fn1)(fn2)
    expect(computed).to.be.eql({
      ...pullrequest,
      link: fn2(pullrequest.originRepository.name, pullrequest.id),
      destLink: fn1(pullrequest.destRepository.name, pullrequest.destBranch),
      originLink: fn1(pullrequest.originRepository.name, pullrequest.originBranch),
      username: pullrequest.owner.username,
    /**
     * test build data
     */

      buildStatus: 'success',
      buildName: 'ABV-2333',
      buildDate: '2016-11-14 16:18:36.628916',
      buildLink: '#',
    })
  })
})

