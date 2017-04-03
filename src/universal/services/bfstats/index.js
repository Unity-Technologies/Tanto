/* @flow */
import 'isomorphic-fetch'
import { routes } from 'universal/constants'
import { graphQLFetch } from 'universal/requests'

export function post(query: string, variables: any, operationName: string) {
  return graphQLFetch(routes.BFSTATS_API_ROUTE)(query, variables, operationName)
}

export default post
