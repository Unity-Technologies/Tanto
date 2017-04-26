import chai from 'chai'
import {
  repoEntitiesSelector,
  getRepositories,
  groupsEntitiesSelector,
  getGroups,
  getRepositoryId,
  getRepositoriesFetchStatus,
  pathnameSelector,
  getRepositoriesFetchState,
  repoBranchesSelector,
  getRepositoryBranches,
  repoIdSelector,
  getChangelog,
  parseMercurialAuthor,
} from '../index'

import { types } from 'ducks/repositories/actions'

const expect = chai.expect

describe('repositories selectors', () => {
  it('repoEntitiesSelector returns the first level projects', () => {
    const node1 = {
      id: 1,
      name: 'name1',
      description: 'description1',
      groupPath: null,
    }
    const node2 = {
      id: 2,
      name: 'name2',
      description: 'description2',
      groupPath: null,
    }
    const node3 = {
      id: 3,
      name: 'name3',
      description: 'description3',
      groupPath: '/projects/testgroup',
    }

    const state = {
      entities: {
        repositories: {
          1: node1,
          2: node2,
          3: node3,
        },
      },
    }

    const props = {
      params: {
        splat: undefined,
      },
    }

    expect(repoEntitiesSelector(state, props)).to.eql({ 1: node1, 2: node2 })
  })

  it('repoEntitiesSelector returns the nested level projects', () => {
    const node1 = {
      id: 1,
      name: 'name1',
      description: 'description1',
      groupPath: null,
    }
    const node2 = {
      id: 2,
      name: 'name2',
      description: 'description2',
      groupPath: null,
    }
    const node3 = {
      id: 3,
      name: 'name3',
      description: 'description3',
      groupPath: '/projects/testgroup',
    }

    const state = {
      entities: {
        repositories: {
          1: node1,
          2: node2,
          3: node3,
        },
      },
    }

    const props = {
      params: {
        splat: '/projects/testgroup',
      },
    }

    expect(repoEntitiesSelector(state, props)).to.eql({ 3: node3 })
  })

  it('getRepositories selector returns the nested level projects list', () => {
    const node1 = {
      id: 1,
      name: 'name1',
      description: 'description1',
      groupPath: null,
    }
    const node2 = {
      id: 2,
      name: 'name2',
      description: 'description2',
      groupPath: null,
    }
    const node3 = {
      id: 3,
      name: 'name3',
      description: 'description3',
      groupPath: '/projects/testgroup',
    }

    const state = {
      entities: {
        repositories: {
          1: node1,
          2: node2,
          3: node3,
        },
      },
    }

    const props = {
      params: {
        splat: '/projects/testgroup',
      },
    }

    expect(getRepositories(state, props)).to.eql([node3])
  })

  it('getRepositories selector returns the first level projects list', () => {
    const node1 = {
      id: 1,
      name: 'name1',
      description: 'description1',
      groupPath: null,
    }
    const node2 = {
      id: 2,
      name: 'name2',
      description: 'description2',
      groupPath: null,
    }
    const node3 = {
      id: 3,
      name: 'name3',
      description: 'description3',
      groupPath: '/projects/testgroup',
    }

    const state = {
      entities: {
        repositories: {
          1: node1,
          2: node2,
          3: node3,
        },
      },
    }

    const props = {
      params: {
        splat: undefined,
      },
    }

    expect(getRepositories(state, props)).to.eql([node1, node2])
  })

  it('groupsEntitiesSelector returns the first level groups list', () => {
    const node1 = {
      id: 1,
      name: 'name1',
      description: 'description1',
      parentGroupName: null,
    }
    const node2 = {
      id: 2,
      name: 'name2',
      description: 'description2',
      parentGroupName: '/group21',
    }
    const node3 = {
      id: 3,
      name: 'name3',
      description: 'description3',
      parentGroupName: '/group21',
    }

    const state = {
      entities: {
        groups: {
          1: node1,
          2: node2,
          3: node3,
        },
      },
    }

    const props = {
      params: {
        splat: undefined,
      },
    }

    expect(groupsEntitiesSelector(state, props)).to.eql({ 1: node1 })
  })

  it('groupsEntitiesSelector returns the nested level groups list', () => {
    const node1 = {
      id: 1,
      name: 'name1',
      description: 'description1',
      parentGroupName: null,
    }
    const node2 = {
      id: 2,
      name: 'name2',
      description: 'description2',
      parentGroupName: '/group21',
    }
    const node3 = {
      id: 3,
      name: 'name3',
      description: 'description3',
      parentGroupName: '/group21',
    }

    const state = {
      entities: {
        groups: {
          1: node1,
          2: node2,
          3: node3,
        },
      },
    }

    const props = {
      params: {
        splat: '/group21',
      },
    }

    expect(groupsEntitiesSelector(state, props)).to.eql({ 2: node2, 3: node3 })
  })

  it('getGroups selector returns the nested level groups list', () => {
    const node1 = {
      id: 1,
      name: 'name1',
      description: 'description1',
      parentGroupName: null,
    }
    const node2 = {
      id: 2,
      name: 'name2',
      description: 'description2',
      parentGroupName: '/group21',
    }
    const node3 = {
      id: 3,
      name: 'name3',
      description: 'description3',
      parentGroupName: '/group21',
    }

    const state = {
      entities: {
        groups: {
          1: node1,
          2: node2,
          3: node3,
        },
      },
    }

    const props = {
      params: {
        splat: '/group21',
      },
    }

    expect(getGroups(state, props)).to.eql([node2, node3])
  })

  it('getGroups selector returns the first level groups list', () => {
    const node1 = {
      id: 1,
      name: 'name1',
      description: 'description1',
      parentGroupName: null,
    }
    const node2 = {
      id: 2,
      name: 'name2',
      description: 'description2',
      parentGroupName: '/group21',
    }
    const node3 = {
      id: 3,
      name: 'name3',
      description: 'description3',
      parentGroupName: '/group21',
    }

    const state = {
      entities: {
        groups: {
          1: node1,
          2: node2,
          3: node3,
        },
      },
    }


    const props = {
      params: {
        splat: undefined,
      },
    }

    expect(getGroups(state, props)).to.eql([node1])
  })

  it('getRepositoryId selector', () => {
    const node1 = {
      id: 1,
      name: 'name1',
      description: 'description1',
      fullName: 'group/name1',

    }
    const node2 = {
      id: 2,
      name: 'name2',
      description: 'description2',
      fullName: 'group/name2',

    }
    const node3 = {
      id: 3,
      name: 'name3',
      description: 'description3',
      fullName: 'group/name3',

    }

    const state = {
      entities: {
        repositories: {
          1: node1,
          2: node2,
          3: node3,
        },
      },
    }

    const props = {
      params: {
        splat: 'group/name3',
      },
    }

    expect(getRepositoryId(state, props)).to.equal('3')

    const props2 = {
      params: {
      },
    }

    expect(getRepositoryId(state, props2)).to.equal(undefined)
  })

  it('getRepositoriesFetchStatus', () => {
    const error = {
      message: 'test message error',
    }
    const state = {
      fetch: {
        [types.FETCH_REPOSITORIES]: {
          isFetching: false,
          error,
        },
      },
    }
    expect(getRepositoriesFetchStatus(state)).to.eql({
      isFetching: false,
      error,
    })
  })


  it('pathnameSelector', () => {
    const state = {
      routing: {
        locationBeforeTransitions: {
          pathname: '/test/path',
        },
      },
    }
    expect(pathnameSelector(state)).to.equal('/test/path')
  })

  it('getRepositoriesFetchState', () => {
    const node1 = {
      id: 1,
      name: 'name1',
      description: 'description1',
      parentGroupName: null,
    }
    const node2 = {
      id: 2,
      name: 'name2',
      description: 'description2',
      parentGroupName: '/projects/testgroup',
    }
    const node3 = {
      id: 3,
      name: 'name3',
      description: 'description3',
      parentGroupName: '/group21',
    }

    const rnode1 = {
      id: 1,
      name: 'name1',
      description: 'description1',
      groupPath: null,
    }
    const rnode2 = {
      id: 2,
      name: 'name2',
      description: 'description2',
      groupPath: '/projects/testgroup',
    }
    const rnode3 = {
      id: 3,
      name: 'name3',
      description: 'description3',
      groupPath: '/projects/testgroup',
    }


    const state = {
      entities: {
        repositories: {
          1: rnode1,
          2: rnode2,
          3: rnode3,
        },
        groups: {
          1: node1,
          2: node2,
          3: node3,
        },
      },
      fetch: {
        [types.FETCH_REPOSITORIES]: {
          error: null,
        },
        [types.FETCH_REPOSITORIES]: {
          isFetching: false,
        },
      },
      routing: {
        locationBeforeTransitions: {
          pathname: '/test/path',
        },
      },
    }
    expect(getRepositoriesFetchState(state, { params: { splat: '/projects/testgroup' } })).to.eql({
      status:
      {
        isFetching: false,
        error: null,
      },
      groups: [node2],
      repositories: [rnode2, rnode3],
      pathname: '/test/path',
    })
  })

  it('repoBranchesSelector', () => {
    const node1 = {
      id: 1,
      name: 'name1',
      description: 'description1',
      parentGroupName: null,
    }
    const node2 = {
      id: 2,
      name: 'name2',
      description: 'description2',
      parentGroupName: '/group21',
      branches: ['default', 'test'],
    }
    const node3 = {
      id: 3,
      name: 'name3',
      description: 'description3',
      parentGroupName: '/group21',
    }

    const state = {
      entities: {
        repositories: {
          1: node1,
          2: node2,
          3: node3,
        },
      },
    }


    const props = {
      repoId: 2,
    }

    expect(repoBranchesSelector(state, props)).to.eql(['default', 'test'])
  })


  it('getRepositoryBranches', () => {
    const node1 = {
      id: 1,
      name: 'name1',
      description: 'description1',
      parentGroupName: null,
    }
    const node2 = {
      id: 2,
      name: 'name2',
      description: 'description2',
      parentGroupName: '/group21',
      branches: [{ name: 'default', revision: '3452345' },
      { name: 'test', revision: 'te456356st' },
      { name: 'unity', revision: 'tes24524t' }],
    }
    const node3 = {
      id: 3,
      name: 'name3',
      description: 'description3',
      parentGroupName: '/group21',
    }

    const state = {
      entities: {
        repositories: {
          1: node1,
          2: node2,
          3: node3,
        },
      },
    }


    const props = {
      repoId: 2,
    }

    const expected = [
      { label: 'default', value: 'default' },
      { label: 'test', value: 'test' },
      { label: 'unity', value: 'unity' },
    ]

    expect(getRepositoryBranches(state, props)).to.eql(expected)
  })

  it('repoNameSelector', () => {
    const node1 = {
      id: 1,
      name: 'name1',
      description: 'description1',
      fullName: '/test/group/name1',
    }
    const node2 = {
      id: 2,
      name: 'name2',
      description: 'description2',
      parentGroupName: '/group21',
      branches: [{ name: 'default', revision: '3452345' },
      { name: 'test', revision: 'te456356st' },
      { name: 'unity', revision: 'tes24524t' }],
    }
    const node3 = {
      id: 3,
      name: 'name3',
      description: 'description3',
      parentGroupName: '/group21',
    }

    const state = {
      entities: {
        repositories: {
          1: node1,
          2: node2,
          3: node3,
        },
      },
    }


    const props = {
      params: {
        splat: '/test/group/name1',
      },
    }

    expect(repoIdSelector(state, props)).to.equal('1')
  })
})

describe('getChangelog', () => {
  it('should return denormalized repository changelog', () => {
    const user1 = {
      id: 1,
      email: 'user1@email.com',
      username: 'name1',
      slack: {
        avatar: 'avatar1',
      },
    }

    const user2 = {
      id: 2,
      email: 'user2@email.com',
      username: 'name2',
      slack: {
        avatar: 'avatar2',
      },
    }

    const changeset1 = {
      id: 1,
      authorUser: 1,
      branch: 'default',
      date: 'somedate',
      message: 'some message',
      status: 'not_reviewed',
    }

    const changeset2 = {
      id: 2,
      authorUser: 2,
      branch: 'default',
      date: 'somedate2',
      message: 'some message2',
      status: 'not_reviewed',
    }

    const changeset3 = {
      id: 3,
      authorUser: 1,
      branch: 'default',
      date: 'somedate3',
      message: 'some message3',
      status: 'not_reviewed',
    }

    const expectedChangelogData = [{ ...changeset1, authorUser: user1 },
      { ...changeset2, authorUser: user2 }]

    const state = {
      entities: {
        users: {
          1: user1,
          2: user2,
        },
        repositories: {
          1: {
            fullName: '/unity/unity',
            changelog: {
              nodes: [1, 2],
            },
          },
          2: {
            changelog: {
              nodes: [3],
            },
          },
        },
        changesets: {
          1: changeset1,
          2: changeset2,
          3: changeset3,
        },
      },
    }

    const props = {
      params: {
        splat: '/unity/unity',
      },
    }

    expect(getChangelog(state, props)).to.eql(expectedChangelogData)
  })

  it('should parse mercurial user if authorUser is undefined', () => {
    const user1 = {
      id: 1,
      email: 'user1@email.com',
      username: 'name1',
      slack: {
        avatar: 'avatar1',
      },
    }

    const user2 = {
      id: 2,
      email: 'user2@email.com',
      username: 'name2',
      slack: {
        avatar: 'avatar2',
      },
    }

    const changeset1 = {
      id: 1,
      author: 'Test User Name 1 <testuser1@email.com>',
      branch: 'default',
      date: 'somedate',
      message: 'some message',
      status: 'not_reviewed',
    }

    const changeset2 = {
      id: 2,
      author: 'Test User Name 2 <testuser2@email.com>',
      branch: 'default',
      date: 'somedate2',
      message: 'some message2',
      status: 'not_reviewed',
    }

    const changeset3 = {
      id: 3,
      authorUser: 1,
      branch: 'default',
      date: 'somedate3',
      message: 'some message3',
      status: 'not_reviewed',
    }

    const expectedChangelogData = [{ ...changeset1, authorUser: { fullName: 'Test User Name 1', email: 'testuser1@email.com' } },
      { ...changeset2, authorUser: { fullName: 'Test User Name 2', email: 'testuser2@email.com' } }]

    const state = {
      entities: {
        users: {
          1: user1,
          2: user2,
        },
        repositories: {
          1: {
            fullName: '/unity/unity',
            changelog: {
              nodes: [1, 2],
            },
          },
          2: {
            changelog: {
              nodes: [3],
            },
          },
        },
        changesets: {
          1: changeset1,
          2: changeset2,
          3: changeset3,
        },
      },
    }

    const props = {
      params: {
        splat: '/unity/unity',
      },
    }

    expect(getChangelog(state, props)).to.eql(expectedChangelogData)
  })

  it('should return null if no changelog in repository', () => {
    const state = {
      entities: {
        repositories: {
          1: {
            fullName: '/unity/unity',
          },
          2: {
            changelog: {
              nodes: [3],
            },
          },
        },
      },
    }

    const props = {
      params: {
        splat: '/unity/unity',
      },
    }

    expect(getChangelog(state, props)).to.eql(null)
  })

  it('should return null if no changesets entities', () => {
    const props = {
      params: {
        splat: '/unity/unity',
      },
    }

    expect(getChangelog({ entities: { repositories: {} } }, props)).to.eql(null)
  })

  it('should return null if no repositories entities', () => {
    const props = {
      params: {
        splat: '/unity/unity',
      },
    }

    expect(getChangelog({ entities: { changesets: {} } }, props)).to.eql(null)
  })


  it('should return null if no users entities', () => {
    const props = {
      params: {
        splat: '/unity/unity',
      },
    }

    expect(getChangelog({ entities: { changesets: {}, repositories: {} } }, props)).to.eql(null)
  })

  it('should return null if no params', () => {
    const user1 = {
      id: 1,
      email: 'user1@email.com',
      username: 'name1',
      slack: {
        avatar: 'avatar1',
      },
    }

    const user2 = {
      id: 2,
      email: 'user2@email.com',
      username: 'name2',
      slack: {
        avatar: 'avatar2',
      },
    }

    const changeset1 = {
      id: 1,
      authorUser: 1,
      branch: 'default',
      date: 'somedate',
      message: 'some message',
      status: 'not_reviewed',
    }

    const changeset2 = {
      id: 2,
      authorUser: 2,
      branch: 'default',
      date: 'somedate2',
      message: 'some message2',
      status: 'not_reviewed',
    }

    const changeset3 = {
      id: 3,
      authorUser: 1,
      branch: 'default',
      date: 'somedate3',
      message: 'some message3',
      status: 'not_reviewed',
    }


    const state = {
      entities: {
        users: {
          1: user1,
          2: user2,
        },
        repositories: {
          1: {
            fullName: '/unity/unity',
            changelog: {
              nodes: [1, 2],
            },
          },
          2: {
            changelog: {
              nodes: [3],
            },
          },
        },
        changesets: {
          1: changeset1,
          2: changeset2,
          3: changeset3,
        },
      },
    }
    expect(getChangelog(state, {})).to.eql(null)
  })

  it('should return null if repo not found ', () => {
    const user1 = {
      id: 1,
      email: 'user1@email.com',
      username: 'name1',
      slack: {
        avatar: 'avatar1',
      },
    }

    const user2 = {
      id: 2,
      email: 'user2@email.com',
      username: 'name2',
      slack: {
        avatar: 'avatar2',
      },
    }

    const changeset1 = {
      id: 1,
      authorUser: 1,
      branch: 'default',
      date: 'somedate',
      message: 'some message',
      status: 'not_reviewed',
    }

    const changeset2 = {
      id: 2,
      authorUser: 2,
      branch: 'default',
      date: 'somedate2',
      message: 'some message2',
      status: 'not_reviewed',
    }

    const changeset3 = {
      id: 3,
      authorUser: 1,
      branch: 'default',
      date: 'somedate3',
      message: 'some message3',
      status: 'not_reviewed',
    }


    const state = {
      entities: {
        users: {
          1: user1,
          2: user2,
        },
        repositories: {
          1: {
            fullName: '/unity/unity',
            changelog: {
              nodes: [1, 2],
            },
          },
          2: {
            changelog: {
              nodes: [3],
            },
          },
        },
        changesets: {
          1: changeset1,
          2: changeset2,
          3: changeset3,
        },
      },
    }

    const props = {
      params: {
        splat: '/unity/unity2',
      },
    }

    expect(getChangelog(state, props)).to.eql(null)
  })
})


describe('parseMercurialAuthor', () => {
  it('returns fullName and email by parsing the mercurial user string', () => {
    const fullName = 'Test User name'
    const email = 'testusername@email.com'
    const author = `${fullName} <${email}>`

    expect(parseMercurialAuthor(author)).to.eql({ fullName, email })
  })

  it('returns fullName if format of mercurial author unexpected', () => {
    const fullName = 'Test User name'
    const email = 'testusername@email.com'
    const author = `${fullName} ${email}`

    expect(parseMercurialAuthor(author)).to.eql({ fullName: author })
  })

  it('returns fullName if format of mercurial author is undefined', () => {
    expect(parseMercurialAuthor(undefined)).to.eql(undefined)
    expect(parseMercurialAuthor(null)).to.eql(null)
  })
})
