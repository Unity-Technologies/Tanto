/* @flow */
import React from 'react'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import ListGroup from 'react-bootstrap/lib/ListGroup'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import fuzzy from 'fuzzy'
import { Link } from 'react-router'

import type { File } from 'services/ono/queries/pullRequest'
import ChangesetDelta from '../ChangesetDelta'
import { pluralizedText } from 'utils/text'

import './ChangesetFileList.css'

const whiteSpaceRegExp = /\s+/g

type Props = {
  files: Array<File>,
  compact?: boolean,
}

const FilesList = ({ compact, files }: Props) =>
  <div>
    <Row>
      <Col md={12}>
        <ListGroup style={{ fontSize: '13px', overflowY: 'auto', overflowX: 'hidden' }}>
          {files.map(file => (
            <ListGroupItem key={file.id} style={{ padding: '10px 10px' }} >
              <Row>
                {!compact &&
                  <Col lg={2} md={2} xsHidden smHidden>
                    <ChangesetDelta
                      deleted={file.stats.deleted}
                      added={file.stats.added}
                      changed={0}  // FIXME
                    />
                  </Col>
                }
                <Col lg={8} md={8} sm={8} xs={8}>
                  <Link
                    style={{ cursor: 'pointer' }}
                    to={`${window.location.pathname}/${file.name}`}
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
                {file.comments.length > 0 &&
                  <div style={{ color: 'lightblue', cursor: 'pointer', float: 'right' }}>
                    <span style={{ marginRight: '5px' }}>
                      <i className="fa fa-comment" aria-hidden="true" />
                    </span>
                    {file.comments.length}
                  </div>
                }
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

class ChangesetFileList extends React.Component {
  /* eslint-disable react/sort-comp */
  constructor(props: Props) {
    super(props)
    this.state = {
      filesAfterSearch: this.props.files,
      query: '',
    };

    // flow workaround:
    (this: any).onQueryChange = this.onQueryChange.bind(this)
  }

  props: Props
  state: {
    filesAfterSearch: Array<File>,
    query: string,
  }

  onQueryChange(event: SyntheticInputEvent) {
    const query = event.target.value
    let filesAfterSearch

    if (query) {
      // NOTE: we can easily do highlighting of the search result using "pre"
      // and "post" option to fuzzy. But then we need to escape the file input
      // before running the searcher and use dangerouslySetInnerHTML
      const queryWithoutWhitespace = query.replace(whiteSpaceRegExp, '')
      const matches = fuzzy.filter(queryWithoutWhitespace, this.props.files, {
        extract: (el) => el.name,
      })
      filesAfterSearch = matches.map(match => match.original)
    } else {
      filesAfterSearch = this.props.files
    }

    this.setState({
      filesAfterSearch,
      query,
    })
  }

  render() {
    const { filesAfterSearch, query } = this.state
    const { files, compact } = this.props
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
              {query ?
                statusTextSearch(filesAfterSearch, query)
              :
                statusTextNoSearch(files)
              }
            </div>
          </Col>
        </Row>
        <FilesList
          compact={compact}
          files={filesAfterSearch}
        />
      </div>
    )
  }

}


export default ChangesetFileList
