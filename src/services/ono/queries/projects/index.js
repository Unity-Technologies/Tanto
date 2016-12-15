/* @flow */
export const GET_TOPLEVEL_PROJECTS_QUERY = `
query {
	repositories {
    nodes {
      id
      name
      owner {
        fullName
      }
      description
      updated
    }
  }
  groups {
    name
    description
  }
}`

export const GET_PROJECTS_QUERY = `
query($name: String!) {
	group(name: $name) {
    repositories {
      nodes {
        name
        id
        owner {
          fullName
        }
        description
        updated 
      }
    }
    groups {
      name
      description 
    }
  }
}`


export type ProjectType = {
  name: string,
  shortName?: string,
  description: ?string,
  id: string,
  owner: { fullName: string },
  updated: string,
}

export type GroupType = {
  name: string,
  shortName?: string,
  description: ?string,
}

export type ReturnType = {
  projects: Array<ProjectType>,
  groups: Array<GroupType>,
}


export function parseToplevelProjectsData(data: any): ReturnType {
  return {
    projects: data.data.repositories.nodes,
    groups: data.data.groups,
  }
}

function removeBaseName(item: Object, base: string) {
  const next = item
  next.shortName = item.name.replace(base, '')
  return next
}

export function parseProjectsData(data: any, path: string): ReturnType {
  let projects
  let groups
  if (data.data.group) {
    projects = data.data.group.repositories.nodes.map(x => removeBaseName(x, `${path}/`))
    groups = data.data.group.groups.map(x => removeBaseName(x, `${path}/`))
  } else {
    projects = []
    groups = []
  }
  return {
    projects,
    groups,
  }
}

export const queries = {
  GET_TOPLEVEL_PROJECTS_QUERY,
  GET_PROJECTS_QUERY,
}
