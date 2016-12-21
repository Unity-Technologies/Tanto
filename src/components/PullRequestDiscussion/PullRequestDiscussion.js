/* @flow */

import React from 'react'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import _ from 'lodash'

import NewComment from '../NewComment/NewComment'
import TestAvatar from '../TestAvatar/TestAvatar'
import TextEditorBox from '../TextEditorBox/TextEditorBox'

import { PullRequestDescription } from '../../api/testPullRequest'

const textLoremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris' // eslint-disable-line

const prComments = [
  {
    author: 'John Dou',
    message: textLoremIpsum,
    postDate: '1 day ago',
    issue: true,
    niceToHave: false,
    codeStyle: true,
  },
  {
    author: 'John Dou',
    message: textLoremIpsum,
    postDate: '6 day ago',
    issue: false,
    niceToHave: true,
    codeStyle: true,
  },
  {
    author: 'John Dou',
    message: textLoremIpsum,
    postDate: '7 day ago',
    issue: true,
    niceToHave: false,
    codeStyle: true,
  },
  {
    author: 'John Dou',
    message: textLoremIpsum,
    postDate: '8 day ago',
    issue: true,
    niceToHave: false,
    codeStyle: true,
  },
]

export type Props = {
  onSaveComment?: Function
}

const PullRequestDiscussion = (props: Props) =>
  <div>
    <Row>
      <Col md={12}>
        <div style={{ display: 'inline-flex', width: '100%' }}>
          <TestAvatar />
          <div style={{ padding: '0 20px' }}>
            <div style={{ fontSize: '14px', color: '#31708f' }}>
              <strong>Bob Dou (author)</strong>
            </div>
            <div
              style={{
                color: 'rgb(145, 142, 142)',
                fontStyle: 'italic',
                textTransform: 'lowercase',
              }}
            >
              Initial PR description, 1 day ago
            </div>
          </div>
        </div>
        <TextEditorBox text={PullRequestDescription} readOnly previewMode simpleText />
      </Col>
    </Row>
    <hr style={{ margin: '15px 0' }} />
    <Row>
      <Col md={12}>
        <div>
          {prComments.map(comment => (
            <div key={_.uniqueId('comment')}>
              <div style={{ display: 'inline-flex', width: '100%' }}>
                <TestAvatar />
                <div style={{ padding: '0 20px' }}>
                  <div style={{ fontSize: '14px', color: '#31708f' }}>
                    <strong>{comment.author}</strong>
                  </div>
                  <div
                    style={{
                      color: 'rgb(145, 142, 142)',
                      fontStyle: 'italic',
                      textTransform: 'lowercase',
                    }}
                  >
                    {comment.postDate}
                  </div>
                </div>
              </div>
              <div style={{ marginRight: '10px' }}>
                <TextEditorBox text={comment.message} readOnly previewMode simpleText />
              </div>
              <hr style={{ margin: '15px 0' }} />
            </div>
          ))}
        </div>
        <div name="discussion-last" id="discussion-last" style={{ marginTop: '20px' }}>
          <NewComment
            headerStyle={{ borderRadius: '0px' }}
            style={{
              borderBottom: '1px solid lightgrey',
              borderRadius: '0px',
              marginBottom: '10px',
            }}
            // ref="newTextEditorBox"
            placeholder="Write comment here..."
            onComment={props.onSaveComment}
          />
        </div>
      </Col>
    </Row>
  </div>


export default PullRequestDiscussion
