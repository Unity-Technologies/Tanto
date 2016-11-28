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
          status
          origin_branch
          dest_branch
          origin_repository {
            id
            name
          },
          dest_repository {
            id
            name
          },
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

export const parsers = {
  parseCurrentUserPullRequests: response => (_.get(response, ['data', 'me', constants.pull_requests_owned, 'edges']).map(x => x.node)),
  parseCurrentUserAssignedPullRequests: response => (_.get(response, ['data', 'me', constants.pull_requests_under_review, 'edges']).map(x => x.node)),
  parseCurrentUserWatchingPullRequests: response => (_.get(response, ['data', 'me', constants.pull_requests_participating, 'edges']).map(x => x.node)),
}

