// @flow

import { valueCreator, cleanupString, getItemProp, levenshtein } from '../../utils'
import type { Stage1PluginData, Stage2PluginData, Value } from '../../../types/plugin'
import { priceSymbols } from '../../constants'

const createValue = valueCreator('price', 'dom')

export default (dom: Stage1PluginData): Value => {
  const priceElements = dom.find('.price')

  priceElements.each((i, e) => {
    const inner = e.innerText
    const found = priceSymbols.some(x => inner.indexOf(x) != -1)
    if (found && inner.length < 20) {
      console.log(cleanupString(e.innerText))
    }
  })

  return createValue(0, 0)
}
