/* eslint-disable max-len */

import { DEVELOPER_PERSONA } from 'universal/constants'
import { pullRequestsOwned, pullRequestsAssigned, pullRequestsWatching } from '../index'

const expect = require('chai').expect


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

const sessionState = {
  error: null,
  isFetching: false,
  persona: DEVELOPER_PERSONA,
  pullRequestsOwned: { pagination: { pages: { 1: [pr2.id, pr3.id], 2: [pr1.id, pr4.id] }, currentPage: 2 } },
  pullRequestsAssigned: { pagination: { pages: { 1: [pr1.id, pr3.id], 2: [pr2.id, pr4.id] }, currentPage: 1 } },
  pullRequestsWatching: { pagination: { pages: { 1: [pr2.id, pr1.id], 2: [pr4.id] }, currentPage: 1 } },
  profile: {
    username: 'testauthor1',
    email: 'test@test.ff',
    full_name: 'test test',
  },
}

const entities = {}
entities[pr1.id] = pr1
entities[pr2.id] = pr2
entities[pr3.id] = pr3
entities[pr4.id] = pr4
entities[pr5.id] = pr5

const pullrequstsState = {
  entities,
}

const state = {
  session: sessionState,
  pullrequests: pullrequstsState,
}

describe('session selectors', () => {
  it('get user pull requests', () => {
    expect(pullRequestsOwned(state)).to.eql([pr1, pr4])
  })

  it('get user pull requests - empty pull requests entities ', () => {
    const emptyState = {
      session: sessionState,
      pullrequests: {
        entities: {},
      },
    }
    expect(pullRequestsOwned(emptyState)).to.eql([])
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
      pullrequests: pullrequstsState,
    }
    expect(pullRequestsOwned(emptyState)).to.eql([])
  })


  it('get user assigned pull requests - empty pull requests list', () => {
    const emptyState = {
      session: sessionState,
      pullrequests: {
        entities: {},
      },
    }
    expect(pullRequestsAssigned(emptyState)).to.eql([])
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
      pullrequests: pullrequstsState,
    }
    expect(pullRequestsAssigned(emptyState)).to.eql([])
  })


  it('get user pull assigned requests', () => {
    expect(pullRequestsAssigned(state)).to.eql([pr1, pr3])
  })

  it('get user pull watching requests', () => {
    expect(pullRequestsWatching(state)).to.eql([pr2, pr1])
  })

  it('get user watching pull requests - empty pull requests list', () => {
    const emptyState = {
      session: sessionState,
      pullrequests: {
        entities: {},
      },
    }
    expect(pullRequestsWatching(emptyState)).to.eql([])
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
      pullrequests: pullrequstsState,
    }
    expect(pullRequestsWatching(emptyState)).to.eql([])
  })
})

