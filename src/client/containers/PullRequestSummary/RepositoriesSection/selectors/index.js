/* @ flow */

import { getPullRequest } from 'ducks/pullrequests/selectors'
import _ from 'lodash'
import { createSelector } from 'reselect'
import { RepositoriesPropsType } from '../index.js'

export const getRepositoriesData = (state: Object, props: Object): RepositoriesPropsType =>
  createSelector(
    getPullRequest,
    pr => _.pick(pr, ['origin', 'target']),
  )

export default getRepositoriesData
