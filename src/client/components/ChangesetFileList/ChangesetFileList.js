/* @flow */
import React from 'react'
import PureComponent from 'components/PureComponent'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import ListGroup from 'react-bootstrap/lib/ListGroup'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import fuzzy from 'fuzzy'

import Scroll from 'react-scroll'

const Link = Scroll.Link

import type { File } from 'universal/types'
import ChangesetDelta from '../ChangesetDelta'
import { pluralizedText } from 'utils/text'


import './ChangesetFileList.css'

const whiteSpaceRegExp = /\s+/g

type Props = {
  files: Array<File>,
  reviews?: Object,
  compact?: boolean,
  containerElementName?: string,
}

export const renderFileReview = (fileReview: Object) => {
  if (fileReview && fileReview.reviewed) {
    return (
      <i className="fa fa-check-square-o reviewed" aria-hidden="true" />
    )
  }
  return <i className="fa fa-check-square-o" aria-hidden="true" />
}

export const renderFileBookmark = (fileReview: Object) => {
  if (fileReview && fileReview.bookmarked) {
    return (
      <i className="fa fa-tag bookmarked" aria-hidden="true" />
    )
  }
  return <i className="fa fa-tag" aria-hidden="true" />
}

const FilesList = ({ compact, files, containerElementName, reviews }: Props) =>
  <div>
    <Row>
      <Col md={12}>
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
                          <i className="fa fa-comment" aria-hidden="true" />
                        </span>
                        {file.comments.length}</span>
                    }
                    <span className="file-review-icon">{renderFileReview((reviews || {})[file.id])}</span>
                    <span className="file-review-icon">{renderFileBookmark((reviews || {})[file.id])}</span>
                  </div>
                </Col>
              </Row>
            </ListGroupItem>
          ))}
        </ListGroup>
      </Col>
    </Row>
  </div>


const statusTextNoSearch = files => {
  const additions = files.reduce((sum, f) => sum + f.stats.added, 0)
  const deletions = files.reduce((sum, f) => sum + f.stats.deleted, 0)
  return `
      ${pluralizedText('file', 'files', files.length)}
      changed with ${pluralizedText('addition', 'additions', additions)}
      and ${pluralizedText('deletion', 'deletions', deletions)}
    `
}

const statusTextSearch = (filesAfterSearch, query) => {
  if (filesAfterSearch.length === 0) {
    return 'No matches found'
  }

  return `${statusTextNoSearch(filesAfterSearch)} (filtered based on search)`
}

export const searchFiles = (files: Array<File>, query: string): Array<File> => {
  if (!query) {
    return files
  }

  const queryWithoutWhitespace = query.replace(whiteSpaceRegExp, '')
  const matches = fuzzy.filter(queryWithoutWhitespace, files, {
    extract: (el) => el.name,
  })
  return matches.map(match => match.original)
}

class ChangesetFileList extends PureComponent {
  /* eslint-disable react/sort-comp */
  constructor(props: Props) {
    super(props)
    this.state = {
      filesAfterSearch: this.props.files,
      query: '',
    }
  }

  props: Props
  state: {
    filesAfterSearch: Array<File>,
    query: string,
  }

  componentWillReceiveProps(nextProps: Object) {
    if (this.props.files !== nextProps.files) {
      this.setState({
        filesAfterSearch: searchFiles(nextProps.files, this.state.query),
      })
    }
  }

  onQueryChange = (event: SyntheticInputEvent) => {
    const query = event.target.value
    if (!query) {
      this.setState({
        filesAfterSearch: this.props.files,
        query,
      })
      return
    }

    const result = searchFiles(this.props.files, query)

    this.setState({
      filesAfterSearch: result,
      query,
    })
  }

  render() {
    const { filesAfterSearch, query } = this.state
    const { compact, containerElementName, reviews } = this.props
    return (
      <div>
        <Row>
          <Col md={12}>
            <div
              style={{
                display: 'inline-flex',
                border: '1px solid lightgrey',
                borderRadius: '5px',
                padding: '7px',
                width: '100%',
              }}
            >
              <span style={{ pagging: '10px', color: 'grey' }}>
                <i className="fa fa-search" aria-hidden="true" />
              </span>
              <input
                type="text"
                style={{
                  outline: 'none',
                  border: 'none',
                  marginLeft: '10px',
                  fontSize: '14px',
                  width: '100%',
                }}
                onChange={this.onQueryChange}
              />
            </div>
            <div style={{ color: 'rgb(122, 123, 123)', fontSize: '12px', padding: '10px' }} active>
              {statusTextSearch(filesAfterSearch, query)}
            </div>
          </Col>
        </Row>
        <FilesList
          compact={compact}
          reviews={reviews}
          files={filesAfterSearch}
          containerElementName={containerElementName}
        />
      </div>
    )
  }
}

export default ChangesetFileList
