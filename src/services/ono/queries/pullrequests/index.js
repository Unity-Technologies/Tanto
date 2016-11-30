/* flow */

import _ from 'lodash'

export const userPullRequestsQuery = name => `
{
  me {
     ${name} {
      edges {
        node {
          id
          description
          title
          created
          updated
          status
          origin_branch
          dest_branch
          owner {
            username
            email
            full_name
          }
          origin_repository {
            name
          }
          origin_rev
          dest_repository {
            name
          }
          metadata_etag
        }
      }
    }
  }
}`

export const constants = {
  pull_requests_owned: 'pull_requests_owned',
  pull_requests_under_review: 'pull_requests_under_review',
  pull_requests_participating: 'pull_requests_participating',
}

export const queries = {
  CURRENT_USER_PULL_REQUESTS: userPullRequestsQuery(constants.pull_requests_owned),
  CURRENT_USER_ASSIGNED_PULL_REQUESTS: userPullRequestsQuery(constants.pull_requests_under_review),
  CURRENT_USER_WATCHING_PULL_REQUESTS: userPullRequestsQuery(constants.pull_requests_participating),
}

export const KEY_MAP = {
  origin_branch: 'originBranch',
  dest_branch: 'destBranch',
  origin_rev: 'originRev',
  dest_repository: 'destRepository',
  origin_repository: 'originRepository',
}

export const transform = (obj, keyMap) =>
_.mapKeys(obj, (value, key) => (keyMap.hasOwnProperty(key) ? keyMap[key] : key))

export const parsers = {
  parseCurrentUserPullRequests: response => (
    _.get(response, ['data', 'me', constants.pull_requests_owned, 'edges'])
      .map(x => transform(x.node, KEY_MAP))
  ),
  parseCurrentUserAssignedPullRequests: response => (
    _.get(response, ['data', 'me', constants.pull_requests_under_review, 'edges'])
      .map(x => transform(x.node, KEY_MAP))
  ),
  parseCurrentUserWatchingPullRequests: response => (
    _.get(response, ['data', 'me', constants.pull_requests_participating, 'edges'])
      .map(x => transform(x.node, KEY_MAP))
  ),
}
