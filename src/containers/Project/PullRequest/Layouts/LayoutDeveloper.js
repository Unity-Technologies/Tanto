/* @flow */

/* eslint-disable */

import React, { Component } from 'react'
import Scroll from 'react-scroll'
import {
  ChangesetFileList, ChangesetGroupedList,
  IssuesList, Reviewers,
  CodeDiffView,
  TextEditorBox, NewComment, TestAvatar } from 'components'
import _ from 'lodash'
import {
  Col, Row, ListGroup,
  ListGroupItem,
  Badge, Tabs, Tab } from 'react-bootstrap'
import {
  PullRequestDescription,
  PullRequestData,
  prChangesetList,
  prIssues,
  prReviewers,
 } from '../../../../api/testPullRequest'



const Element = Scroll.Element

const textLoremIpsum = `Lorem ipsum dolor sit amet, consectetur
adipiscing elit, sed do eiusmod tempor incididunt
ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris`

const prComments = [
    { author: 'John Dou', message: textLoremIpsum, postDate: '1 day ago', issue: true, niceToHave: false, codeStyle: true },
    { author: 'John Dou', message: textLoremIpsum, postDate: '6 day ago', issue: false, niceToHave: true, codeStyle: true },
    { author: 'John Dou', message: textLoremIpsum, postDate: '7 day ago', issue: true, niceToHave: false, codeStyle: true },
    { author: 'John Dou', message: textLoremIpsum, postDate: '8 day ago', issue: true, niceToHave: false, codeStyle: true },
]

const subHeader = text => (
  <div
    style={{ color: '#8c8c8c', fontSize: '13px' }}
  >
    {text}
  </div>
)

const tabTitle = (text, badge) => (
  <div style={{ display: 'inline-flex' }}>
    <div style={{ float: 'left', marginRight: '5px' }}>{text}</div>
    {!!badge && <div style={{ marginRight: '15px' }}><Badge>{badge}</Badge></div>}
  </div>
)

const downloadIcon = (
  <i className="fa fa-download" aria-hidden="true" />
)

const info = {
  borderLeft: '5px solid rgba(226, 231, 245, 0.62)',
}

const inProgress = {
  borderLeft: '5px solid #f7e99c',
}

const danger = {
  borderLeft: '5px solid rgb(255, 208, 208)',
}

const success = {
  borderLeft: '5px solid rgb(214, 247, 229)',
}

export const hashes = [
  { value: 1, label: 'default' },
  { value: 2, label: '5.3/devs/default' },
  { value: 3, label: '5.3/devs/feature1/feature' },
  { value: 4, label: '5.3/devs/feature2' },
  { value: 5, label: '5.3/devs/feature3' },
  { value: 6, label: '5.3/devs/feature4' },
]

const inProgressColor = 'rgb(198, 149, 10)'
const approvedColor = '#3f855b'
const dangerColor = '#e96666'

const headerColumnStyle = {
  textTransform: 'uppercase',
  color: '#10121b',
  paddingTop: '10px',
}

class LayoutDeveloper extends Component {
  constructor(props) {
    super(props)
    this.state = { value: null, reviewers: ['Jesper Mortensen'], toggleReviewers: false, key: 1 }
    this.handleChange = this.handleChange.bind(this)
    this.addReviewer = this.addReviewer.bind(this)
    this.toggleReviewers = this.toggleReviewers.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleChange(event, index, value) {
    this.setState({ value })
  }

  addReviewer(value) {
    const r = this.state.reviewers
    if (!r.includes(value.name)) {
      r.push(value.name)
      this.setState({ reviewers: r })
    }
  }

  toggleReviewers() {
    const toggled = this.state.toggleReviewers
    this.setState({ toggleReviewers: !toggled })
  }

  handleSelect(key) {
    this.setState({ key })
  }

  render() {
    return (

      <div>
        <div style={{ padding: '0 20px' }}>


          <Tabs defaultActiveKey={0} id="layout-developer-tabs">
            <Tab style={{ margin: '20px 0' }} eventKey={0} title="Summary">
               <div name="summary" id="summary" >
               <div style={{ display: 'inline-block' }}>
               <TestAvatar />
               <div style={{ padding: '0 10px', display: 'table' }}><div style={{ fontSize: '16px' }}>
                 <strong>Core: cleanup and sanitize various hash functions we use internally V3</strong></div>
                 <span style={{ color: 'grey', fontSize: '13px' }}>created 2 days ago</span>
               </div>
             </div>


               <Row>
                 <Col md={12}>
                   <ListGroup style={{ marginTop: '20px', fontSize: '13px' }}>
                   <ListGroupItem style={info}>
                    <Row>
                    <Col md={2}>
                        <div style={headerColumnStyle}>
                        Changes
                        </div>
                      </Col>
                    <Col md={3}>
                          <div>
                          <div>
                            {subHeader('Changes impact risk:')}
                            <div style={{ color: 'rgb(142, 173, 181)', textTransform: 'uppercase' }}>High</div>
                          </div>
                        </div>
                        </Col>
                    <Col md={6}>
                          <div>
                            {subHeader('Delta:')}
                            <span style={{ color: '#91942b' }}> ~ 219 </span>
                            <span style={{ color: '#d36a9a' }}> - 8684 </span>
                            <span style={{ color: 'rgb(47, 199, 137)' }}> + 885 </span>
                          </div>

                        </Col>
                    <Col md={1} />
                  </Row></ListGroupItem>
                   <ListGroupItem style={success}>
                      <Row>
                      <Col md={2}>
                        <div style={headerColumnStyle}>
                        Feature
                        </div>
                      </Col>
                      <Col md={3}>
                          {subHeader('Status:')}
                          <div style={{ color: approvedColor, textTransform: 'uppercase' }}>
                          APPROVED
                          </div>
                        </Col>
                      <Col md={6}>
                          <div>
                            <div>
                              {subHeader('ForBugs link:')}
                              <a href="#" >#123345 feature description here   </a>
                            </div>
                          </div>
                        </Col>
                      <Col md={1}>
                          <div style={{ color: '#dbdedf', float: 'right', fontSize: '20px' }} active>
                            <i className="fa fa-pencil" aria-hidden="true" />
                          </div>
                        </Col>
                    </Row>
                    </ListGroupItem>
                   <ListGroupItem style={info}>
                      <Row>
                       <Col md={2}>
                          <div style={headerColumnStyle}>
                          Repositories
                          </div>
                        </Col>
                       <Col md={3}>
                            <div>
                              {subHeader('Phase:')}
                              <div style={{ color: 'rgb(142, 173, 181)', textTransform: 'uppercase' }}>
                            DRAFT
                            </div>
                              <div style={{ fontSize: '12px' }}>(or headed to release)</div>
                            </div>
                          </Col>
                       <Col md={6}>
                            <div>
                              <div>
                              {subHeader('Origin:')}
                              <a href="unity/unity#ai/navmesh/builder-disabled"> unity/unity#ai/navmesh/builder-disabled</a>
                            </div>
                              <div>
                                {subHeader('Target:')}
                                <a href="unity/unity#trunk">unity/unity#trunk</a>
                              </div>
                            </div>
                          </Col>
                       <Col md={1}>
                            <div style={{ color: '#dbdedf', float: 'right', fontSize: '20px' }} active>
                            <i className="fa fa-pencil" aria-hidden="true" />
                          </div>
                          </Col>
                     </Row></ListGroupItem>
                   <ListGroupItem style={inProgress}>
                    <Row>
                     <Col md={2}>
                       <div style={headerColumnStyle}>
                         Code review
                       </div>
                     </Col>
                     <Col md={3}>
                          {subHeader('Status:')}
                          <div style={{ color: inProgressColor, textTransform: 'uppercase' }}>
                          in progress
                          </div>
                          <div style={{ fontSize: '12px' }}>(4 pending responses)</div>
                        </Col>
                     <Col md={6}>
                          {subHeader('Reviewers:')}
                          <Row>
                          <Col md={1}><span style={{ color: approvedColor, fontSize: '16px', marginRight:
                        '10px' }}
                          ><i className="fa fa-check" aria-hidden="true" /></span></Col>
                          <Col md={11}>
                            <div style={{ fontSize: '13px' }}>
                           Alexey Zakharov, Scott Bilas, Aras Pranckevičius, Tim Cooper
                          </div>
                          </Col>
                        </Row>
                          <Row>
                          <Col md={1}><span style={{ color: 'rgb(128, 154, 206)', fontSize: '16px', marginRight:
                        '10px' }}
                          ><i className="fa fa-circle-o-notch fa-spin fa-fw" /></span></Col>
                          <Col md={11}>
                            <div style={{ fontSize: '13px' }}>
                           Ante Ilic, Alex Lian
                          </div>
                          </Col>
                        </Row>
                          <Row>
                          <Col md={1}><span style={{ color: 'grey', fontSize: '16px', marginRight:
                        '10px' }}
                          ><i className="fa fa-question" aria-hidden="true" /></span></Col>
                          <Col md={11}>
                            <div style={{ fontSize: '13px' }}>
                            {this.state.reviewers.join(', ')}
                          </div>
                          </Col>
                        </Row>

                          {this.state.toggleReviewers &&
                        <Row style={{ paddingTop: '20px', paddingLeft: '50px' }}>
                             <Reviewers reviewers={prReviewers} onAdded={this.addReviewer} />
                           </Row>
                        }

                        </Col>
                     <Col md={1}>
                          <div onClick={this.toggleReviewers} style={{ color: '#dbdedf', float: 'right', fontSize: '20px', cursor: 'pointer' }} >
                            <i className="fa fa-pencil" aria-hidden="true" />
                          </div>
                        </Col>
                   </Row>

                  </ListGroupItem>
                   <ListGroupItem style={danger}>
                    <Row>
                    <Col md={2}>
                      <div style={headerColumnStyle}>
                      Tests
                      </div>
                    </Col>
                    <Col md={3}>
                        {subHeader('Test status:')}
                        <div style={{ color: dangerColor, textTransform: 'uppercase' }}>
                        No tests created
                        </div>
                      </Col>
                    <Col md={6}>
                        <div>
                          <div>
                            {subHeader('Test type:')}
                            unit tests
                          </div>
                        </div>
                      </Col>
                    <Col md={1}>
                        <div style={{ color: '#dbdedf', float: 'right', fontSize: '20px' }} active>
                          <i className="fa fa-pencil" aria-hidden="true" />
                        </div>
                      </Col>
                  </Row>
                  </ListGroupItem>
                   <ListGroupItem style={inProgress}>
                    <Row>
                    <Col md={2}>
                      <div style={headerColumnStyle}>
                      QA Verification
                      </div>
                    </Col>
                    <Col md={3}>
                        {subHeader('Status:')}
                        <div style={{ color: inProgressColor, textTransform: 'uppercase' }}>
                        In progress ...
                        </div>
                        <div style={{ fontSize: '12px' }}>(found 1 critical, 3 minor)</div>
                      </Col>
                    <Col md={6}>
                        <div>
                          <div>
                            {subHeader('ForBugs links:')}
                            <div><a href="#">#23456 Some critical issue descriprion</a></div>
                            <div><a href="#">#23457 The fist minor issue description</a></div>
                            <div><a href="#">#23458 The second minor issue description</a></div>
                            <div><a href="#">#23454 The third minor issue description</a> </div>
                          </div>
                        </div>
                      </Col>
                    <Col md={1}>
                        <div style={{ color: '#dbdedf', float: 'right', fontSize: '20px' }} active>
                          <i className="fa fa-pencil" aria-hidden="true" />
                        </div>
                      </Col>
                  </Row>
                  </ListGroupItem>
                   <ListGroupItem style={success}>
                    <Row>
                    <Col md={2}>
                      <div style={headerColumnStyle}>
                      Katana build
                      </div>
                    </Col>
                    <Col md={3}>
                        {subHeader('Status:')}
                        <div>
                          <div style={{ color: approvedColor, textTransform: 'uppercase' }}>
                        Passed
                        </div>
                          <div style={{ fontSize: '12px' }}>(5 hours ago)</div>
                        </div>
                      </Col>
                    <Col md={6}>
                        <div>
                          <div>
                            {subHeader('Latest:')}
                            <a href="#">ABV-48147</a>
                            <div style={{ fontSize: '12px' }}>(5 builds in total)</div>
                          </div>
                        </div>
                      </Col>
                    <Col md={1} />
                  </Row>
                  </ListGroupItem>
                   <ListGroupItem style={danger}>
                    <Row>
                    <Col md={2}>
                      <div style={headerColumnStyle}>
                      PR Issues
                      </div>
                    </Col>
                    <Col md={3}>
                        {subHeader('Status:')}
                        <div style={{ color: dangerColor, textTransform: 'uppercase' }}>
                      UNRESOLVED
                      </div>
                        <div style={{ fontSize: '12px' }}>(12 issue)</div>
                      </Col>
                    <Col md={6}>
                        <div>
                          <div>
                            {subHeader('Unresolved:')}
                            <div><a href="#"># Rename to MdFourGenerator_Deprecated</a></div>
                            <div><a href="#"># Template typename TValue, typename TNode</a></div>
                          </div>
                        </div>
                      </Col>
                    <Col md={1}>
                        <div style={{ color: '#dbdedf', float: 'right', fontSize: '20px' }} active>
                          <i className="fa fa-pencil" aria-hidden="true" />
                        </div>
                      </Col>
                  </Row>
                  </ListGroupItem>
                   <ListGroupItem style={info}>
                    <Row>
                    <Col md={2}>
                      <div style={headerColumnStyle}>
                      User test
                      </div>
                    </Col>
                    <Col md={3}>
                        {subHeader('Status:')}
                        <div style={{ textTransform: 'uppercase', color: '#8eadb5' }}>
                        undefined
                        </div>
                      </Col>
                    <Col md={6}>
                        <div>
                          <div>
                            {subHeader('Build:')}
                            <a href="#" >build48147</a>
                          </div>
                        </div>
                      </Col>
                    <Col md={1}>
                        <div style={{ color: '#dbdedf', float: 'right', fontSize: '20px' }} active>
                          <i className="fa fa-pencil" aria-hidden="true" />
                        </div>
                      </Col>
                  </Row>
                  </ListGroupItem>
                   <ListGroupItem style={info}>
                    <Row>
                    <Col md={2}>
                      <div style={headerColumnStyle}>
                      Release notes
                      </div>
                    </Col>
                    <Col md={3}>
                        {subHeader('Status:')}
                        <div style={{ textTransform: 'uppercase', color: '#8eadb5' }}>
                        Exist
                        </div>
                      </Col>
                    <Col md={6}>
                        <div>
                          <div>
                            {subHeader('Links:')}
                            <div><a href="#" >Release note 1</a></div>
                            <div><a href="#" >Release note 2</a></div>
                          </div>
                        </div>
                      </Col>
                    <Col md={1}>
                        <div style={{ color: '#dbdedf', float: 'right', fontSize: '20px' }} active>
                          <i className="fa fa-pencil" aria-hidden="true" />
                        </div>
                      </Col>
                  </Row>
                  </ListGroupItem>
                 </ListGroup>
                 </Col>
               </Row>
             </div>


             </Tab>
            <Tab style={{ margin: '20px 0' }}
             eventKey={1}
             title={tabTitle('Discussion', 4)}
           >


             <div>
                         <Row>
                           <Col md={12}>
                             <div style={{ display: 'inline-flex', width: '100%' }}>
                             <TestAvatar />
                             <div style={{ padding: '0 20px' }}>
                               <div style={{ fontSize: '14px', color: '#31708f' }}>
                                 <strong>Bob Dou (author)</strong>
                               </div>
                               <div style={{ color: 'rgb(145, 142, 142)', fontStyle: 'italic', textTransform: 'lowercase' }}>Initial PR
                               description, 1 day ago</div>
                             </div>
                           </div>

                             <TextEditorBox
                               text={PullRequestDescription}
                               readOnly
                               previewMode
                               simpleText
                             />

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
                                       <div style={{ color: 'rgb(145, 142, 142)', fontStyle: 'italic', textTransform: 'lowercase' }}>{comment.postDate}</div>
                                     </div>
                                   </div>
                                   <div style={{ marginRight: '10px' }}>
                                     <TextEditorBox
                                       text={comment.message}
                                       readOnly
                                       previewMode
                                       simpleText
                                     />
                                   </div>
                                   <hr style={{ margin: '15px 0' }} />
                                 </div>
                               ))}
                             </div>
                             <div name="discussion-last" id="discussion-last" style={{ marginTop: '20px' }}>
                               <NewComment
                                 headerStyle={{ borderRadius: '0px' }}
                                 style={{ borderBottom: '1px solid lightgrey',
                                         borderRadius: '0px',
                                         marginBottom: '10px' }}
                                 ref="newTextEditorBox"
                                 placeholder="Write comment here..."
                                 onComment={message => this.onSaveComment(message)}
                               />
                             </div>
                           </Col>
                         </Row>
                       </div>


           </Tab>
            <Tab style={{ margin: '20px 0' }} eventKey={2} title="Files">

             <div>
                 <ChangesetFileList files={PullRequestData} />
               </div>

           </Tab>
            <Tab style={{ margin: '20px 0' }} eventKey={3} title={tabTitle('Changesets', downloadIcon)}>

             <div>
                 <ChangesetGroupedList accordion={false} data={prChangesetList} />
               </div>

           </Tab>
            <Tab style={{ margin: '20px 0' }} eventKey={4} title={tabTitle('Issues', 2)}>

              <div>
                  <IssuesList issues={prIssues} />
                </div>

            </Tab>
            <Tab style={{ margin: '20px 0' }} eventKey={5} title="Diff">
               <div>
                <CodeDiffView files={PullRequestData} />
              </div>
             </Tab>
          </Tabs>


          <Element name="page-bottom"  />

        </div>
      </div>
    )
  }
}

export default LayoutDeveloper
