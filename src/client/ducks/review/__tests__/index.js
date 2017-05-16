import chai from 'chai'
import review from '../index'
import { setFileReview, setFileBookmark } from '../actions'

const expect = chai.expect
describe('pullrequests reducer', () => {
  it('should handle SET_FILE_REVIEW action type for empty state', () => {
    const pullRequestId = 123
    const fileId = 12
    const reviewed = true
    const action = setFileReview(pullRequestId, fileId, reviewed)

    const state = {
    }

    const expected = {
      [123]: {
        files: {
          [12]: { reviewed },
        },
      },
    }

    expect(review(state, action)).to.eql(expected)
  })

  it('should handle SET_FILE_REVIEW action type if state contains review', () => {
    const pullRequestId = 123
    const fileId = 12
    const reviewed = true
    const action = setFileReview(pullRequestId, fileId, reviewed)

    const state = {
      [123]: {
        files: {
          [12]: { reviewed: false, bookmarked: false },
        },
      },
    }

    const expected = {
      [123]: {
        files: {
          [12]: { reviewed, bookmarked: false },
        },
      },
    }

    expect(review(state, action)).to.eql(expected)
  })

  it('should handle SET_FILE_REVIEW action type if there are another files reviews', () => {
    const pullRequestId = 123
    const fileId = 12
    const reviewed = true
    const action = setFileReview(pullRequestId, fileId, reviewed)

    const state = {
      [123]: {
        files: {
          [13]: { reviewed: false, bookmarked: true },
        },
      },
    }
    const expected = {
      [123]: {
        files: {
          [12]: { reviewed },
          [13]: { reviewed: false, bookmarked: true },
        },
      },
    }


    expect(review(state, action)).to.eql(expected)
  })

  it('should handle SET_FILE_BOOKMARK action type for empty state', () => {
    const pullRequestId = 123
    const fileId = 12
    const bookmarked = true
    const action = setFileBookmark(pullRequestId, fileId, bookmarked)

    const state = {
    }

    const expected = {
      [123]: {
        files: {
          [12]: { bookmarked },
        },
      },
    }

    expect(review(state, action)).to.eql(expected)
  })

  it('should handle SET_FILE_BOOKMARK action type if state contains review', () => {
    const pullRequestId = 123
    const fileId = 12
    const bookmarked = true
    const action = setFileBookmark(pullRequestId, fileId, bookmarked)

    const state = {
      [123]: {
        files: {
          [12]: { reviewed: false, bookmarked: false },
        },
      },
    }

    const expected = {
      [123]: {
        files: {
          [12]: { reviewed: false, bookmarked },
        },
      },
    }

    expect(review(state, action)).to.eql(expected)
  })

  it('should handle SET_FILE_BOOKMARK action type if there are another files reviews', () => {
    const pullRequestId = 123
    const fileId = 12
    const bookmarked = true
    const action = setFileBookmark(pullRequestId, fileId, bookmarked)

    const state = {
      [123]: {
        files: {
          [13]: { reviewed: false, bookmarked: true },
        },
      },
    }
    const expected = {
      [123]: {
        files: {
          [12]: { bookmarked },
          [13]: { reviewed: false, bookmarked: true },
        },
      },
    }


    expect(review(state, action)).to.eql(expected)
  })
})
