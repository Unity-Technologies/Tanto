/* @flow */

import React from 'react'
import Scroll from 'react-scroll'
import Divider from 'components/Divider'
import CategoryModule from './common'

const Element = Scroll.Element

export type Props = {
  pullRequestId: string,
}

const LayoutGuardian = ({ pullRequestId }: Props) =>
  <div style={{ padding: '0 20px' }}>
    <Element name="page-top" className="element" />
    <Element name="summary" className="element">
      <CategoryModule pullRequestId={pullRequestId} type={'summary'} />
    </Element>
    <Element name="commits" className="element">
      <Divider text="Commits" />
      <CategoryModule pullRequestId={pullRequestId} type={'commits'} />
    </Element>
    <Element name="issues" className="element">
      <Divider text="Issues" />
      <CategoryModule pullRequestId={pullRequestId} type={'issues'} />
    </Element>
    <Element name="discussion" className="element">
      <Divider text="Discussion" />
      <CategoryModule pullRequestId={pullRequestId} type={'discussion'} />
    </Element>
    <Element name="diff" className="element">
      <Divider text="Diff" />
      <CategoryModule pullRequestId={pullRequestId} type={'diff'} />
    </Element>
    <Element name="page-bottom" />
  </div>

export default LayoutGuardian
