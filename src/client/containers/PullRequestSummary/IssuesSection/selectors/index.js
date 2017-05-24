/* @flow */
import { getPullRequestIssues } from 'ducks/pullrequests/selectors'
import { createSelector } from 'reselect'
import { IssueStatus } from 'universal/constants'

export const getIssues = (state: Object, props: Object): Object =>
  createSelector(
    getPullRequestIssues,
    issues => ({
      issues: issues ? issues.filter(x => x.status !== IssueStatus.OBSOLETE) : [],
    }),
  )

export default getIssues
