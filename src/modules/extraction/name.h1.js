// @flow

import { createValue, cleanupString, getItemProp, levenshtein } from '../../utils'
import type { Stage2PluginData, Value } from '../../../types/plugin'

const KEY = 'name'

export default function name({ dom, results }: Stage2PluginData): Stage2PluginData {
  const headings = dom.find('h1')
  if (headings.length === 0) {
    return { dom, results: [...results, createValue(KEY, 'no name', 0)] }
  }

  if (headings.length === 1) {
    return {
      dom,
      results: [...results, createValue(KEY, cleanupString(headings[0].innerText), 90)],
    }
  }

  return { dom, results: [...results, createValue(KEY, '', 0)] }
}
