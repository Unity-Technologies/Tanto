// TODO: add flow annotations

import React, { PropTypes } from 'react'
import Helmet from 'react-helmet'

function Project(props) {
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

Project.propTypes = {
  params: PropTypes.object.isRequired,
  children: PropTypes.object,
  theme: PropTypes.object,
}

export default Project
