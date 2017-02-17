/* eslint-disable max-len */

import { DEVELOPER_PERSONA } from 'universal/constants'
import {
  getPullRequestsOwned,
  getPullRequestsAssigned,
  getPullRequestsWatching,
  getOwnedFetchStatus,
  getAssignedFetchStatus,
  getPersona,
  getLoggedUsername,
  getPullRequestsOwnedTotal,
  getLoggedUserAvatar,
  getPullRequestsAssignedTotal,
} from '../index'

import { types } from 'ducks/session/actions'

const expect = require('chai').expect

const pr1 = {
  id: '1UHVsbFJlcXVlc3Q6MQ==',
  description: 'test description',
  title: 'Some test pull request 1',
  created: '2016-11-15 16:18:36.628901',
  updated: '2016-11-15 16:18:36.628916',
  status: 'new',
  owner: 16,
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
  owner: 15,
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
  owner: 14,
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
  owner: 13,
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
  owner: 12,
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

const sessionState = {
  pullRequestsOwned: { pagination: { pages: { 1: [pr2.id, pr3.id], 2: [pr1.id, pr4.id] }, currentPage: 2 } },
  pullRequestsAssigned: { pagination: { pages: { 1: [pr1.id, pr3.id], 2: [pr2.id, pr4.id] }, currentPage: 1 } },
  pullRequestsWatching: { pagination: { pages: { 1: [pr2.id, pr1.id], 2: [pr4.id] }, currentPage: 1 } },
  profile: {
    persona: DEVELOPER_PERSONA,
    username: 'testauthor1',
    email: 'test@test.ff',
    full_name: 'test test',
  },
}

const pullRequests = {}
pullRequests[pr1.id] = pr1
pullRequests[pr2.id] = pr2
pullRequests[pr3.id] = pr3
pullRequests[pr4.id] = pr4
pullRequests[pr5.id] = pr5

const users = [
  16: {
    id: 16,
    username: 'test2',
    email: 'test1@test.tt',
    fullName: 'test test11',
  },
  12:{
    id: 12,
    username: 'test5',
    email: 'test5@test.tt',
    fullName: 'test test55',
  },
  13: {
    id: 13,
    username: 'test4',
    email: 'test4@test.tt',
    fullName: 'test test44',
  },
  14: {
    id: 14,
    username: 'test3',
    email: 'test3@test.tt',
    fullName: 'test test44',
  },
  15:{
    id: 15,
    username: 'test2',
    email: 'test2@test.tt',
    fullName: 'test test2',
  },
]

const state = {
  session: sessionState,
  entities: {
    pullRequests,
    users,
  },
}

describe('session selectors', () => {
  it('get user pull requests', () => {
    const denormalized = [{ ...pr1, owner: users[pr1.owner] }, { ...pr4, owner: users[pr4.owner] }]
    expect(getPullRequestsOwned(state)).to.eql(denormalized)
  })

  it('get user pull requests - empty pull requests entities ', () => {
    const emptyState = {
      session: sessionState,
      entities: {
        pullRequests: {
        },
      },
    }
    expect(getPullRequestsOwned(emptyState)).to.eql([])
  })

  it('get user pull requests - empty session page', () => {
    const emptyState = {
      session: {
        pullRequestsOwned: {
          pagination: {
            pages: [],
          },
        },
      },
      entities: {
        pullRequests,
      },
    }
    expect(getPullRequestsOwned(emptyState)).to.eql([])
  })

  it('get user assigned pull requests - empty pull requests list', () => {
    const emptyState = {
      session: sessionState,
      entities: {
        pullRequests: {},
      },
    }
    expect(getPullRequestsAssigned(emptyState)).to.eql([])
  })

  it('get user assigned pull requests - empty session page', () => {
    const emptyState = {
      session: {
        pullRequestsAssigned: {
          pagination: {
            pages: [],
          },
        },
      },
      entities: {
        pullRequests,
      },
    }
    expect(getPullRequestsAssigned(emptyState)).to.eql([])
  })

  it('get user pull assigned requests', () => {
    const denormalized = [{ ...pr1, owner: users[pr1.owner] }, { ...pr3, owner: users[pr3.owner] }]
    expect(getPullRequestsAssigned(state)).to.eql(denormalized)
  })

  it('get user pull watching requests', () => {
    const denormalized = [{ ...pr2, owner: users[pr2.owner] }, { ...pr1, owner: users[pr1.owner] }]
    expect(getPullRequestsWatching(state)).to.eql(denormalized)
  })

  it('get user watching pull requests - empty pull requests list', () => {
    const emptyState = {
      session: sessionState,
      entities: {
        pullRequests: {},
      },
    }
    expect(getPullRequestsWatching(emptyState)).to.eql([])
  })

  it('get user watching pull requests - empty session page', () => {
    const emptyState = {
      session: {
        pullRequestsWatching: {
          pagination: {
            pages: [],
          },
        },
      },
      entities: {
        pullRequests,
      },
    }
    expect(getPullRequestsWatching(emptyState)).to.eql([])
  })

  it('getPersona', () => {
    const persona = 'some persona'
    const st = {
      session: {
        profile: {
          persona,
        },
      },
    }
    expect(getPersona(st)).to.eql(persona)
  })

  it('getLoggedUsername', () => {
    const username = 'someusername'
    const st = {
      entities: {
        me: {
          username,
        },
      },
    }
    expect(getLoggedUsername(st)).to.eql(username)
  })

  it('getLoggedUserAvatar', () => {
    const username = 'someusername'
    const id = 12
    const avatar = 'avatar link'
    const st = {
      entities: {
        me: {
          id,
          username,
        },
        users: {
          12: {
            slack: {
              avatar,
            },
          },
        },
      },
    }
    expect(getLoggedUserAvatar(st)).to.eql(avatar)
  })

  it('getPullRequestsOwnedTotal', () => {
    const total = 12
    const st = {
      entities: {
        me: {
          pullRequestsOwned: {
            total,
          },
        },
      },
    }
    expect(getPullRequestsOwnedTotal(st)).to.eql(total)
  })

  it('getPullRequestsAssignedTotal', () => {
    const total = 12
    const st = {
      entities: {
        me: {
          pullRequestsAssigned: {
            total,
          },
        },
      },
    }
    expect(getPullRequestsAssignedTotal(st)).to.eql(total)
  })

  it('getOwnedFetchStatus for owned pull requests', () => {
    const st = { fetch: { [types.FETCH_USER_PULL_REQUESTS]: { isFetching: false } } }
    expect(getOwnedFetchStatus(st)).to.eql({ error: null, isFetching: false })

    const state2 = { fetch: { [types.FETCH_USER_PULL_REQUESTS]: { isFetching: true } } }
    expect(getOwnedFetchStatus(state2)).to.eql({ error: null, isFetching: true })

    expect(getOwnedFetchStatus({ fetch: {} })).to.eql({ error: null, isFetching: false })
  })

  it('getAssignedFetchStatus for owned pull requests', () => {
    const st = { fetch: { [types.FETCH_USER_ASSIGNED_PULL_REQUESTS]: { isFetching: false } } }
    expect(getAssignedFetchStatus(st)).to.eql({ error: null, isFetching: false })

    const state2 = { fetch: { [types.FETCH_USER_ASSIGNED_PULL_REQUESTS]: { isFetching: true } } }
    expect(getAssignedFetchStatus(state2)).to.eql({ error: null, isFetching: true })

    expect(getAssignedFetchStatus({ fetch: {} })).to.eql({ error: null, isFetching: false })
  })
})

