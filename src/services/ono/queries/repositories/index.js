/* @flow */
export const TOPLEVEL_REPOSITORIES_QUERY = `
query {
	repositories {
    nodes {
      id
      name
      owner {
        fullName
      }
      groupPath
      groupName
      description
      updated
    }
  }
  groups {
    id
    name
    path
    parentGroupName
    description
  }
}`

export const REPOSITORIES_QUERY = `
query($name: String!) {
	group(name: $name) {
    repositories {
      nodes {
        id
        name
        owner {
          fullName
        }
        description
        groupPath
        groupName
        updated
      }
    }
    groups {
      id
      name
      path
      parentGroupName
      description
    }
  }
}`

export type RepositoryType = {
  name: string,
  description: ?string,
  id: string,
  owner: { fullName: string },
  updated: string,
}

export type GroupType = {
  name: string,
  path: string,
  description: ?string,
}

export type ReturnType = {
  repositories: Array<RepositoryType>,
  groups: Array<GroupType>,
}

export function parseRepositories(data: any): ReturnType {
  const root = (data.data.group || data.data)
  return {
    repositories: root.repositories.nodes,
    groups: root.groups,
  }
}

export const query =
  (groupName: string): string => (groupName ? REPOSITORIES_QUERY : TOPLEVEL_REPOSITORIES_QUERY)

export const queries = {
  TOPLEVEL_REPOSITORIES_QUERY,
  REPOSITORIES_QUERY,
}
