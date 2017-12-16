// @flow

import { valueCreator, cleanupString, getItemProp, levenshtein } from '../../utils'
import type { Stage2PluginData, Value } from '../../../types/plugin'

const createValue = valueCreator('price')

function getSchemaOrgValue(dom): ?Value {
  const price = getItemProp(dom, 'price')
  if (!price) return null

  return createValue(price, 100)
}

export default function price({ dom, results }: Stage2PluginData): Stage2PluginData {
  const metadata = getSchemaOrgValue(dom)
  if (metadata) {
    return { dom, results: [...results, metadata] }
  }

  const priceSymbols = ['Kč', ',-', 's DPH', 'bez DPH']

  const priceElements = dom.find('.price')

  priceElements.each((i, e) => {
    const inner = e.innerText
    const found = priceSymbols.some(x => inner.indexOf(x) != -1)
    if (found && inner.length < 20) {
      console.log(cleanupString(e.innerText))
    }
  })

  return { dom, results: [...results, createValue(0, 0)] }
}
