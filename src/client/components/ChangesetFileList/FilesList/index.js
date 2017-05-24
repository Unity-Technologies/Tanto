/* @flow */
import React from 'react'
import { pureComponent } from 'components/PureComponent'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import ListGroup from 'react-bootstrap/lib/ListGroup'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import type { File } from 'universal/types'
import ChangesetDelta from 'components/ChangesetDelta'
import Scroll from 'react-scroll'

const Link = Scroll.Link

type Props = {
  files: Array<File>,
  reviews?: Object,
  compact?: boolean,
  containerElementName?: string,
}

export const renderFileReview = (fileReview: Object) => {
  if (fileReview && fileReview.reviewed) {
    return (
      <i className="fa fa-check-square-o reviewed" />
    )
  }
  return <i className="fa fa-check-square-o" />
}

export const renderFileBookmark = (fileReview: Object) => {
  if (fileReview && fileReview.bookmarked) {
    return (
      <i className="fa fa-tag bookmarked" />
    )
  }
  return <i className="fa fa-tag" />
}

export const FilesList = ({ compact, files, containerElementName, reviews }: Props) =>
  (
    <ListGroup
      style={{ fontSize: '13px', overflowY: 'auto', overflowX: 'hidden', height: '79vh' }}
    >
      {files.map(file => (
        <ListGroupItem key={file.id} style={{ padding: '10px 10px' }} >
          <Row>
            <Col lg={8} md={8} sm={8} xs={8}>
              <div style={{ float: 'left', marginRight: '5px' }}>
                <ChangesetDelta
                  pie={compact}
                  deleted={file.stats.deleted}
                  added={file.stats.added}
                  changed={0}
                />
              </div>
              <Link
                smooth
                style={{ cursor: 'pointer' }}
                containerId={containerElementName}
                to={file.name.replace(/[/.]/g, '')}
              >
                {file.name}
              </Link>
            </Col>
            <Col
              lg={compact ? 4 : 2}
              md={compact ? 4 : 2}
              sm={compact ? 4 : 2}
              xs={compact ? 4 : 2}
            >
              <div style={{ color: 'lightgrey', cursor: 'pointer', float: 'right' }}>
                {file.comments && file.comments.length > 0 &&
                  <span style={{ color: 'lightblue' }}>
                    <span style={{ marginRight: '5px' }}>
                      <i className="fa fa-comment" />
                    </span>
                    {file.comments.length}</span>
                }

                <span className="file-review-icon">
                  {reviews ? renderFileReview(reviews[file.id]) : null}</span>
                <span className="file-review-icon">
                  {reviews ? renderFileBookmark(reviews[file.id]) : null}</span>
              </div>
            </Col>
          </Row>
        </ListGroupItem>
      ))}
    </ListGroup>
  )

export default pureComponent(FilesList)
