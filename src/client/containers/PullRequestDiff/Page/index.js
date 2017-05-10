/* @flow */
import React, { Component } from 'react'
import CodeDiffContainer from 'containers/CodeDiffContainer'
import _ from 'lodash'
import Scroll from 'react-scroll'
const Element = Scroll.Element
import './Page.css'

type Props = {
  files: Array<any>,
  viewType: number,
  pullRequestId: number,
  visible: boolean,
  index: number,
  onUpdateInlineComment: Function,
  onDeleteInlineComment: Function,
  onCreateInlineComment: Function
}

class Page extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: this.props.visible,
    }
  }
  props: Props

  handleShowPage = () => this.setState({ visible: true })
  handleHidePage = () => this.setState({ visible: false })

  render() {
    if (!this.state.visible) {
      return (
        <div className="show-more" onClick={this.handleShowPage}>
          <div className="show-more-title">Page {this.props.index}</div>

          <div className="show-more-body">
            {this.props.files.map(file =>
              <div>
                <Element
                  key={_.uniqueId(file.name)}
                  name={file.name.replace(/[/.]/g, '')}
                >
                  <span>
                    <i className="fa fa-check-square-o file-not-reviewed" aria-hidden="true"></i>
                  </span>
                  <span> {file.name}</span>
                </Element>
              </div>
            )}
          </div>
        </div>
      )
    }
    return (
      <div style={{ marginBottom: '10px' }}>
        <div className="show-more" onClick={this.handleHidePage}>
          <div className="show-more-title">Page {this.props.index}</div>
        </div>
        {this.props.files.map(file =>
          <CodeDiffContainer
            viewType={this.props.viewType}
            id={file.id}
            pullRequestId={this.props.pullRequestId}
            onUpdateInlineComment={this.props.onUpdateInlineComment}
            onDeleteInlineComment={this.props.onDeleteInlineComment}
            onCreateInlineComment={this.props.onCreateInlineComment}
          />
        )}
      </div>
    )
  }
}

export default Page
