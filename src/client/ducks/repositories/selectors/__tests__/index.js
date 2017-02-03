import chai from 'chai'
import {
  repoEntitiesSelector,
  getRepositories,
  groupsEntitiesSelector,
  getGroups,
  getRepositoryId,
  getRepoFetchingStatus,
  getRepoFetchError,
  pathnameSelector,
  getRepositoriesFetchState,
  repoBranchesSelector,
  getRepositoryBranches,
  repoIdSelector,
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

  it('getRepoFetchingStatus', () => {
    const state = {
      fetch: {
        [types.FETCH_REPOSITORIES]: {
          isFetching: false,
        },
      },
    }
    expect(getRepoFetchingStatus(state)).to.equal(false)

    state.fetch[types.FETCH_REPOSITORIES].isFetching = true
    expect(getRepoFetchingStatus(state)).to.equal(true)
  })

  it('getRepoFetchError', () => {
    const state = {
      fetch: {
        [types.FETCH_REPOSITORIES]: {
          error: null,
        },
      },
    }
    expect(getRepoFetchError(state)).to.equal(null)

    const error = { text: 'some test error' }
    state.fetch[types.FETCH_REPOSITORIES].error = error
    expect(getRepoFetchError(state)).to.equal(error)
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
      isFetching: false,
      error: null,
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
