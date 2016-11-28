import fragments from '../fragments'
import QL from '../ql'

export default {
  /**
   * Temporary authentication query
   * @param  {[type]} username [description]
   * @param  {[type]} password [description]
   * @return {[type]}          [description]
   */
  authenticate: (username, password) => `
    query {
      authenticate (username:"${username}", password:"${password}")
      {
        id,
        username,
        email,
        name
      }
    }`,

  /**
   * Gets all pull requests user participates in(current user view)
   * @type {[type]}
   */
  participatePullRequests: QL `
    query {
          me {
            participatepullrequests {
              edges {
                node {
                  id,
                  title,
                  description,
                  status,
                  created,
                  updated,
                  owner {
                    id,
                    username,
                  }
                }
              }
            }
          }
        }`,

  /**
   * Gets all pull requests created by current user
   * @type {[type]}
   */
  userPullRequests: QL `
    query {
      me {
        pullrequests {
          edges {
            node {
            ... on PullRequest
            ${fragments.PullRequest}
          }
        }
      }
    }
  }`,
}
