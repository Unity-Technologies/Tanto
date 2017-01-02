import chai from 'chai'

import { orderBy, DIRECTION } from 'ducks/order'

const expect = chai.expect

describe('orderby reducer', () => {
  it('should handle direction and order field', () => {
    const action = {
      orderBy: {
        direction: DIRECTION.ASC,
        field: 'testfield',
      },
    }
    expect(orderBy({}, action)).to.eql(action.orderBy)
    expect(orderBy({
      direction: DIRECTION.DESC,
      field: 'foo',
    }, action)).to.eql(action.orderBy)
  })
})
