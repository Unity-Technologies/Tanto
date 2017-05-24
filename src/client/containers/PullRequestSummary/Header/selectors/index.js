/* @flow */
import { createSelector } from 'reselect'
import _ from 'lodash'
import { getPullRequest } from 'ducks/pullrequests/selectors'
import type { HeaderPropsType } from '../index.js'

export const getHeaderData = (state: Object, props: Object): HeaderPropsType =>
  createSelector(
    getPullRequest,
    pr =>
      _.pick(pr, ['title', 'created', 'owner']),
  )

export default getHeaderData
