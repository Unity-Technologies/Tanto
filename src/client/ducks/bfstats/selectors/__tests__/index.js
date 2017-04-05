/* eslint-disable */

import chai from 'chai'

const expect = chai.expect

import {
  getBuildsEntities,
  getSourceStampsEntities,
  getRevision,
  getSourceStamp,
  getBuilds,
  getABVBuild,
} from 'ducks/bfstats/selectors'

describe('bfstats selectors', () => {
  it('getBuildsEntities should builds', () => {
    const builds = {
      12: {
        id: 1,
        name: 'test1',
      },
      13: {
        id: 1,
        name: 'test1',
      },
    }
    const state = {
      entities: {
        builds,
      },
    }

    expect(getBuildsEntities(state)).to.eql(builds)
  })

  it('getBuildsEntities should return null if no builds', () => {
    const state = {
      entities: {
      },
    }

    expect(getBuildsEntities(state)).is.null
  })

  it('getSourceStampsEntities should return sourceStamps', () => {
    const sourceStamps = {
      12: {
        id: 1,
        name: 'test1',
      },
      13: {
        id: 1,
        name: 'test1',
      },
    }
    const state = {
      entities: {
        sourceStamps,
      },
    }

    expect(getSourceStampsEntities(state)).to.eql(sourceStamps)
  })

  it('getSourceStampsEntities should return null if no sourceStamps', () => {
    const state = {
      entities: {
      },
    }

    expect(getSourceStampsEntities(state)).is.null
  })

  it('getRevision should return revision from props', () => {
    const revision = '92378498273'
    const props = {
      revision,
    }

    expect(getRevision({}, props)).to.eql(revision)
  })

  it('getRevision should return null if no revision in props', () => {
    expect(getRevision({}, {})).is.null
  })

  it('getSourceStamp should return sourceStamp', () => {
    const st1 = {
      id: 1,
      name: 'test1',
    }

    const st2 = {
      id: 2,
      name: 'test3',
    }

    const state = {
      entities: {
        sourceStamps: {
          1241234123433: st1,
          1323425789990: st2,
        },
      },
    }

    const props = {
      revision: 1241234123433,
    }
    expect(getSourceStamp(state, props)).to.eql(st1)
  })

  it('getSourceStamp should return null if no sourceStamp', () => {
    const st1 = {
      id: 1,
      name: 'test1',
    }

    const st2 = {
      id: 2,
      name: 'test3',
    }

    const state = {
      entities: {
        sourceStamps: {
          1241234123433: st1,
          1323425789990: st2,
        },
      },
    }

    const props = {
      revision: 1241234123439,
    }
    expect(getSourceStamp(state, props)).is.null
  })

  it('getBuilds should return denormalized list of builds for revision', () => {
    const st1 = {
      id: 1,
      name: 'test1',
      builds: {
        nodes: [11, 13],
      },
    }

    const st2 = {
      id: 2,
      name: 'test3',
      builds: [12, 14],
    }

    const b11 = {
      id: 11,
      name: 'test11',
    }

    const b12 = {
      id: 12,
      name: 'test12',
    }

    const b13 = {
      id: 13,
      name: 'test13',
    }

    const b14 = {
      id: 14,
      name: 'test14',
    }

    const builds = {
      11: b11,
      12: b12,
      13: b13,
      14: b14,
    }

    const state = {
      entities: {
        builds,
        sourceStamps: {
          1241234123433: st1,
          1323425789990: st2,
        },
      },
    }

    const props = {
      revision: 1241234123433,
    }
    expect(getBuilds(state, props)).to.eql([b11, b13])
  })

  it('getBuilds should return null if no builds', () => {
    const st1 = {
      id: 1,
      name: 'test1',
      builds: {
        nodes: [11, 13],
      },
    }

    const st2 = {
      id: 2,
      name: 'test3',
      builds: {
        nodes: [12, 14],
      },
    }


    const state = {
      entities: {
        sourceStamps: {
          1241234123433: st1,
          1323425789990: st2,
        },
      },
    }

    const props = {
      revision: 1241234123433,
    }
    expect(getBuilds(state, props)).is.null
  })


  it('getBuilds should return null if no sourceStamps', () => {
    const state = {
      entities: {
        builds: {},
      },
    }

    const props = {
      revision: 1241234123433,
    }
    expect(getBuilds(state, props)).is.null
  })

  it('getABVBuild should return one ABV build', () => {
    const st1 = {
      id: 1,
      name: 'test1',
      builds: {
        nodes: [11, 13],
      },
    }

    const st2 = {
      id: 2,
      name: 'test3',
      builds: [12, 14],

    }

    const b11 = {
      id: 11,
      name: 'test11',
      builder: {
        name: 'builder11',
      },
    }

    const b12 = {
      id: 12,
      name: 'test12',
      builder: {
        name: 'builder12',
      },
    }

    const b13 = {
      id: 13,
      name: 'test13',
      builder: {
        name: 'proj0-ABuildVerification',
      },
    }

    const b14 = {
      id: 14,
      name: 'test14',
      builder: {
        name: 'builder14',
      },
    }

    const builds = {
      11: b11,
      12: b12,
      13: b13,
      14: b14,
    }

    const state = {
      entities: {
        builds,
        sourceStamps: {
          1241234123433: st1,
          1323425789990: st2,
        },
      },
    }

    const props = {
      revision: 1241234123433,
    }

    expect(getABVBuild(state, props)).to.eql(b13)
  })

  it('getABVBuild should return null if no ABV builds found', () => {
    const st1 = {
      id: 1,
      name: 'test1',
      builds: {
        nodes: [11, 13],
      },
    }

    const st2 = {
      id: 2,
      name: 'test3',
      builds: [12, 14],

    }

    const b11 = {
      id: 11,
      name: 'test11',
      builder: {
        name: 'builder11',
      },
    }

    const b12 = {
      id: 12,
      name: 'test12',
      builder: {
        name: 'builder12',
      },
    }

    const b13 = {
      id: 13,
      name: 'test13',
      builder: {
        name: 'proj0-ABuildVerificationtest',
      },
    }

    const b14 = {
      id: 14,
      name: 'test14',
      builder: {
        name: 'builder14',
      },
    }

    const builds = {
      11: b11,
      12: b12,
      13: b13,
      14: b14,
    }

    const state = {
      entities: {
        builds,
        sourceStamps: {
          1241234123433: st1,
          1323425789990: st2,
        },
      },
    }

    const props = {
      revision: 1241234123433,
    }

    expect(getABVBuild(state, props)).is.null
  })
})

