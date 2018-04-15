// @flow

import { valueCreator, cleanupString, getMicrodataValue } from '../../utils'
import type { Stage1PluginData, Stage2PluginData, Value } from '../../../types/plugin'
import { priceSymbols } from '../../constants'

const createValue = valueCreator('price', 'price.dom')

export default (dom: Stage2PluginData): Value | Array<Value> => {
  const priceElements = [...dom.find('.price'), ...dom.find('.vat-price')]

  let results: Array<Value> = []
  priceElements.forEach(e => {
    const inner = e.innerText || ''
    const found = !!priceSymbols.some(x => inner.indexOf(x) != -1)
    if (found && inner.length < 20) {
      results = [...results, createValue(e.innerText, 30)]
    }
  })

  return results.length > 0 ? results : createValue(null, 0)
}
