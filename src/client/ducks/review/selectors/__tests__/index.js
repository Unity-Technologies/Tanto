import chai from 'chai'
import {
  getFileId,
  getReviewPullrequests,
  getReviewFiles,
  getReviewFile,
} from '../index'

const expect = chai.expect

describe('getFileId', () => {
  it('returns file id from props', () => {
    const state = {
    }
    const id = 'SomeFileId'
    const props = {
      id,
    }

    expect(getFileId(state, props)).to.eql(id)
  })

  it('returns no file id from props', () => {
    expect(getFileId({}, {})).to.eql(null)
  })
})

describe('getReviewPullrequests', () => {
  it('returns review pullrequests', () => {
    const files = {
      [1]: {
        reviewed: false, bookmarked: false,
      },
      [2]: {
        reviewed: false, bookmarked: false,
      },
    }
    const pullrequests = {
      [12]: files,
    }
    const state = {
      review: {
        pullrequests,
      },
    }

    const id = '2'
    const props = {
      id,
    }

    expect(getReviewPullrequests(state, props)).to.eql(pullrequests)
  })

  it('returns no review pullrequests', () => {
    const state = {
      review: {
      },
    }

    const id = '2'
    const props = {
      id,
    }

    expect(getReviewPullrequests(state, props)).to.eql(null)
  })
})

describe('getReviewFiles', () => {
  it('returns pull requests files', () => {
    const files = {
      [1]: {
        reviewed: false, bookmarked: false,
      },
      [2]: {
        reviewed: false, bookmarked: false,
      },
    }
    const pullrequests = {
      [12]: {
        files,
      },
    }
    const state = {
      review: {
        pullrequests,
      },
    }

    const id = '2'
    const props = {
      id,
      params: { prid: 12 },
    }
    expect(getReviewFiles(state, props)).to.eql(files)
  })

  it('returns empty object if no pr ID in props', () => {
    const files = {
      [1]: {
        reviewed: false, bookmarked: false,
      },
      [2]: {
        reviewed: false, bookmarked: false,
      },
    }
    const pullrequests = {
      [12]: {
        files,
      },
    }
    const state = {
      review: {
        pullrequests,
      },
    }

    const id = '2'
    const props = {
      id,
    }
    expect(getReviewFiles(state, props)).to.eql(null)
  })

  it('returns empty object if no pullrequests', () => {
    const state = {
      review: {
      },
    }

    const id = '2'
    const props = {
      id,
    }
    expect(getReviewFiles(state, props)).to.eql(null)
  })

  it('returns empty object if pullrequest doesnt have files property', () => {
    const pullrequests = {
      [12]: {
      },
    }
    const state = {
      review: {
        pullrequests,
      },
    }

    const id = '2'
    const props = {
      id,
      params: { prid: 12 },
    }
    expect(getReviewFiles(state, props)).to.eql(null)
  })
})

describe('getReviewFile', () => {
  it('returns pull requests file review settings', () => {
    const files = {
      [1]: {
        reviewed: false, bookmarked: false,
      },
      [2]: {
        reviewed: true, bookmarked: true,
      },
    }
    const pullrequests = {
      [12]: {
        files,
      },
    }
    const state = {
      review: {
        pullrequests,
      },
    }

    const id = '2'
    const props = {
      id,
      params: { prid: 12 },
    }
    expect(getReviewFile(state, props)).to.eql({ reviewed: true, bookmarked: true })
  })

  it('returns empty object if no file id in props', () => {
    const files = {
      [1]: {
        reviewed: false, bookmarked: false,
      },
      [2]: {
        reviewed: true, bookmarked: true,
      },
    }
    const pullrequests = {
      [12]: {
        files,
      },
    }
    const state = {
      review: {
        pullrequests,
      },
    }

    const props = {
      params: { prid: 12 },
    }
    expect(getReviewFile(state, props)).to.eql(null)
  })

  it('returns empty object if no files ', () => {
    const files = {
      [1]: {
        reviewed: false, bookmarked: false,
      },
      [2]: {
        reviewed: true, bookmarked: true,
      },
    }
    const pullrequests = {
      [12]: {
        files,
      },
    }
    const state = {
      review: {
        pullrequests,
      },
    }

    const props = {
      id: 122,
      params: { prid: 12 },
    }
    expect(getReviewFile(state, props)).to.eql(null)
  })
})
