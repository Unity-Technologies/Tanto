/* @flow */
import React from 'react'
import './ChangesetDelta.css'

type ChangesetDeltaProps = {
  deleted: number,
  added: number,
  showDetails?: boolean,
}

function getPercent(sum: number, value: number) {
  return sum > 0 ? Math.round((100 * value) / sum) : 0
}

const ChangesetDelta = ({ added, deleted, showDetails }: ChangesetDeltaProps) => {
  const sum = deleted + added
  const deletedPercent = getPercent(sum, deleted)
  const addedPercent = getPercent(sum, added)

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
    </div>
  )
}


export default ChangesetDelta
