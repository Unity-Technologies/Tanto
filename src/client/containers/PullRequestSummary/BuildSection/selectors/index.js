/* @flow */
import { getPullRequest } from 'ducks/pullrequests/selectors'
import { createSelector } from 'reselect'

export const getPRSourceStamp = (state: Object, props: Object): Object =>
  createSelector(
    getPullRequest,
    pr => ({
      revision: pr && pr.origin ? pr.origin.revision : null,
      repository: pr && pr.origin ? pr.origin.repository.fullName : null,
    }),
  )

export default getPRSourceStamp
