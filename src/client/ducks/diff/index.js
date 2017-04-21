/* @flow */

export const types = {
  SET_DIFF: 'DIFF/SET_DIFF',
  PROCESS_DIFF: 'DIFF/PROCESS_DIFF',
  INVALIDATE_DIFF: 'DIFF/INVALIDATE_DIFF',
}

export const invalidateDiff = (id: string) => ({ type: types.INVALIDATE_DIFF, id })
export const processDiff = (id: string, type: string, diff: any, diffType: number) => ({
  type: types.PROCESS_DIFF,
  meta: {
    WebWorker: true,
  },
  payload: {
    diff,
    type,
    id,
    diffType,
  },
})

export const diff = (state: Object = {}, action: Object): Object => {
  switch (action.type) {
    case types.SET_DIFF:
      return {
        ...state,
        [action.payload.id]: {
          ...state[action.payload.id],
          [action.payload.diffType]: action.payload.diff,
        },
      }
    case types.INVALIDATE_DIFF:
      return {
        ...state,
        [action.id]: null,
      }
    default:
      return state
  }
}

export default diff
