
export const PROJECT_LIST_QUERY = `
{
  repositories {
    id
    name
    description
    owner {
      first_name
      last_name
    }
    updated
  }
  groups {
    id
    name
    repositories {
      edges {
        node {
          id
          name
          description
        }
      }
    }
  }
}`

export const queries = {
  PROJECT_LIST_QUERY,
}
