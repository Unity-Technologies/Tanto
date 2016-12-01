/* @flow */

const PULL_REQUEST_QUERY = `
query ($id: Int!) {
  pull_request(id: $id) {
    title
    status
    created
    owner {
      avatar(size: 40)
      full_name
      username
    }
    reviewers {
      edges {
        node {
          review_status
          user {
            avatar(size: 40)
            full_name
            username
          }
        }
      }
    }
  }
}
`

export default PULL_REQUEST_QUERY

export const parsers = {
  // TODO: this could be done by the fetch function...
  // Pretty simple transformation
  pullRequestQuery: (response: any) => (
    Object.assign(
      {},
      response.data.pull_request,
      { reviewers: response.data.pull_request.reviewers.edges.map(e => e.node) }
    )
  ),
}

export type PullRequestUserType = {
  username: string,
  full_name: string,
  avatar: ?string,
}

export type PullRequestReviewerType = {
  review_status: ?string,
  user: PullRequestUserType
}

// TODO: this can be automatically extracted from schema
export type PullRequestGraphType = {
  title: string,
  status: string,
  created: string,
  owner: PullRequestUserType,
  reviewers: Array<PullRequestReviewerType>
}
