// @flow
import type { Value } from '../../types/plugin'

export default (key: string, extractorName: string = key) => (
  value: string | number,
  confidence: number
) => ({
  key,
  value: confidence < 0 || confidence > 100 ? 'INVALID CONFIDENCE' : value,
  confidence,
  extractorName,
})
