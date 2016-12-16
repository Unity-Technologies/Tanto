/* flow */

import _ from 'lodash'

export const userPullRequestsQuery = name => `
  query ($first: Int!, $offset: Int!,) {
    me {
      ${name}(first: $first, offset: $offset) {
        total
        nodes {
          id
          description
          title
          updated
          status
          origin {
            branch
            revision
            repository {
              name
            }
          }
          target {
            branch
            repository {
              name
            }
          }
          owner {
            username
            fullName
          }
        }
      }
    }
  }`

export const constants = {
  pullRequestsOwned: 'pullRequestsOwned',
  pullRequestsAssigned: 'pullRequestsAssigned',
}

export const queries = {
  CURRENT_USER_PULL_REQUESTS: userPullRequestsQuery(constants.pullRequestsOwned),
  CURRENT_USER_ASSIGNED_PULL_REQUESTS: userPullRequestsQuery(constants.pullRequestsAssigned),
}

export const parsers = {
  parseCurrentUserPullRequests: response => (
    _.get(response, ['data', 'me', constants.pullRequestsOwned])
  ),
  parseCurrentUserAssignedPullRequests: response => (
    _.get(response, ['data', 'me', constants.pullRequestsAssigned])
  ),
}

export type RepositoryGraphType = {
  name: string
}

export type PullRequestUserType = {
  username: string,
  fullName: string,
}

export type TargetGraphType = {
  branch: string,
  repository: RepositoryGraphType,
}

export type OriginGraphType = {
  branch: string,
  revision: string,
  repository: RepositoryGraphType,
}

export type PullRequestGraphType = {
  id: string,
  title: string,
  descroiption: string,
  updated: string,
  status: string,
  created: string,
  owner: PullRequestUserType,
  origin: OriginGraphType,
  target: TargetGraphType,
}

