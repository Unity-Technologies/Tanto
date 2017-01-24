/* flow */
/* eslint-disable max-len */

import _ from 'lodash'

const subQuery = `
    total
    nodes {
      id
      description
      title
      updated
      status
      origin {
        revision
        name
        repository {
          name
        }
      }
      target {
        name
        repository {
          name
          fullName
        }
      }
      owner {
        username
        fullName
      }
    }
`

export const userPullRequestsQuery = name => `
  query ($limit: Int, $offset: Int, $target: PullRequestTargetArgument, $repo: String, $orderBy: Ordering) {
    me {
      ${name}(limit: $limit, offset: $offset, repo: $repo, target: $target, orderBy: $orderBy) {
        ${subQuery}
      }
    }
  }`

export const projectPullRequestsQuery = `
  query ($limit: Int, $offset: Int, $target: PullRequestTargetArgument, $repo: Int, $orderBy: Ordering) {
    repository(id: $repo) {
      pullRequests(limit: $limit, offset: $offset, target: $target, orderBy: $orderBy) {
        total
        nodes {
          id
          description
          title
          updated
          status
          origin {
            revision
            name
            type
            repository {
              name
            }
          }
          target {
            name
            type
            repository {
              name
              fullName
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
  USER_PULL_REQUESTS: userPullRequestsQuery(constants.pullRequestsOwned),
  USER_ASSIGNED_PULL_REQUESTS: userPullRequestsQuery(constants.pullRequestsAssigned),
}

export const parseCurrentUserPullRequests = response => (
  _.get(response, ['data', 'me', constants.pullRequestsOwned])
)

export const parseCurrentUserAssignedPullRequests = response => (
  _.get(response, ['data', 'me', constants.pullRequestsAssigned])
)

export const parsePullRequests = response => (
  _.get(response, ['data', 'repository', 'pullRequests'])
)

export const parsers = {
  parseCurrentUserPullRequests,
  parseCurrentUserAssignedPullRequests,
  parsePullRequests,
}

export type RepositoryGraphType = {
  name: string
}

export const PullRequestSource = {
  BRANCH: 'BRANCH',
  REVISION: 'REVISION',
  TAG: 'TAG',
  BOOK: 'BOOK',
}

export type PullRequestSourceReferenceType =
    PullRequestSource.BRANCH
  | PullRequestSource.REVISION
  | PullRequestSource.TAG
  | PullRequestSource.BOOK

export type PullRequestSourceReference = {
  type: PullRequestSourceReferenceType,
  name: string
}

export type PullRequestUserType = {
  username: string,
  fullName: string,
}

export type TargetGraphType = {
  name: string,
  repository: RepositoryGraphType,
}

export type OriginGraphType = {
  name: string,
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

export const OrderFields = ['updated']
