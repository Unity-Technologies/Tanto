/* @flow */
import React from 'react'
import './ChangesetDelta.css'

type ChangesetDeltaProps = {
  deleted: number,
  added: number,
  changed: number,
  showDetails?: boolean,
}

function getPercent(sum: number, value: number) {
  return sum > 0 ? Math.round((100 * value) / sum) : 0
}

const ChangesetDelta = ({ added, deleted, changed, showDetails }: ChangesetDeltaProps) => {
  const sum = deleted + added + changed

  const deletedPercent = getPercent(sum, deleted)
  const addedPercent = getPercent(sum, added)
  const changedPercent = getPercent(sum, changed)

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


export default ChangesetDelta
