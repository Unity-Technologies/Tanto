/* @flow */
import React from 'react'
import PureComponent from 'components/PureComponent'
import CodeDiffContainer from 'containers/CodeDiffContainer'
import _ from 'lodash'
import Scroll from 'react-scroll'
import './Page.css'

const Element = Scroll.Element


type Props = {
  files: Array<any>,
  viewType: number,
  pullRequestId: any,
  visible?: boolean,
  index: number,
  fileReviews: Object,
  onUpdateInlineComment: Function,
  onDeleteInlineComment: Function,
  onCreateInlineComment: Function
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

export const renderFileComments = (comments: Array<Object>) => {
  if (comments && comments.length) {
    return (
      <span className="file-review-comments"> <i className="fa fa-comment" /> {comments.length}</span>
    )
  }
  return null
}

export class Page extends PureComponent {
  constructor(props: Props) {
    super(props)
    this.state = {
      visible: props.visible || false,
    }
  }
  state: {
    visible: boolean
  }
  props: Props

  handleShowPage = () => this.setState({ visible: true })
  handleHidePage = () => this.setState({ visible: false })

  render() {
    const { fileReviews, index, files } = this.props

    if (!this.state.visible) {
      return (
        <div className="show-more" role="link" tabIndex={0} onClick={this.handleShowPage}>
          <div className="show-more-title">Page {index}</div>

          <div className="show-more-body">
            {files.map(file =>
              (<div>
                <Element
                  key={_.uniqueId(file.name)}
                  name={file.name.replace(/[/.]/g, '')}
                >
                  <span className="file-review-icon">
                    {fileReviews ? renderFileReview(fileReviews[file.id]) : null}</span>
                  <span className="file-review-icon">
                    {fileReviews ? renderFileBookmark(fileReviews[file.id]) : null}</span>
                  <span> {file.name}</span>
                  {file.comments &&
                    renderFileComments(file.comments)
                  }
                </Element>
              </div>),
            )}
          </div>
        </div>
      )
    }
    return (
      <div style={{ marginBottom: '10px' }}>
        <div role="link" tabIndex={0} className="show-more" onClick={this.handleHidePage}>
          <div className="show-more-title">Page {index}</div>
        </div>
        {files.map(file =>
          (<CodeDiffContainer
            viewType={this.props.viewType}
            id={file.id}
            pullRequestId={this.props.pullRequestId}
            onUpdateInlineComment={this.props.onUpdateInlineComment}
            onDeleteInlineComment={this.props.onDeleteInlineComment}
            onCreateInlineComment={this.props.onCreateInlineComment}
          />),
        )}
      </div>
    )
  }
}

export default Page
