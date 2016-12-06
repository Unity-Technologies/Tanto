/* @flow */

import React from 'react'
import Helmet from 'react-helmet'

export type Props = {
  params: {
    id: string,
  },
  children?: Object,
  theme?: Object,
};

function Project(props: Props) {
  const { theme } = props
  const childrenWithProps = React.Children.map(props.children,
    child => React.cloneElement(child, {
      theme,
    })
  )

  return (
    <div>
      <Helmet title={`Project ${props.params.id}`} />
      {childrenWithProps}
    </div>
  )
}

export default Project
