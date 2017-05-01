/* flow */

import { statusFetchFactory } from 'ducks/fetch/selectors'
import { getPullRequestChangeset } from 'ducks/pullrequests/selectors'
import { createStructuredSelector } from 'reselect'
import { types } from 'ducks/pullrequests/actions'

export const fetchStatus = statusFetchFactory(types.FETCH_PULL_REQUEST_CHANGESET)

export const getData = createStructuredSelector({
  commits: getPullRequestChangeset,
  status: fetchStatus,
})


export default getData
