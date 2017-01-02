import chai from 'chai'
import {
  repoEntitiesSelector,
  repositories,
  groupsEntitiesSelector,
  groups,
} from '../index'

const expect = chai.expect

describe('projects selectors', () => {
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
      repositories: {
        entities: {
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
      repositories: {
        entities: {
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

  it('repositories selector returns the nested level projects list', () => {
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
      repositories: {
        entities: {
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

    expect(repositories(state, props)).to.eql([node3])
  })

  it('repositories selector returns the first level projects list', () => {
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
      repositories: {
        entities: {
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

    expect(repositories(state, props)).to.eql([node1, node2])
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
      repositories: {
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
      repositories: {
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

  it('groups selector returns the nested level groups list', () => {
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
      repositories: {
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

    expect(groups(state, props)).to.eql([node2, node3])
  })

  it('groups selector returns the first level groups list', () => {
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
      repositories: {
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

    expect(groups(state, props)).to.eql([node1])
  })
})
