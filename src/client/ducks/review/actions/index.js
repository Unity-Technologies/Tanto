/* @flow */

export const types = {
  SET_FILE_REVIEW: 'REVIEW/SET_FILE_REVIEW',
  SET_FILE_BOOKMARK: 'REVIEW/SET_FILE_BOOKMARK',
}

export const setFileReview = (pullRequestId: number, fileId: string, reviewed: boolean) =>
  ({ type: types.SET_FILE_REVIEW, pullRequestId, fileId, reviewed })

export const setFileBookmark = (pullRequestId: number, fileId: string, bookmarked: boolean) =>
  ({ type: types.SET_FILE_BOOKMARK, pullRequestId, fileId, bookmarked })

