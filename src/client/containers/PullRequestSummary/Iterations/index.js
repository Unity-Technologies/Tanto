/* @flow */

import React from 'react'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem'
import { connect } from 'react-redux'
import { getPullRequestIterations } from 'ducks/pullrequests/selectors'
import { buildPullRequestLink } from 'routes/helpers'
import { Link } from 'react-router'
import { createStructuredSelector } from 'reselect'
import { pureComponent } from 'components/PureComponent'

type IterationType = {
  id: string,
  repositoryName: string,
  title: string,
}
type Props = {
  iterations: Array<IterationType>
}

export const Iterations = ({ iterations }: Props) => {
  if (!iterations || !iterations.length) {
    return null
  }
  return (
    <ListGroupItem className="summary-item-title">
      <Row>
        <Col md={5}>
          <div className="summary-header-column">
            Iterations
          </div>
        </Col>
        <Col md={7}>
          <div>
            {iterations.map(iteration =>
              (<div>
                <Link
                  to={buildPullRequestLink(iteration.repositoryName, iteration.id)}
                >
                  {iteration.title}
                </Link>
              </div>))}
          </div>
        </Col>
      </Row>
    </ListGroupItem>
  )
}

export const structuredSelector = createStructuredSelector({
  iterations: getPullRequestIterations,
})

export default connect(structuredSelector)(pureComponent(Iterations))

