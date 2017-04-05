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

  it('getChangelog selector full data', () => {
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

    const users = [user1, user2]

    const changeset1 = {
      id: 1,
      author: 'name2',
      branch: 'default',
      date: 'somedate',
      message: 'some message',
      status: 'not_reviewed',
    }

    const changeset2 = {
      id: 2,
      author: 'name1',
      branch: 'default',
      date: 'somedate2',
      message: 'some message2',
      status: 'not_reviewed',
    }

    const status = {
      error: null,
      isFetching: false,
    }

    const expectedChangelogData = {
      status,
      data: [{ ...changeset1, author: { name: 'name2', slack: { avatar: 'avatar2' } } },
      { ...changeset2, author: { name: 'name1', slack: { avatar: 'avatar1' } } }],
    }

    const state = {
      entities: {
        changesets: {
          1: changeset1,
          2: changeset2,
        },
        users,
      },
      fetch: {
        [types.FETCH_CHANGELOG]: {
          error: null,
          isFetching: false,
        },
      },
    }

    expect(getChangelog(state)(state)).to.deep.equal(expectedChangelogData)
  })

  it('getChangelog selector no users in state', () => {
    const changeset1 = {
      id: 1,
      author: 'name2',
      branch: 'default',
      date: 'somedate',
      message: 'some message',
      status: 'not_reviewed',
    }

    const changeset2 = {
      id: 2,
      author: 'name1',
      branch: 'default',
      date: 'somedate2',
      message: 'some message2',
      status: 'not_reviewed',
    }

    const status = {
      error: null,
      isFetching: false,
    }

    const expectedChangelogData = {
      status,
      data: [{ ...changeset1, author: { name: 'name2', slack: {} } },
      { ...changeset2, author: { name: 'name1', slack: {} } }],
    }

    const state = {
      entities: {
        changesets: {
          1: changeset1,
          2: changeset2,
        },
      },
      fetch: {
        [types.FETCH_CHANGELOG]: {
          error: null,
          isFetching: false,
        },
      },
    }

    expect(getChangelog(state)(state)).to.deep.equal(expectedChangelogData)
  })

  it('getChangelog selector no changesets in state', () => {
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

    const users = [user1, user2]

    const status = {
      error: null,
      isFetching: false,
    }

    const expectedChangelogData = {
      status,
      data: [],
    }

    const state = {
      entities: {
        users,
      },
      fetch: {
        [types.FETCH_CHANGELOG]: {
          error: null,
          isFetching: false,
        },
      },
    }

    expect(getChangelog(state)(state)).to.deep.equal(expectedChangelogData)
  })

  it('getChangelog selector no entities in state', () => {
    const status = {
      error: null,
      isFetching: false,
    }

    const expectedChangelogData = {
      status,
      data: [],
    }

    const state = {
      entities: {},
      fetch: {
        [types.FETCH_CHANGELOG]: {
          error: null,
          isFetching: false,
        },
      },
    }

    expect(getChangelog(state)(state)).to.deep.equal(expectedChangelogData)
  })
  it('getChangelog selector empty fetch in state', () => {
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

    const users = [user1, user2]

    const changeset1 = {
      id: 1,
      author: 'name2',
      branch: 'default',
      date: 'somedate',
      message: 'some message',
      status: 'not_reviewed',
    }

    const changeset2 = {
      id: 2,
      author: 'name1',
      branch: 'default',
      date: 'somedate2',
      message: 'some message2',
      status: 'not_reviewed',
    }

    const status = {
      error: null,
      isFetching: false,
    }

    const expectedChangelogData = {
      status,
      data: [{ ...changeset1, author: { name: 'name2', slack: { avatar: 'avatar2' } } },
      { ...changeset2, author: { name: 'name1', slack: { avatar: 'avatar1' } } }],
    }

    const state = {
      entities: {
        changesets: {
          1: changeset1,
          2: changeset2,
        },
        users,
      },
      fetch: {},
    }

    expect(getChangelog(state)(state)).to.deep.equal(expectedChangelogData)
  })
})
