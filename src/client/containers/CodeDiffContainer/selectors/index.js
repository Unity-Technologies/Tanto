/* @flow */

import { createSelector } from 'reselect'
import { getLoggedUser } from 'ducks/session/selectors'
import { getFile, getFileComments } from 'ducks/pullrequests/selectors'
import { DiffTypes } from 'universal/constants'

export const getSideBySideFileDiff = (state: Object, props: Object) => {
  const file = state.ui.diff[props.id] || null
  return file ? file[DiffTypes.SIDE_BY_SIDE] : null
}

export const getUnifiedFileDiff = (state: Object, props: Object) => {
  const file = state.ui.diff[props.id] || null
  return file ? file[DiffTypes.UNIFIED] : null
}

export const getData =
  createSelector(
    getFile,
    getLoggedUser,
    getUnifiedFileDiff,
    getSideBySideFileDiff,
    getFileComments,
    (file, user, unifiedDiff, sideBySideDiff, comments) =>
     ({
       file,
       unifiedDiff,
       sideBySideDiff,
       loggedUser: user,
       comments,
     })
  )

export default getData
