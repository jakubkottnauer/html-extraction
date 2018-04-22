// @flow

import { valueCreator, cleanupString, getJsonld, normalizeCurrency } from '../../utils'
import type { Stage1PluginData, Stage2PluginData, Value } from '../../../types/plugin'
import { priceSymbols } from '../../constants'

const createValue = valueCreator('price', 'price.jsonld')
const createCurrencyValue = valueCreator('currency', 'price.jsonld')

export default (dom: Stage2PluginData): Value | Array<Value> => {
  const jsonld = getJsonld(dom)
  if (!jsonld || !jsonld.offers) return createValue(null, 0)
  const { price, priceCurrency } = jsonld.offers

  return [
    createValue(price, price ? 100 : 0),
    createCurrencyValue(
      priceCurrency ? normalizeCurrency(priceCurrency) : null,
      priceCurrency ? 100 : 0
    ),
  ]
}
