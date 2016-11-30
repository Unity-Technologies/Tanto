import { createSelector } from 'reselect'
import { helpers } from 'routes/helpers'
import { fromNow } from 'utils/datetime'
import _ from 'lodash'

/**
 * Selectors
 */

const pullRequestsOwnedIdsSelector = state => state.session.pr_ids
const pullRequestsAssignedIdsSelector = state => state.session.pr_assigned_ids
const pullRequestsWatchingIdsSelector = state => state.session.pr_watching_ids
const pullRequestsSelector = state => state.pullrequests.byId

const pullRequestsOwned = createSelector(
  pullRequestsSelector, pullRequestsOwnedIdsSelector,
  (pullRequests, pullRequestsOwnedIds) =>
    _.values(_.pick(pullRequests, pullRequestsOwnedIds))
)

const pullRequestsAssigned = createSelector(
  pullRequestsSelector, pullRequestsAssignedIdsSelector,
  (pullRequests, pullRequestsAssignedIds) =>
    _.values(_.pick(pullRequests, pullRequestsAssignedIds))
)

const pullRequestsWatching = createSelector(
  pullRequestsSelector, pullRequestsWatchingIdsSelector,
  (pullRequests, pullRequestsWatchingIds) =>
    _.values(_.pick(pullRequests, pullRequestsWatchingIds))
)

export const computePullRequestBuilds = (pullrequest: Object): Object => (
   Object.assign(pullrequest,
     {
       buildStatus: Math.round(Math.random()) === 0 ? 'success' : 'failed',
       buildName: 'ABV-2333',
       buildDate: '3 hours ago',
       buildLink: '#',
     })
)

export const computePullRequestLink = (pullrequest: Object, fn: any): Object => (
  { ...pullrequest, link: fn(pullrequest.originRepository.name, pullrequest.id) }
)

export const computePullRequestOriginLink = (pullrequest: Object, fn: any): Object => (
  { ...pullrequest,
    originLink: fn(pullrequest.originRepository.name, pullrequest.originBranch || ''),
  }
)

export const computePullRequestTargetLink = (pullrequest: Object, fn: any): Object => (
  { ...pullrequest, destLink: fn(pullrequest.originRepository.name, pullrequest.destBranch || '') }
)

export const flattenPullRequestUsername = (pullrequest: Object): Object => (
  { ...pullrequest, username: pullrequest.owner.username }
)

export const computePullRequestUpdatedDate = (pullrequest: Object, fn: any): Object => (
  { ...pullrequest, fromNow: fn(pullrequest.updated) }
)

export const computePullRequest = (pullrequest: Object): any => (
  fn1 => (
    fn2 => (
      fn3 => (
        computePullRequestBuilds(
          flattenPullRequestUsername(
            flattenPullRequestUsername(
              computePullRequestTargetLink(
                computePullRequestOriginLink(
                  computePullRequestLink(
                    computePullRequestUpdatedDate(pullrequest, fn1), fn2), fn3), fn3))))
      )
    )
  )
)


export const selectors = {
  getPersona: (state: Object): string => state.session.persona,
  getProfile: (state: Object): Object => state.session.profile,

  /**
   * Raw entities slice from state
   */
  getPullRequests: (state: Object): Array<Object> => pullRequestsOwned(state),
  getPullRequestsAssigned: (state: Object): Array<Object> => pullRequestsAssigned(state),
  getPullRequestsWatching: (state: Object): Array<Object> => pullRequestsWatching(state),

  /**
   * Computed repositories links, dates, builds(test for now)
   */
  getComputedPullRequests: (state: Object): Array<Object> => pullRequestsOwned(state)
    .map(x =>
      computePullRequest(x)(fromNow)(helpers.buildPullRequestLink)(helpers.buildProjectLink)),

  getComputedPullRequestsAssigned: (state: Object): Array<Object> => pullRequestsAssigned(state)
    .map(x =>
      computePullRequest(x)(fromNow)(helpers.buildPullRequestLink)(helpers.buildProjectLink)),

  getComputedPullRequestsWatching: (state: Object): Array<Object> => pullRequestsWatching(state)
    .map(x =>
      computePullRequest(x)(fromNow)(helpers.buildPullRequestLink)(helpers.buildProjectLink)),
}
