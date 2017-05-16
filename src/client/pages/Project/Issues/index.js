/* @flow */

import React from 'react'
import { pureComponent } from 'components/PureComponent'
import Helmet from 'react-helmet'

export type Props = {
  params: {
    prid: string
  }
};

function Issues({ params: { prid } }: Props) {
  return (
    <div>
      <Helmet title="Issues" />
      <h3>Issues in project {prid}</h3>
    </div>
  )
}

export default pureComponent(Issues)
