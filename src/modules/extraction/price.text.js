// @flow

import { valueCreator, cleanupString, getMicrodataValue, normalizeCurrency } from '../../utils'
import type { Stage1PluginData, Stage2PluginData, Value } from '../../../types/plugin'
import { priceSymbols } from '../../constants'

const createValue = valueCreator('price', 'price.text')
const createCurrencyValue = valueCreator('currency', 'price.text')

const currencySingleCharFirst = str => ({ currency: str.substr(0, 1), price: str.substr(1) })
const currencyTripleCharFirst = str => ({ currency: str.substr(0, 3), price: str.substr(3) })
const spaced = str => {
  const s = str.split(' ')
  return { currency: s[1], price: s[0] }
}

export default (dom: Stage2PluginData): Value | Array<Value> => {
  const txt = dom.text() || ''

  const regexes = [
    { expr: /\$\d+(\.\d{1,2})/, func: currencySingleCharFirst },
    { expr: /USD\d+(\.\d{1,2})/, func: currencyTripleCharFirst },
    { expr: /€\d+(\.\d{1,2})/, func: currencySingleCharFirst },
    { expr: /EUR\d+(\.\d{1,2})/, func: currencyTripleCharFirst },
    { expr: /\d+(\.\d{1,2}) EUR/, func: spaced },
    { expr: /\d+(,\d{1,2})? Kč/, func: spaced },
    { expr: /\d+(,\d{1,2})? ,-/, func: spaced },
  ]

  const matching = regexes.find(r => (txt.match(r.expr) || [])[0])
  if (!matching) return []

  const { currency, price } = matching.func((txt.match(matching.expr) || [])[0])

  return [createValue(price, 50), createCurrencyValue(normalizeCurrency(currency), 50)]
}
