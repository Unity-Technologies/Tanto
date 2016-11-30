export const helpers = {
  buildPullRequestLink:
    (projectName: string, id: string): string => (`/${projectName}/pullrequests/${id}`),
  buildProjectLink:
    (projectName: string, branch:string): string => (`/${projectName}?branch=${branch}`),
}
