// @flow

import { valueCreator, cleanupString, getMicrodataValue, normalizeCurrency } from '../../utils'
import type { Stage1PluginData, Stage2PluginData, Value } from '../../../types/plugin'
import { priceSymbols } from '../../constants'

const createValue = valueCreator('price', 'price.text')
const createCurrencyValue = valueCreator('currency', 'price.text')

export default (dom: Stage2PluginData): Value | Array<Value> => {
  const value = cleanupString((dom.find('#price')[0] || {}).innerText || '')
  if (!value) return createValue(null, 0)

  const price = (value.match(/\$\d+(\.\d{1,2})/) || [])[0] // Price in the format $12 (USD)
  const currency = price.substr(0, 1)
  const removedCurrency = price.substr(1)

  return [createValue(removedCurrency, 50), createCurrencyValue(normalizeCurrency(currency), 50)]
}
