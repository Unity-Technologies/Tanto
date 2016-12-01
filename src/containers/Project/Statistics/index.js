// TODO: add flow annotations

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

function Statistics({ params: { prid } }) {
  return (
    <div>
      <Helmet title="Statistics" />
      <h3>Statistics {prid}</h3>
    </div>
  )
}

Statistics.propTypes = {
  // isFetching: PropTypes.bool.isRequired,
  // errorMessage: PropTypes.string,
  params: PropTypes.object.isRequired,
}

export default connect(
  state => ({
    isFetching: state.session.isFetching,
  })
)(Statistics)
