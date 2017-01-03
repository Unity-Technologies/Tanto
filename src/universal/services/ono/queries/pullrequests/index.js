/* flow */

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
        branch
        revision
        repository {
          id
          name
          fullName
        }
      }
      target {
        branch
        repository {
          id
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
  query ($first: Int, $offset: Int, $branch: String, $repo: String, $orderBy: Ordering) {
    me {
      ${name}(first: $first, offset: $offset, repo: $repo, branch: $branch, orderBy: $orderBy) {
        ${subQuery}
      }
    }
  }`

export const projectPullRequestsQuery = `
  query ($first: Int, $offset: Int, $branch: String, $repo: Int, $orderBy: Ordering) {
    repository(id: $repo) {
      pullRequests(first: $first, offset: $offset, branch: $branch, orderBy: $orderBy) {
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
              id
              name
              fullName
            }
          }
          target {
            branch
            repository {
              id
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

export const OrderFields = ['updated']

