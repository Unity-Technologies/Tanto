export type Props = { // isFetching: PropTypes.bool.isRequired,
// errorMessage: PropTypes.string,
params?: Object };

// TODO: add flow annotations

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

function Issues({ params: { prid } }) {
  return (
    <div>
      <Helmet title="Issues" />
      <h3>Issues in project {prid}</h3>
    </div>
  )
}

export default connect(
  state => ({
    isFetching: state.session.isFetching,
  })
)(Issues)
