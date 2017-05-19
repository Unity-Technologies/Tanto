/* @flow */

import { createStructuredSelector } from 'reselect'
import { getRepositoryBranches } from 'ducks/repositories/selectors'

export const getData = createStructuredSelector({
  options: getRepositoryBranches,
})
