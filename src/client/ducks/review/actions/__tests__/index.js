/* eslint-disable max-len */
import chai from 'chai'
import {
  types,
  setFileReview,
  setFileBookmark,
} from '../index'


const expect = chai.expect

describe('review actions', () => {
  it('setFileReview reviewed', () => {
    const pullRequestId = '123'
    const fileId = 'SomeFileId'
    const reviewed = true
    expect(setFileReview(pullRequestId, fileId, reviewed)).to.eql({ type: types.SET_FILE_REVIEW, pullRequestId, fileId, reviewed })
  })

  it('setFileReview not reviewed', () => {
    const pullRequestId = '123'
    const fileId = 'SomeFileId'
    const reviewed = false
    expect(setFileReview(pullRequestId, fileId, reviewed)).to.eql({ type: types.SET_FILE_REVIEW, pullRequestId, fileId, reviewed })
  })

  it('setFileBookmark bookmarked', () => {
    const pullRequestId = '123'
    const fileId = 'SomeFileId'
    const bookmarked = true
    expect(setFileBookmark(pullRequestId, fileId, bookmarked)).to.eql({ type: types.SET_FILE_BOOKMARK, pullRequestId, fileId, bookmarked })
  })

  it('setFileBookmark not bookmarked', () => {
    const pullRequestId = '123'
    const fileId = 'SomeFileId'
    const bookmarked = false
    expect(setFileBookmark(pullRequestId, fileId, bookmarked)).to.eql({ type: types.SET_FILE_BOOKMARK, pullRequestId, fileId, bookmarked })
  })
})
