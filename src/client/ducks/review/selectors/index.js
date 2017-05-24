/* @flow */

import { createSelector } from 'reselect'
import { getPullRequestId } from 'ducks/pullrequests/selectors'
import { getEntityById } from 'ducks/selectors'

export const getFileId = (state: Object, props: Object) =>
  (props && props.id ? props.id : null)

export const getReviewPullrequests = (state: Object) => state.review.pullrequests || null

export const getReviewFiles = createSelector(
  getPullRequestId, getReviewPullrequests,
  (prId, pullrequests) => {
    if (!prId || !pullrequests) {
      return null
    }

    const pr = getEntityById(pullrequests, prId)
    return pr && pr.files ? pr.files : null
  },
)


export const getReviewFile = createSelector(
  getFileId, getReviewFiles,
  (fileId, files) => {
    if (!fileId || !files) {
      return null
    }

    return fileId in files ? files[fileId] : null
  },
)
