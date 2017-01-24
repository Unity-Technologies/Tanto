import IssueStatus from 'universal/constants'

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

type IssueStatusType = $Keys<typeof IssueStatus> // eslint-disable-line no-undef

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

