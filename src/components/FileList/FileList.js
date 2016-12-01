/* eslint-disable */

import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import _ from 'lodash'
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn,
  TableHeader,
  TableHeaderColumn,
} from 'material-ui/Table'
import FolderClosedIcon from 'material-ui/svg-icons/file/folder'
import File from 'material-ui/svg-icons/editor/insert-drive-file'

function FileList({ data, onFileClick }) {
  return (<Table height={'500px'}>
    <TableHeader
      adjustForCheckbox={false}
      enableSelectAll={false}
      displaySelectAll={false}
    >
      <TableRow>
        <TableHeaderColumn style={{ width: '20px' }} />
        <TableHeaderColumn>Name</TableHeaderColumn>
        <TableHeaderColumn>Size</TableHeaderColumn>
        <TableHeaderColumn>Last Commit</TableHeaderColumn>
        <TableHeaderColumn>Updated</TableHeaderColumn>
        <TableHeaderColumn>Author</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody
      displayRowCheckbox={false}
      deselectOnClickaway={false}
      showRowHover
      stripedRows={false}
    >
      {data.map(item => (
        <TableRow
          key={_.uniqueId('_table_row')}
          selectable={false}
        >
          <TableRowColumn style={{ width: '20px' }}>
            {item.children ?
              <FolderClosedIcon style={{ fill: 'rgba(212, 213, 214, 0.721569)' }} /> :
                <File style={{ fill: 'rgba(167, 236, 232, 0.6)' }} />
        }
          </TableRowColumn>
          <TableRowColumn>

            <a
              style={{ cursor: 'pointer' }}
              onClick={() => onFileClick(item)}
            >
              {item.name}
            </a>
          </TableRowColumn>
          <TableRowColumn>{item.size}</TableRowColumn>
          <TableRowColumn>
            <Link to={`/changeset/${item.revision}`}>{item.commitmessage}</Link>
          </TableRowColumn>
          <TableRowColumn>{item.updated}</TableRowColumn>
          <TableRowColumn>{item.author}</TableRowColumn>
        </TableRow>
      ))}
    </TableBody>
  </Table>)
}

FileList.propTypes = {
  data: PropTypes.array.isRequired,
  onFileClick: PropTypes.func.isRequired,
}

export default FileList
