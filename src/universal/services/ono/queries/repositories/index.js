/* @flow */
export const TOPLEVEL_REPOSITORIES_QUERY = `
query {
	repositories(limit: 50) {
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
    repositories(limit: 50) {
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

export const ALL_REPOSITORIES_QUERY = `
query($filter: String, $limit: Int) {
	repositories(all: true, filter: $filter, limit: $limit) {
    nodes {
      id
      fullName
    }
  }
}`

export const REPOSITORY_BRANCHES = `
query($id: Int!) {
	repository(id: $id) {
    id
    branches {
      name
      revision
    }
  }
}`

export type RepositoryType = {
  name: string,
  description: ?string,
  id: string,
  owner: { fullName: string },
  branches?: {
    name: string,
    revision: string,
  },
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

export function parseAllRepositoriesNames(data: any): Array<Object> {
  return data ? data.data.repositories.nodes : []
}

export function parseRepository(data: any): Object {
  return data.data.repository
}

export const query =
  (groupName: string): string => (groupName ? REPOSITORIES_QUERY : TOPLEVEL_REPOSITORIES_QUERY)

export const queries = {
  TOPLEVEL_REPOSITORIES_QUERY,
  REPOSITORIES_QUERY,
}
