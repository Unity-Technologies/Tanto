import fragments from '../fragments'
import QL from '../ql'

export default {
  projectsAndGroupsDeep: QL `
    query {
      groups {
        ...  on RepositoryGroup ${fragments.Project}
        groups {
          edges {
            node {
              ...  on RepositoryGroup ${fragments.Project}
            }
          }
        }
      }
      repositories {
        id
        name
        description
      }
    }
  `,
  projectsAndGroupsFirstLevel: QL `
    query {
      groups {
        id,
        name
      }
      repositories {
        id
        name
        description
      }
    }
  `,
  groupProjects: id => QL `
    query {
      node(id:"${id}") {
        ... on RepositoryGroup ${fragments.Project}
      }
    }
  `,
  projectBranches: id => QL `
  query {
    node(id:"${id}") {
      ... on RepositoryGroup ${fragments.Project}
    }
  }
  `,
  projectChangelog: id => QL `
  query {
    node(id:"${id}") {

    }
  }
  `,
  projectFiles: id => QL `
  query {
    node(id:"${id}") {

    }
  }
  `,
  projectPullRequests: id => QL `
  query {
    node(id:"${id}") {

    }
  }
  `,
}
