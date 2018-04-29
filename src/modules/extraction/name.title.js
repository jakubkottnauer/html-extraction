// @flow

import { valueCreator, cleanupString } from '../../utils'
import type { Stage1PluginData, Stage2PluginData, Value } from '../../../types/plugin'

const createValue = valueCreator('name', 'name.title')

export default (dom: Stage2PluginData): Value => {
  const pageTitle = dom.find('title')[0]?.innerText
  if (!pageTitle) return createValue('', 0)
  const titleSeparators = [' | ', ' - ', ' – ']

  const split = titleSeparators.map(x => pageTitle.split(x).map(cleanupString))
  const candidates = split.filter(x => x.length === 2) || []
  return createValue(candidates[0]?.[0] || null, candidates[0] ? 90 : 0)
}
