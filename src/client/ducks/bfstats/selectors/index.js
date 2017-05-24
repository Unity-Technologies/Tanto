/* @flow */

import { createSelector } from 'reselect'
import _ from 'lodash'

export type { StatusType } from 'ducks/fetch/selectors'

export const getBuildsEntities = (state: Object) =>
  _.get(state, ['entities', 'builds'], null)

export const getSourceStampsEntities = (state: Object) =>
  _.get(state, ['entities', 'sourceStamps'], null)

export const getRevision = (state: Object, props: Object) =>
  (props && props.revision ? props.revision : null)

export const getSourceStamp = createSelector(
  getSourceStampsEntities, getRevision,
  (sourceStamps, revision) => (
    sourceStamps && revision && revision in sourceStamps
      ? sourceStamps[revision] : null),
)

export const getBuilds = createSelector(
  getBuildsEntities, getSourceStamp,
  (builds, sourceStamp) => {
    if (!builds || !sourceStamp) {
      return null
    }

    return sourceStamp.builds.nodes.map(id => builds[id])
  },
)

export const getABVBuild = createSelector(
  getBuilds,
  (builds) => {
    const index = _.findIndex(builds, build => build.builder.name === 'proj0-ABuildVerification')
    return index > -1 ? builds[index] : null
  },
)
