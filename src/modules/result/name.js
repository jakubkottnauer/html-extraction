// @flow

import R from 'ramda'
import { cleanupString, getItemProp, levenshtein } from '../../utils'
import type { Stage3PluginData } from '../../../types/plugin'

const KEY = 'name'

export default function name(results: Stage3PluginData): Stage3PluginData {
  const x = results.filter(r => r.key === KEY)
  const rest = results.filter(r => r.key !== KEY)

  return [...rest, x[0]]
}
