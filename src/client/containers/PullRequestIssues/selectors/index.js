/* @flow */


import { statusFetchFactory } from 'ducks/fetch/selectors'
import { types } from 'ducks/pullrequests/actions'
import { getPullRequestIssues } from 'ducks/pullrequests/selectors'
import { createSelector } from 'reselect'


export const fetchStatus = statusFetchFactory(types.FETCH_PULL_REQUEST_ISSUES)

export const getData = (state: Object, props: Object): Object =>
  createSelector(
    getPullRequestIssues, fetchStatus,
    (issues, status, user) => ({
      issues: issues || [],
      status,
    })
  )


export default getData
