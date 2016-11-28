/* @flow */

import React, { PropTypes } from 'react'
import './ChangesetDelta.css'

function ChangesetDelta(props) {
  const sum = props.deleted + props.added + props.changed

  const deletedWidth = sum > 0 ? (props.deleted / (sum * 100)) : 0
  const addedWidth = sum > 0 ? (props.added / (sum * 100)) : 0
  const changedWidth = sum > 0 ? (props.changed / (sum * 100)) : 0
  const showText = props.showDetails !== undefined ? props.showDetails : true
  return (
    <div className="changeset-delta">
      {deletedWidth > 0 &&
        <div className="changeset-chunk changeset-deleted" style={{ width: `${Math.round(deletedWidth)}%` }}>
          {showText && <span style={{ color: 'black' }}>{props.deleted}</span>}
        </div>}
      {addedWidth > 0 &&
        <div className="changeset-chunk changeset-added" style={{ width: `${Math.round(addedWidth)}%` }} >
          {showText && <span style={{ color: 'black' }}>{props.added}</span>}
        </div>}
      {changedWidth > 0 &&
        <div className="changeset-chunk changeset-changed" style={{ width: `${Math.round(changedWidth)}%` }}>
          {showText && <span style={{ color: 'black' }}>{props.changed}</span>}
        </div>}
    </div>
  )
}

ChangesetDelta.propTypes = {
  deleted: PropTypes.number,
  changed: PropTypes.number,
  added: PropTypes.number,
  showDetails: PropTypes.bool,
}

export default ChangesetDelta
