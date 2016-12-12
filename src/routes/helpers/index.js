export const buildPullRequestLink =
  (projectName: string, id: string): string => (`/${projectName}/pullrequests/${id}`)

export const buildProjectLink =
  (projectName: string, branch:string): string => (`/${projectName}?branch=${branch}`)

export const helpers = {
  buildPullRequestLink,
  buildProjectLink,
}
