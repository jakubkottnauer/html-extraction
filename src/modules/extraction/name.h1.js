// @flow

import { valueCreator, cleanupString, getMicrodataValue, levenshtein } from '../../utils'
import type { Stage1PluginData, Stage2PluginData, Value } from '../../../types/plugin'

const createValue = valueCreator('name', 'name.h1')

export default (dom: Stage2PluginData): Value => {
  const headings = dom.find('h1')

  if (headings.length === 0) {
    return createValue('no name', 0)
  }

  if (headings.length === 1) {
    return createValue(cleanupString(headings[0].innerText), 90, 'h1')
  }

  return createValue(null, 0)
}
