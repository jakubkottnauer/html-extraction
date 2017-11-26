// @flow
import type { Value } from '../../types/plugin'

export default function createValue(
  key: string,
  value: string | number,
  confidence: number
): Value {
  if (confidence < 0 || confidence > 100) {
    return { key, value: 'INVALID CONFIDENCE', confidence }
  }
  return { key, value, confidence }
}
