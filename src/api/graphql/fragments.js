export default {
  /**
   * Pull request fragment
   * @type {[type]}
   */
  PullRequest: `{
    id,
    title,
    description
  }
`,
  Project: `{
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
  }`,
}
