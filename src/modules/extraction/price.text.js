// @flow

import { valueCreator, cleanupString, getMicrodataValue, levenshtein } from '../../utils'
import type { Stage1PluginData, Stage2PluginData, Value } from '../../../types/plugin'
import { priceSymbols } from '../../constants'

const createValue = valueCreator('price', 'text')

export default (dom: Stage2PluginData): Value => {
  return createValue(0, 10)
}
