import { IssueStatus, PullRequestSource, ChangesetStatus } from 'universal/constants'

export type UserType = {
  id: string,
  email: string,
  username: string,
  fullName: string
}

export type ReviewType = {
  status: string,
  user: UserType,
}

export type IssueStatusType = $Keys<typeof IssueStatus> // eslint-disable-line no-undef

export type ChangesetStatusType = $Keys<typeof ChangesetStatus> // eslint-disable-line no-undef

export type IssueType = {
  id: number,
  title: string,
  description: string,
  status: IssueStatusType,
  updated: string,
  branch: string,
  owner: UserType,
  assignee: UserType
}


export type RepositoryGraphType = {
  name: string
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

export type RepositoryType = {
  name: string,
  description: ?string,
  id: string,
  owner: { fullName: string },
  branches?: {
    name: string,
    revision: string,
  },
  updated: string,
}

export type GroupType = {
  name: string,
  path: string,
  description: ?string,
}

export type GeneralCommentType = {
  id: string,
  text: string,
  modified: string,
  created: string,
  author: UserType,
  status: string
}

export type InlineCommentType = {
  id: string,
  text: string,
  created: string,
  modified: string,
  author: UserType,
  lineNumber: number
}

export type FileType = {
  id: string,
  stats: Object,
  operation: string,
  oldName: string,
  diff: string,
  type: string,
  comments: Array<InlineCommentType>
}

export type ChangesetType = {
  id: string,
  rawId: string,
  branch: string,
  message: string,
  author: UserType,
  date: string,
  status: ChangesetStatusType,
  files: {
    stats: {
      added: number,
      deleted: number
    }
  }
}
