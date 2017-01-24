/* @flow */

import React from 'react'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'

import { pluralizedText } from 'utils/text'
import pureComponent from 'universal/react-pure-render'


/*
NOTE: I've added Jira task to make separate field to get overview of PR stats
without querying list of files.
The changes delta value should be accessible without querying the whole files list
because files or changeset fetch we'll be streamed (file by file, or changeset by changest)
that means basically that each coming file with stats will initiate update of numbers
on this little chunk
*/

type ChangesSectionProps = {
  id: string,
  added: number,
  deleted: number,
  filesCount: number,
}

const info = {
  borderLeft: '5px solid rgba(226, 231, 245, 0.62)',
}

const headerColumnStyle = {
  textTransform: 'uppercase',
  color: '#10121b',
}

// TODO: Added stub data for PR changes delta until API ready
const ChangesSection = (props: ChangesSectionProps) =>
  <ListGroupItem style={info}>
    <Row>
      <Col md={5}>
        <div style={headerColumnStyle}>
          Changes
        </div>
      </Col>
      <Col md={7}>
        <div>
          {/* TODO: additions/deletions could be moved to backend */}
          <span>{pluralizedText('file', 'files', props.filesCount)} changed</span><br />
          <span style={{ color: '#55a532' }}>
            + {props.added}
          </span>
          <span style={{ color: '#bd2c00' }}>
            {' '}− {props.deleted}
          </span>
        </div>
      </Col>
    </Row>
  </ListGroupItem>


export default pureComponent(ChangesSection)
