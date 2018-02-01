// @flow
import type { Value } from '../../types/plugin'

export default (key: string, extractor: string = key) => (
  value: string | number | null,
  confidence: number,
  selector: ?string
): Value => ({
  key,
  value: (confidence < 0 || confidence > 100) ? 'INVALID CONFIDENCE' : value,
  confidence,
  extractor,
  selector,
})
