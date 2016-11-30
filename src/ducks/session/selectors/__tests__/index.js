import { DEVELOPER_PERSONA } from 'ducks/session'
import { selectors } from '../index'

const expect = require('chai').expect

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

const sessionState = {
  error: null,
  isFetching: false,
  persona: DEVELOPER_PERSONA,
  pr_ids: [pr2.id, pr3.id],
  pr_assigned_ids: [pr1.id, pr4.id],
  pr_watching_ids: [pr5.id],
  profile: {
    username: 'testauthor1',
    email: 'test@test.ff',
    full_name: 'test test',
  },
}

const byId = {}
byId[pr1.id] = pr1
byId[pr2.id] = pr2
byId[pr3.id] = pr3
byId[pr4.id] = pr4
byId[pr5.id] = pr5

const pullrequstsState = {
  byId,
}

const state = {
  session: sessionState,
  pullrequests: pullrequstsState,
}

describe('session selectors', () => {
  it('get persona', () => {
    expect(selectors.getPersona(state)).to.eql(DEVELOPER_PERSONA)
  })

  it('get profile', () => {
    expect(selectors.getProfile(state)).to.eql(sessionState.profile)
  })

  it('get user pull requests', () => {
    expect(selectors.getPullRequests(state)).to.eql([pr2, pr3])
  })

  it('get user pull assigned requests', () => {
    expect(selectors.getPullRequestsAssigned(state)).to.eql([pr1, pr4])
  })

  it('get user pull watching requests', () => {
    expect(selectors.getPullRequestsWatching(state)).to.eql([pr5])
  })
})

