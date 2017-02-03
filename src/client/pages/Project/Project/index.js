/* @flow */

import React from 'react'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'


export type Props = {
  params: {
    id: string,
  },
  children?: Object,
  theme?: Object,
  name: string,
}

const Project = (props: Props) => {
  const childrenWithProps = React.Children.map(props.children,
    child => React.cloneElement(child, {
      theme: props.theme,
    })
  )

  return (
    <div>
      <Helmet title={`Project ${props.name}`} />
      {childrenWithProps}
    </div>
  )
}


export default connect(
  (state, props) => ({
    name: props.params.splat,
  })
)(Project)

