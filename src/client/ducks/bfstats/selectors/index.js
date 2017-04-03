/* @flow */

import { createSelector } from 'reselect'
import _ from 'lodash'
export type { StatusType } from 'ducks/fetch/selectors'

export const getBuildsEntities = (state: Object) =>
  _.get(state, ['entities', 'builds'], {})

export const getSourceStampsEntities = (state: Object) =>
  _.get(state, ['entities', 'sourceStamps'], {})

export const getRevision = (state: Object, props: Object) =>
  (props ? props.revision : null)

export const getSourceStamp = createSelector(
  getSourceStampsEntities, getRevision,
  (sourceStamps, revision) => (sourceStamps && revision ? sourceStamps[revision] : null)
)

export const getBuilds = createSelector(
  getBuildsEntities, getSourceStamp,
  (builds, sourceStamp) => {
    if (!builds || !sourceStamp) {
      return []
    }
    return sourceStamp.nodes.map(id => builds[id])
  }
)
