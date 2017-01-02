/* @flow */

import React from 'react'
import Scroll from 'react-scroll'

import Divider from 'components/Divider'
import type { PullRequestGraphType } from 'services/ono/queries/pullRequest'
import CategoryModule from './common'


const Element = Scroll.Element

export type Props = {
  pullRequest: PullRequestGraphType,
}

// TODO: should be seperate URL from developer (simpel redirect if guardian)
const LayoutGuardian = ({ pullRequest }: Props) =>
  <div style={{ padding: '0 20px' }}>
    <Element name="page-top" className="element" />
    <Element name="summary" className="element">
      <CategoryModule pullRequest={pullRequest} type={'summary'} />
    </Element>
    <Element name="files" className="element">
      <Divider text="Files" />
      <CategoryModule pullRequest={pullRequest} type={'files'} />
    </Element>
    <Element name="changesets" className="element">
      <Divider text="Changesets" />
      <CategoryModule pullRequest={pullRequest} type={'changesets'} />
    </Element>
    <Element name="issues" className="element">
      <Divider text="Issues" />
      <CategoryModule pullRequest={pullRequest} type={'issues'} />
    </Element>
    <Element name="discussion" className="element">
      <Divider text="Discussion" />
      <CategoryModule pullRequest={pullRequest} type={'discussion'} />
    </Element>
    <Element name="diff" className="element">
      <Divider text="Diff" />
      <CategoryModule pullRequest={pullRequest} type={'diff'} />
    </Element>
    <Element name="page-bottom" />
  </div>

export default LayoutGuardian
