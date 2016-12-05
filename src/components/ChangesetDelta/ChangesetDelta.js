/* @flow */
import React, { PropTypes } from 'react'
import './ChangesetDelta.css'

type ChangesetDeltaProps = {
  deleted: number,
  added: number,
  changed: number,
  showDetails: boolean,
}

function gerPercent(sum: number, value: number) {
  return sum > 0 ? Math.round((100 * value) / sum) : 0
}

const ChangesetDelta = ({ added, deleted, changed, showDetails }: ChangesetDeltaProps) => {
  const sum = deleted + added + changed

  const deletedPercent = gerPercent(sum, deleted)
  const addedPercent = gerPercent(sum, added)
  const changedPercent = gerPercent(sum, changed)

  return (
    <div className="changeset-delta">
      {deletedPercent > 0 &&
        <div
          className="changeset-chunk changeset-deleted"
          style={{ width: `${deletedPercent}%` }}
        >
          {showDetails && <span style={{ color: 'black' }}>{deleted}</span>}
        </div>}
      {addedPercent > 0 &&
        <div
          className="changeset-chunk changeset-added"
          style={{ width: `${addedPercent}%` }}
        >
          {showDetails && <span style={{ color: 'black' }}>{added}</span>}
        </div>}
      {changedPercent > 0 &&
        <div
          className="changeset-chunk changeset-changed"
          style={{ width: `${changedPercent}%` }}
        >
          {showDetails && <span style={{ color: 'black' }}>{changed}</span>}
        </div>}
    </div>
  )
}

ChangesetDelta.propTypes = {
  deleted: PropTypes.number.isRequired,
  changed: PropTypes.number.isRequired,
  added: PropTypes.number.isRequired,
  showDetails: PropTypes.bool,
}

export default ChangesetDelta
