/* eslint-disable max-len */
import { reduceObjById, reduceArrayToObj, merge } from 'ducks/normalizer'

const expect = require('chai').expect

describe('convertToObjById', () => {
  it('should transform to object with `id` by derfault', () => {
    const testObj = { id: 'test_id', name: 'test_name', title: 'test_title' }
    const convObj = { test_id: { id: 'test_id', name: 'test_name', title: 'test_title' } }
    expect(reduceObjById(testObj)).to.be.eql(convObj)
  })

  it('should transform to object with `id` property passed as argument', () => {
    const testObj = { id: 'test_id', name: 'test_name', title: 'test_title' }
    const convObj = { test_id: { id: 'test_id', name: 'test_name', title: 'test_title' } }
    expect(reduceObjById(testObj, 'id')).to.be.eql(convObj)
  })

  it('should transform to object with `title` property passed as argument', () => {
    const testObj = { id: 'test_id', name: 'test_name', title: 'test_title' }
    const convObj = { test_title: { id: 'test_id', name: 'test_name', title: 'test_title' } }
    expect(reduceObjById(testObj, 'title')).to.be.eql(convObj)
  })
})

describe('reduceArrayById', () => {
  it('array is reduced to object by default with "id" attribute', () => {
    const expectedReduced = {
      test_id: { id: 'test_id', name: 'test_name', title: 'test_title' },
      test_id2: { id: 'test_id2', name: 'test_name2', title: 'test_title2' },
      test_id3: { id: 'test_id3', name: 'test_name3', title: 'test_title3' },
    }

    const testArray = [
        { id: 'test_id', name: 'test_name', title: 'test_title' },
        { id: 'test_id2', name: 'test_name2', title: 'test_title2' },
        { id: 'test_id3', name: 'test_name3', title: 'test_title3' },
    ]

    expect(reduceArrayToObj(testArray)).to.be.eql(expectedReduced)
  })
})

describe('merge', () => {
  it('two objects are merged to one object that contains all the keys', () => {
    const obj1 = {
      test_id: { id: 'test_id', name: 'test_name', title: 'test_title' },
      test_id2: { id: 'test_id2', name: 'test_name2', title: 'test_title2' },
      test_id3: { id: 'test_id3', name: 'test_name3', title: 'test_title3' },
    }

    const obj2 = {
      test_id4: { id: 'test_id', name: 'test_name', title: 'test_title' },
      test_id5: { id: 'test_id2', name: 'test_name2', title: 'test_title2' },
      test_id6: { id: 'test_id3', name: 'test_name3', title: 'test_title3' },
    }

    const expectedMerged = {
      test_id: { id: 'test_id', name: 'test_name', title: 'test_title' },
      test_id2: { id: 'test_id2', name: 'test_name2', title: 'test_title2' },
      test_id3: { id: 'test_id3', name: 'test_name3', title: 'test_title3' },
      test_id4: { id: 'test_id', name: 'test_name', title: 'test_title' },
      test_id5: { id: 'test_id2', name: 'test_name2', title: 'test_title2' },
      test_id6: { id: 'test_id3', name: 'test_name3', title: 'test_title3' },
    }

    expect(merge(obj1, obj2)).to.be.eql(expectedMerged)
  })

  it('two objects are merged to one object that contains all the keys if repeated-then replaced with the last', () => {
    const obj1 = {
      test_id: { id: 'test_id', name: 'test_name', title: 'test_title' },
      test_id2: { id: 'test_id2', name: 'test_name2', title: 'test_title2' },
      test_id3: { id: 'test_id3', name: 'test_name3', title: 'test_title3' },
    }

    const obj2 = {
      test_id: { id: 'test_id22', name: 'test_name22', title: 'test_title22' },
      test_id2: { id: 'test_id22', name: 'test_name22', title: 'test_title22' },
      test_id3: { id: 'test_id32', name: 'test_name32', title: 'test_title32' },
    }

    const expectedMerged = {
      test_id: { id: 'test_id22', name: 'test_name22', title: 'test_title22' },
      test_id2: { id: 'test_id22', name: 'test_name22', title: 'test_title22' },
      test_id3: { id: 'test_id32', name: 'test_name32', title: 'test_title32' },
    }

    expect(merge(obj1, obj2)).to.be.eql(expectedMerged)
  })
})
