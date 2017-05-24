/* @flow */
import React from 'react'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import { connect } from 'react-redux'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import { getPullRequestIssues } from 'ducks/pullrequests/selectors'
import { createSelector } from 'reselect'
import type { IssueType } from 'universal/types'
import { pureComponent } from 'components/PureComponent'
import { IssueStatus } from 'universal/constants'

const subHeader = text => (
  <div style={{ color: '#8c8c8c', fontSize: '13px' }}>
    {text}
  </div>
)

const danger = {
  borderLeft: '5px solid rgb(255, 208, 208)',
}

const dangerColor = '#e96666'

const headerColumnStyle = {
  textTransform: 'uppercase',
  color: '#10121b',
}

type IssuesSectionProps = {
  issues: Array<IssueType>,
}

export const getIssues = (state: Object, props: Object): Object =>
  createSelector(
    getPullRequestIssues,
    issues => ({
      issues: issues ? issues.filter(x => x.status !== IssueStatus.OBSOLETE) : null,
    }),
  )

//  TODO: complete this component, now it's mockeed since no ono API available for it
export const IssuesSection = ({ issues }: IssuesSectionProps) => {
  if (!issues || !issues.length) {
    return null
  }
  return (
    <div>
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
            <div style={{ fontSize: '12px' }}>({issues.length} issues)</div>
          </Col>
          <Col md={7}>
            <div>
              <div>
                {subHeader('Unresolved:')}
                {
                  issues.map(issue =>
                    (<div>
                      <a href="someissuelink#">{issue.title}</a>
                    </div>))
                }
              </div>
            </div>
          </Col>
        </Row>
      </ListGroupItem>
    </div>)
}


export default connect(getIssues)(pureComponent(IssuesSection))
