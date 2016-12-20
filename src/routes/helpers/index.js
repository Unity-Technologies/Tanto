/* @flow */

type LinkType = {
  link: string,
  label: string
}

export const breadcrumbItems = (pathname: string): Array<LinkType> => {
  const items = pathname.split('/').filter(entry => entry.trim() !== '')
  let path = ''
  return items.map(x => {
    path = path.concat('/', x)
    return { link: path, label: x }
  })
}

export const groupPathFromPath = (path: string): string => path.replace(/^\/projects(\/)?/, '')
export const buildPullRequestLink =
  (projectName: string, id: string): string => (`/${projectName}/pullrequests/${id}`)
export const buildProjectLink =
  (projectName: string, branch: string): string => (`/${projectName}?branch=${branch}`)
export const buildProjectLinkNoBranch =
  (projectName: string): string => (`/project/${projectName}`)
export const buildProjectsLink =
  (suffix: string): string => (`/projects/${suffix}`)

export const helpers = {
  buildPullRequestLink,
  buildProjectLink,
  buildProjectLinkNoBranch,
  buildProjectsLink,
  groupPathFromPath,
  breadcrumbItems,
}
