import chai from 'chai'
import {
  getToplevelRepos,
  getToplevelGroups,
  getRepositoriesFetchStatus,
  getPath,
  getRepositoriesFetchState,
  repoBranchesSelector,
  getRepositoryBranches,
} from '../index'

import { types } from 'ducks/repositories/actions'

const expect = chai.expect

describe('repositories selectors', () => {
  it('getToplevelRepos returns the first level projects', () => {
    const node1 = {
      id: 1,
      name: 'name1',
      fullName: 'name1',
      description: 'description1',
      groupPath: null,
    }
    const node2 = {
      id: 2,
      name: 'name2',
      fullName: 'name2',
      description: 'description2',
      groupPath: null,
    }
    const node3 = {
      id: 3,
      name: 'name3',
      fullName: '/projects/testgroup/name3',
      description: 'description3',
      groupPath: '/projects/testgroup',
    }

    const state = {
      entities: { repositories: {} },
    }
    state.entities.repositories[node1.fullName] = node1
    state.entities.repositories[node2.fullName] = node2
    state.entities.repositories[node3.fullName] = node3

    const expected = [node1, node2]

    const props = {
      params: {
        splat: undefined,
      },
    }

    expect(getToplevelRepos(state, props)).to.eql(expected)
  })

  it('getToplevelGroups returns the first level groups list', () => {
    const node1 = {
      id: 1,
      name: 'name1',
      path: 'name1',
      description: 'description1',
      parentGroupName: null,
    }

    const node2 = {
      id: 2,
      name: 'name2',
      path: 'group/name2',
      description: 'description1',
      parentGroupName: 'group',
    }

    const node3 = {
      id: 3,
      name: 'name3',
      path: 'group/name3',
      description: 'description1',
      parentGroupName: 'group',
    }

    const state = {
      entities: { groups: {} },
    }
    state.entities.groups[node1.path] = node1
    state.entities.groups[node2.path] = node2
    state.entities.groups[node3.path] = node3

    const expected = [node1]

    const props = {}

    expect(getToplevelGroups(state, props)).to.eql(expected)
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


  it('getPath should retrieve the path from the match object', () => {
    const props = {
      match: {
        url: '/test/path',
      },
    }

    expect(getPath({}, props)).to.equal('/test/path')
  })

  it('getRepositoriesFetchState should return the group pointed to by the path param', () => {
    const node1 = {
      id: 1,
      path: 'name1',
      name: 'name1',
      description: 'description1',
      parentGroupName: null,
    }
    const node2 = {
      id: 2,
      path: 'projects/testgroup2',
      name: 'name2',
      description: 'description2',
      parentGroupName: 'projects',
    }
    const node3 = {
      id: 3,
      path: 'group21/name3',
      name: 'name3',
      description: 'description3',
      parentGroupName: 'group21',
    }

    const rnode1 = {
      id: 1,
      fullName: 'name1',
      name: 'name1',
      description: 'description1',
      groupPath: null,
    }
    const rnode2 = {
      id: 2,
      fullName: 'projects/testgroup/name2',
      name: 'name2',
      description: 'description2',
      groupPath: 'projects/testgroup',
    }
    const rnode3 = {
      id: 3,
      fullName: 'projects/testgroup/name3',
      name: 'name3',
      description: 'description3',
      groupPath: 'projects/testgroup',
    }


    const state = {
      entities: {
        repositories: {
        },
        groups: {
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
    }

    state.entities.repositories[rnode1.fullName] = rnode1
    state.entities.repositories[rnode2.fullName] = rnode2
    state.entities.repositories[rnode3.fullName] = rnode3

    state.entities.groups[node1.path] = node1
    state.entities.groups[node2.path] = node2
    state.entities.groups[node3.path] = node3

    const props = {
      match: {
        url: '/repos/projects/testgroup',
        params: { path: 'projects/testgroup2' },
      },
    }
    expect(getRepositoriesFetchState(state, props)).to.eql({
      status:
      {
        isFetching: false,
        error: null,
      },
      fullName: 'projects/testgroup2',
      group: node2,
      repo: null,
      path: '/repos/projects/testgroup',
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
})
