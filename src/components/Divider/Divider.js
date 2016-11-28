import React, { PropTypes } from 'react'
import './Divider.css'

function Divider(props) {
  return (
    <div className="divider">
      <span className="divider-text">
        {props.text}
      </span>
    </div>
  )
}

Divider.propTypes = {
  text: PropTypes.node.isRequired,
}

export default Divider
