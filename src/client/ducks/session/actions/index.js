/* @flow */
import userProfileQuery from 'ducks/session/queries/me.graphql'
import { fetchOnoActionCreator, fetchOnoAction } from 'ducks/fetch'
import type { PullRequestSourceReference } from 'universal/types'
import { PullRequestSource } from 'universal/constants'
import type { FetchAction, FetchPullRequestVariablesType } from 'ducks/fetch'
import type { OrderByType } from 'ducks/order'
import _ from 'lodash'
import { RECEIVE_PAGE } from 'ducks/pagination'
import pullRequestList from 'ducks/session/queries/userPullRequestList.graphql'

/**
 * Action types
 */
export const types = {
  FETCH_USER_PROFILE: 'SESSION/FETCH_USER_PROFILE',
  SET_USER_PROFILE: 'SESSION/SET_USER_PROFILE',
  SET_USER_PERSONA: 'SESSION/SET_USER_PERSONA',
  FETCH_USER_PULL_REQUESTS: 'PULLREQUESTS/FETCH_USER_PULL_REQUESTS',
  FETCH_USER_ASSIGNED_PULL_REQUESTS: 'PULLREQUESTS/FETCH_USER_ASSIGNED_PULL_REQUESTS',
  FETCH_USER_WATCHING_PULL_REQUESTS: 'PULLREQUESTS/FETCH_USER_WATCHING_PULL_REQUESTS',
}

export const operationNames = {
  pullRequestsOwned: 'pullRequestsOwned',
  pullRequestsAssigned: 'pullRequestsAssigned',
}

type RepositorySelector = {
  id?: number,
  name?: string,
}

type PullRequestTargetRepoArgument = {
  repository: RepositorySelector,
  source: PullRequestSourceReference,
}

export type FetchPullRequestVariables = {
  page: number,
  pageSize: number,
  target: PullRequestTargetRepoArgument,
  orderBy: OrderByType,
}

const formatVariables = (variables: Object): FetchPullRequestVariables => {
  const { repo, branch, ...args } = variables

  if (repo || branch) {
    args.target = {}
    if (repo) {
      args.target.repository = { name: repo }
    }

    if (branch) {
      args.target.source = {
        name: branch,
        type: PullRequestSource.BRANCH,
      }
    }
  }

  return args
}

const formatArguments = (args: Object): Object => {
  const { target, ...variables } = args
  const branch = target && target.source ? target.source.name : ''
  const repo = target && target.repository ? target.repository.name : ''
  const cbArgs = {
    ...variables,
    branch,
    repo,
  }
  return cbArgs
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
  fetchOnoAction({ type: types.FETCH_USER_PROFILE, query: userProfileQuery })

export const setProfile = (profile: Object): Object => ({ type: types.SET_USER_PROFILE, profile })

export const setPersona = (persona: string): Object => ({ type: types.SET_USER_PERSONA, persona })


// TODO:  move RECEIVE_PAGE into middleware or remove at leat callback
export const fetchUserPullRequests = (variables: FetchPullRequestVariablesType): FetchAction =>
  fetchOnoActionCreator(
    types.FETCH_USER_PULL_REQUESTS, pullRequestList, formatVariables(variables),
    operationNames.pullRequestsOwned,
    (data: Object, cbArgs: Object): Array<Object> => {
      const { nodes, total } = parseCurrentUserPullRequests(data)
      return [
        {
          type: RECEIVE_PAGE,
          namespace: operationNames.pullRequestsOwned,
          nodes,
          total,
          ...formatArguments(cbArgs),
        },
      ]
    })

// TODO:  move RECEIVE_PAGE into middleware or remove at leat callback
export const fetchUserAssignedPullRequests = (variables: FetchPullRequestVariablesType): FetchAction =>
  fetchOnoActionCreator(
    types.FETCH_USER_ASSIGNED_PULL_REQUESTS, pullRequestList, formatVariables(variables),
    operationNames.pullRequestsAssigned,
    (data: Object, cbArgs: Object): Array<Object> => {
      const { nodes, total } = parseCurrentUserAssignedPullRequests(data)
      return [
        {
          type: RECEIVE_PAGE,
          namespace: operationNames.pullRequestsAssigned,
          nodes,
          total,
          ...formatArguments(cbArgs),
        },
      ]
    })
