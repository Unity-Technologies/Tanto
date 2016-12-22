/* @flow */

// FIXME: avatar(size: 40)
const PULL_REQUEST_QUERY = `
query ($id: Int!) {
  pullRequest(id: $id) {
    id
    title
    status
    created
    owner {
      fullName
      username
    }
    reviewers {
      status
      user {
        fullName
        username
      }
    }
    files {
      id
      name
      oldName
      diff
      stats {
        added
        deleted
        binary
      }
      operation
      comments {
        text
        line
        created
        modified
        author {
          fullName
          username
        }
      }
    }
  }
}
`

export default PULL_REQUEST_QUERY

export const pullRequestQuery = (response: any) => response.data.pullRequest

// TODO: these types can be statically valided and compared with Ono schema:

export type Repository = {
  name: string
}

export type PullRequestUserType = {
  username: string,
  fullName: string,
}

export type PullRequestReviewerType = {
  status: ?string,
  user: PullRequestUserType,
}

export type FileChangeStats = {
  added: number,
  deleted: number,
  binary: boolean,
}

export type InlineComment = {
  id: string,
  text: string,
  created: string,
  modified: string,
  author: PullRequestUserType,
  line: string,
}

export type File = {
  id: string,
  name: string,
  oldName: string,
  diff: string,
  stats: FileChangeStats,
  operation: string,
  comments: Array<InlineComment>,
}

export type PullRequestGraphType = {
  title: string,
  status: string,
  created: string,
  owner: PullRequestUserType,
  reviewers: Array<PullRequestReviewerType>,
  files: Array<File>,
}
