/* @flow */

import { fetchBfStatsAction } from 'ducks/fetch'
import type { FetchAction } from 'ducks/fetch'
import latestRepositoryBuilds from '../queries/latestRepositoryBuilds.graphql'

/**
 * Action types
 */
export const types = {
  FETCH_LATEST_BUILDS: 'BFSTATS/FETCH_LATEST_BUILDS',
}

/**
 * Action creators
 */
export const fetchLatestBuildsForRevision = (repository: string, revision: string): FetchAction =>
  fetchBfStatsAction(
    {
      type: types.FETCH_LATEST_BUILDS,
      query: latestRepositoryBuilds,
      variables: {
        repository, revision,
      },
    })

export const fetchLatestBuildsForBranch = (repository: string, branch: string): FetchAction =>
  fetchBfStatsAction({ type: types.FETCH_LATEST_BUILDS, query: latestRepositoryBuilds, variables: { repository, branch } })
