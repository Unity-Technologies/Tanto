import {
  unifiedDiff,
  sideBySideDiff,
} from 'utils/prismjs/PrismCodeParser'
import { DiffTypes } from 'universal/constants'
import { types } from 'ducks/diff'

self.onmessage = ({ data: action }) => {
  const { diff, type, diffType } = action.payload
  const processedDiff = diffType === DiffTypes.UNIFIED ? unifiedDiff(diff, type) : sideBySideDiff(diff, type)

  self.postMessage({
    type: types.SET_DIFF,
    payload: {
      ...action.payload,
      diff: processedDiff,
    },
  })
}
