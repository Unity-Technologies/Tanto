/* @flow */
/* eslint-disable no-use-before-define */
/**
 * Semi auto-generated from Ono.
 *
 * I'm unsure if we want these here... Right now I like having these close
 * to the graphql query (see pullRequest/index.js as an example).
 *
 * If we start using fragments (e.g. a user always has a fixed set of fields),
 * this more global approach makes sense.
 */

export type AuthUser = {
  id: string,
  username: string,
  isActive: boolean,
  email: string,
  fullName: string,
  repositories: Array<Repository>,
  pullRequestsOwned: PullRequests,
  pullRequestsAssigned: PullRequests,
}


export type File = {
  name: string,
  id: string,
  stats: FileChangeStats,
  oldName: string,
  operation: string,
  diff: string,
  comments?: Array<InlineComment>,
}


export type FileChangeStats = {
  added: number,
  deleted: number,
  binary: boolean,
}


export type InlineComment = {
  text: string,
  created: string,
  modified: string,
  author: User,
  line: string,
}


export type Paging = PullRequests | Repositories


export type PullRequest = {
  id: string,
  title: string,
  description: string,
  created: string,
  updated: string,
  owner: User,
  originRepository: PullRequestOrigin,
  destRepository: PullRequestDestination,
  ancestorRev: string,
  reviewers: Array<Reviewer>,
  status: string,
  comments: Array<PullRequestComment>,
  files: Array<File>,
}


export type PullRequestComment = {
  text: string,
  created: string,
  modified: string,
  author: User,
  status: string,
}


export type PullRequestDestination = {
  repository: Repository,
  branch: string,
}


export type PullRequestOrigin = {
  repository: Repository,
  branch: string,
  rev: string,
}


export type PullRequests = {
  total: number,
  first: number,
  offset: number,
  nodes: Array<PullRequest>,
}


export type Repositories = {
  total: number,
  first: number,
  offset: number,
  nodes: Array<Repository>,
}


export type Repository = {
  id: string,
  name: string,
  owner: User,
  description: string,
  cloneUri: string,
  private: boolean,
  updated: string,
}


export type RepositoryGroup = {
  name: string,
  groups: Array<RepositoryGroup>,
  repositories: Array<Repository>,
}


export type Reviewer = {
  id: string,
  username: string,
  isActive: boolean,
  email: string,
  fullName: string,
  status: string,
  user: User,
}


export type User = {
  id: string,
  username: string,
  isActive: boolean,
  email: string,
  fullName: string,
}
