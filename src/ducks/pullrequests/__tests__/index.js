/* eslint-disable max-len */

import chai from 'chai'
import reducer, {
  actions,
  types,
  entitiesReducer,
} from '../index'

import { requestPage } from 'ducks/pagination'

import { reduceArrayToObj } from 'ducks/normalizer'


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
  owner: {
    username: 'test2',
    email: 'test1@test.tt',
    fullName: 'test test11',
  },
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

const pr2 = {
  id: '2UHVsbFJlcXVlc3Q6MF==',
  description: 'test description2',
  title: 'Some test pull request 2',
  created: '2016-11-14 16:18:36.628901',
  updated: '2016-11-14 16:18:36.628916',
  status: 'new',
  owner: {
    username: 'test2',
    email: 'test2@test.tt',
    fullName: 'test test2',
  },
  origin: {
    revision: '2d1aa61c80fef159d0a61e8fcbd2150ed1bf6702',
    branch: 'graphics/gi/bugfix/staging2',
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

const pr3 = {
  id: '3UHVsbFJlcXVlc3Q6MR==',
  description: 'test description3',
  title: 'Some test pull request 3',
  created: '2016-11-13 16:18:36.628901',
  updated: '2016-11-13 16:18:36.628916',
  status: 'new',
  owner: {
    username: 'test3',
    email: 'test3@test.tt',
    fullName: 'test test44',
  },
  origin: {
    revision: '3d1aa61c80fef159d0a61e8fcbd2150ed1bf6702',
    branch: 'graphics/gi/bugfix/staging3',
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

const pr4 = {
  id: '4UHVsbFJlcXVlc3Q6MF==',
  description: 'test description4',
  title: 'Some test pull request4',
  created: '2016-11-12 16:18:36.628901',
  updated: '2016-11-12 16:18:36.628916',
  status: 'new',
  owner: {
    username: 'test4',
    email: 'test4@test.tt',
    fullName: 'test test44',
  },
  origin: {
    revision: '4d1aa61c80fef159d0a61e8fcbd2150ed1bf6702',
    branch: 'graphics/gi/bugfix/staging4',
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

const pr5 = {
  id: '5UHVsbFJlcXVlc3Q6MR==',
  description: 'test description5',
  title: 'Some test pull request 5',
  created: '2016-11-13 16:18:36.628901',
  updated: '2016-11-13 16:18:36.628916',
  status: 'new',
  owner: {
    username: 'test5',
    email: 'test5@test.tt',
    fullName: 'test test55',
  },
  origin: {
    revision: '1d1aa61c80fef159d0a61e8fcbd2150ed1bf6702',
    branch: 'graphics/gi/bugfix/staging5',
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

describe('pull request actions', () => {
  it('fetch pull requests', () => {
    const page = 1
    const pageSize = 12
    const action = {
      type: types.FETCH_PULL_REQUESTS,
      page,
      pageSize,
    }
    expect(actions.fetchPullRequests(page, pageSize)).to.eql(action)
  })

  it('set request', () => {
    const nodes = [pr1, pr2, pr3]
    const page = 1

    const action = {
      type: types.SET_PULL_REQUESTS,
      page,
      nodes,
    }
    expect(actions.setPullRequests(page, nodes)).to.eql(action)
  })

  it('fetch user pull request', () => {
    const page = 1
    const pageSize = 12
    const action = {
      type: types.FETCH_USER_PULL_REQUESTS,
      page,
      pageSize,
    }
    expect(actions.fetchUserPullRequests(page, pageSize)).to.eql(action)
  })

  it('fetch user assigned pull request', () => {
    const page = 1
    const pageSize = 12
    const action = {
      type: types.FETCH_USER_ASSIGNED_PULL_REQUESTS,
      page,
      pageSize,
    }
    expect(actions.fetchUserAssignedPullRequests(page, pageSize)).to.eql(action)
  })

  it('fetch user watching pull request', () => {
    const page = 1
    const pageSize = 12
    const action = {
      type: types.FETCH_USER_WATCHING_PULL_REQUESTS,
      page,
      pageSize,
    }
    expect(actions.fatchUserWatchingPullRequests(page, pageSize)).to.eql(action)
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
      entities: {},
      pagination: {
        total: 0,
        pages: {},
        pageSize: 0,
        currentPage: 0,
      },
    }
    expect(reducer(undefined, {})).to.eql(initialState)
  })

  it('should handle SET_PULL_REQUESTS', () => {
    const nodes = [pr1, pr2, pr3, pr4, pr5]
    const page = 1
    const state = {
      entities: reduceArrayToObj(nodes),
    }
    expect(reducer({}, actions.setPullRequests(page, nodes))).to.containSubset(state)
  })

  it('should handle FETCH_PULL_REQUESTS', () => {
    const nodes = [pr1, pr2, pr3, pr4, pr5]
    const page = 1
    const pageSize = 12
    const action = {
      type: types.FETCH_PULL_REQUESTS,
      page,
      nodes,
      pageSize,
    }
    const state = entitiesReducer({}, requestPage(action))

    expect(reducer({}, actions.fetchPullRequests(page, pageSize))).to.eql(state)
  })

  it('should handle FETCH_USER_PULL_REQUESTS', () => {
    const nodes = [pr1, pr2, pr3, pr4, pr5]
    const page = 1
    const pageSize = 12
    const action = {
      type: types.FETCH_USER_PULL_REQUESTS,
      page,
      nodes,
      pageSize,
    }
    const state = entitiesReducer({}, action)

    expect(reducer({}, actions.fetchUserPullRequests(page, pageSize))).to.eql(state)
  })

  it('should handle FETCH_USER_ASSIGNED_PULL_REQUESTS', () => {
    const nodes = [pr1, pr2, pr3, pr4, pr5]
    const page = 1
    const pageSize = 12
    const action = {
      type: types.FETCH_USER_ASSIGNED_PULL_REQUESTS,
      page,
      nodes,
      pageSize,
    }
    const state = entitiesReducer({}, action)

    expect(reducer({}, actions.fetchUserAssignedPullRequests(page, pageSize))).to.eql(state)
  })

  it('should handle FETCH_USER_WATCHING_PULL_REQUESTS', () => {
    const nodes = [pr1, pr2, pr3, pr4, pr5]
    const page = 1
    const pageSize = 12
    const action = {
      type: types.FETCH_USER_WATCHING_PULL_REQUESTS,
      page,
      nodes,
      pageSize,
    }
    const state = entitiesReducer({}, action)

    expect(reducer({}, actions.fatchUserWatchingPullRequests(page, pageSize))).to.eql(state)
  })
})
