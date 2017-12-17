// @flow

import { valueCreator, cleanupString, getItemProp, levenshtein } from '../../utils'
import type { Stage1PluginData, Stage2PluginData, Value } from '../../../types/plugin'
import { priceSymbols } from '../../constants'

const createValue = valueCreator('price', 'text')

export default (dom: Stage1PluginData): Value => {
  return createValue(0, 10)
}
