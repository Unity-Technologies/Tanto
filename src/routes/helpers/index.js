export const helpers = {
  buildPullRequestLink:
    (projectName: string, id: string): string => (`/${projectName}/pullrequests/${id}`),
  buildProjectLink:
    (projectName: string, branch:string): string => (`/${projectName}?branch=${branch}`),
  buildProjectLinkNoBranch:
    (projectName: string): string => (`/project/${projectName}`),
  buildProjectsLink:
    (suffix: string): string => (`/projects/${suffix}`),
}

export function groupPathFromPath(path: string) {
  return path.replace(/^\/projects(\/)?/, '')
}
