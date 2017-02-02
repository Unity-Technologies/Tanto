/* @flow */
import userProfileQuery from 'ducks/session/queries/me.graphql'
import { fetchActionCreator } from 'ducks/fetch'
import type { PullRequestSource } from 'universal/types'
import type { OrderByType } from 'ducks/order'
import _ from 'lodash'
import { RECEIVE_PAGE } from 'ducks/pagination'
import pullRequestList from 'ducks/session/queries/userPullRequestList.graphql'

/**
 * Action types
 */
export const types = {
  FETCH_USER_PROFILE: 'SESSION/FETCH_USER_PROFILE',
  FETCH_USER_PULL_REQUESTS: 'PULLREQUESTS/FETCH_USER_PULL_REQUESTS',
  FETCH_USER_ASSIGNED_PULL_REQUESTS: 'PULLREQUESTS/FETCH_USER_ASSIGNED_PULL_REQUESTS',
  FETCH_USER_WATCHING_PULL_REQUESTS: 'PULLREQUESTS/FETCH_USER_WATCHING_PULL_REQUESTS',
}

export const operationNames = {
  pullRequestsOwned: 'pullRequestsOwned',
  pullRequestsAssigned: 'pullRequestsAssigned',
}

export type FetchPullRequestVariables = {
  page: number,
  pageSize: number,
  target: PullRequestSource,
  repo: string,
  orderBy: OrderByType,
}

export const parseCurrentUserPullRequests = (response: Object) => (
  _.get(response, ['data', 'me', operationNames.pullRequestsOwned])
)

export const parseCurrentUserAssignedPullRequests = (response: Object) => (
  _.get(response, ['data', 'me', operationNames.pullRequestsAssigned])
)

/**
 * Action creators
 */
export const fetchProfile = (): Object =>
  fetchActionCreator(types.FETCH_USER_PROFILE, userProfileQuery)

export const setProfile = (profile: Object): Object => ({ type: types.SET_USER_PROFILE, profile })

export const setPersona = (persona: string): Object => ({ type: types.SET_USER_PERSONA, persona })


// TODO:  move RECEIVE_PAGE into middleware or remove at leat callback
export const fetchUserPullRequests = (variables: FetchPullRequestVariables): Object =>
  fetchActionCreator(
    types.FETCH_USER_PULL_REQUESTS, pullRequestList, variables,
    operationNames.pullRequestsOwned,
    (data: Object, cbArgs: Object): Array<Object> => {
      const { nodes, total } = parseCurrentUserPullRequests(data)
      return [
        {
          type: RECEIVE_PAGE,
          namespace: operationNames.pullRequestsOwned, nodes, total,
          ...cbArgs,
        },
      ]
    })

// TODO:  move RECEIVE_PAGE into middleware or remove at leat callback
export const fetchUserAssignedPullRequests = (variables: FetchPullRequestVariables): Object =>
  fetchActionCreator(
    types.FETCH_USER_ASSIGNED_PULL_REQUESTS, pullRequestList, variables,
    operationNames.pullRequestsAssigned,
    (data: Object, cbArgs: Object): Array<Object> => {
      const { nodes, total } = parseCurrentUserAssignedPullRequests(data)
      return [
        {
          type: RECEIVE_PAGE,
          namespace: operationNames.pullRequestsAssigned, nodes, total, ...cbArgs,
        },
      ]
    })
