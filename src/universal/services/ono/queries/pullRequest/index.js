/* @flow */

// FIXME: avatar(size: 40)
const PULL_REQUEST_QUERY = `
query ($id: Int!) {
  pullRequest(id: $id) {
    id
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
        lineNumber
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

export type PullRequestReviewerStatusType =
    'not_reviewed'
  | 'approved'
  | 'rejected'
  | 'under_review'

export type PullRequestReviewerType = {
  status: PullRequestReviewerStatusType,
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
  lineNumber: string,
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
  origin: {
    name: string,
    repository: {
      name: string,
    },
  },
  target: {
    name: string,
    repository: {
      name: string,
    },
  },
  files: Array<File>,
}
