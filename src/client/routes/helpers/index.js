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
  (projectName: string, id: string): string => (`/repos/${projectName}/_/pull_requests/${id}`)

export const buildRepoLink =
  (name: string, groupPath: string = '', branch: string = ''): string => {
    const branchQuery = branch ? `?branch=${branch}` : ''
    const projectName = groupPath ? `${groupPath}/${name}` : name
    return `/repos/${projectName}${branchQuery}`
  }

export const buildReposLink =
  (suffix: string): string => (`/repos/${suffix}`)

export const buildChangesetLink =
  (projectName: string, id: string): string => (`/project/${projectName}/changeset/${id}`)

export const buildKatanaBuildLink = (project: any, builder: any, number: any) =>
  (`${process.env.KATANA_HOST || ''}/repos/${project}/builders/${builder}/builds/${number}`)

export const helpers = {
  buildPullRequestLink,
  buildRepoLink,
  buildReposLink,
  groupPathFromPath,
  breadcrumbItems,
  buildKatanaBuildLink,
}

