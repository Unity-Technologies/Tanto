/* @flow */

import { createSelector } from 'reselect'
import { getPullRequestId } from 'ducks/pullrequests/selectors'

export const getFileId = (state: Object, props: Object) =>
  (props && props.id ? props.id : null)

export const getReviewPullrequests = (state: Object) => state.review.pullrequests || null

export const getReviewFiles = createSelector(
  getPullRequestId, getReviewPullrequests,
  (prId, pullrequests) => {
    if (!prId || !pullrequests) {
      return {}
    }

    const pr = pullrequests[prId]
    return pr && pr.files ? pr.files : {}
  }
)


export const getReviewFile = createSelector(
  getFileId, getReviewFiles,
  (fileId, files) => {
    if (!fileId || !files) {
      return {}
    }

    return fileId in files ? files[fileId] : {}
  }
)
