/* @flow */

import chai from 'chai'
import {
  pages,
  total,
  requestPage,
  pageSize,
  receivePage,
  REQUEST_PAGE,
  RECEIVE_PAGE,
  currentPage,
  pagination,
} from '../index'
const expect = chai.expect

describe('pagination actions', () => {
  it('request page action', () => {
    const payload = { value: 'test ' }
    const action = {
      type: REQUEST_PAGE,
      payload,
    }
    expect(requestPage(payload)).to.eql(action)
  })

  it('receive page action', () => {
    const payload = { value: 'test ' }
    const action = {
      type: RECEIVE_PAGE,
      payload,
    }
    expect(receivePage(payload)).to.eql(action)
  })
})


describe('pagination reducers', () => {
  it('current page', () => {
    const payload = { page: 11 }
    const action = {
      type: RECEIVE_PAGE,
      payload,
    }
    expect(currentPage(0, action)).to.eql(payload.page)
  })

  it('page size', () => {
    const payload = { pageSize: 100 }
    const action = {
      type: RECEIVE_PAGE,
      payload,
    }
    expect(pageSize(0, action)).to.eql(payload.pageSize)
  })

  it('total', () => {
    const payload = { total: 121 }
    const action = {
      type: RECEIVE_PAGE,
      payload,
    }
    expect(total(0, action)).to.eql(payload.total)
  })

  it('pages request page', () => {
    const payload = { page: 21 }
    const action = requestPage(payload)
    const state = { 21: [] }
    expect(pages({}, action)).to.eql(state)
  })

  it('pages receive page', () => {
    const nodes = [{ id: 1, title: 'test1' }, { id: 4, title: 'test41' }, { id: 3, title: 'test3' }]
    const payload = { page: 21, nodes }
    const action = receivePage(payload)
    const state = { 21: nodes.map(x => x.id) }
    expect(pages({}, action)).to.eql(state)
  })
})

describe('pagination combine reducer', () => {
  it('should handle REQUEST_PAGE', () => {
    const payload = { page: 11 }
    const action = {
      type: REQUEST_PAGE,
      payload,
    }

    const state = { pages: { 11: [] }, currentPage: 0, pageSize: 15, total: 0 }
    expect(pagination({}, action)).to.eql(state)
  })

  it('should receive page', () => {
    const nodes = [{ id: 1, title: 'test1' }, { id: 4, title: 'test41' }, { id: 3, title: 'test3' }]
    const payload = { page: 11, pageSize: 12, total: 120, nodes }
    const action = {
      type: RECEIVE_PAGE,
      payload,
    }

    const state = { pages: { 11: nodes.map(x => x.id) }, currentPage: 11, pageSize: 12, total: 120 }
    expect(pagination({}, action)).to.eql(state)
  })
})
