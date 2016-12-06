export type Props = { text?: number | string | React.Element | Array<any> };
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

export default Divider
