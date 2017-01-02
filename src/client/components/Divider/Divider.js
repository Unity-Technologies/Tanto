/* @flow */

import React from 'react'
import './Divider.css'

export type Props = { text: number | string };

function Divider({ text }: Props) {
  return (
    <div className="divider">
      <span className="divider-text">
        {text}
      </span>
    </div>
  )
}

export default Divider
