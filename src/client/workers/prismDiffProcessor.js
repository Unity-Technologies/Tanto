import {
  unifiedDiff,
  sideBySideDiff,
} from 'utils/prismjs/PrismCodeParser'
import { types } from 'ducks/diff'
self.onmessage = ({ data: action }) => {
  const { diff, type, diffType } = action.payload
  const processedDiff = diffType === 0 ? unifiedDiff(diff, type) : sideBySideDiff(diff, type)

  self.postMessage({
    type: types.SET_DIFF,
    payload: {
      ...action.payload,
      diff: processedDiff,
    },
  })
}
