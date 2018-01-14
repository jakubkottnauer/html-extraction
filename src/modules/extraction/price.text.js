// @flow

import { valueCreator, cleanupString, getMicrodataValue, levenshtein } from '../../utils'
import type { Stage1PluginData, Stage2PluginData, Value } from '../../../types/plugin'
import { priceSymbols } from '../../constants'

const createValue = valueCreator('price', 'price.text')

export default (dom: Stage2PluginData): Value => {
  const value = cleanupString((dom.find('#price')[0] || {}).innerText || '')
  if (!value) return createValue(0, 0)

  const price = value.match(/\$\d+(\.\d{1,2})/)[0] // Price in the format $12 (USD)
  const removedCurrency = parseFloat(price.substr(1))
  return createValue(removedCurrency, 50)
}
