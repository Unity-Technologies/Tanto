/* @flow */

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

type LinkType = {
  link: string,
  label: string
}

export function breadcrumbItems(pathname: string): Array<LinkType> {
  const items = pathname.split('/').filter(entry => entry.trim() !== '')
  let path = ''
  return items.map(x => {
    path = path.concat('/', x)
    return { link: path, label: x }
  })
}

export function groupPathFromPath(path: string) {
  return path.replace(/^\/projects(\/)?/, '')
}

export function isBaseProjectsPath(path: string) {
  return path === '/projects' || path === '/projects'
}
