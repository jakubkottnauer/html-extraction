// @flow

import { valueCreator, cleanupString, getItemProp, levenshtein } from '../../utils'
import type { Stage2PluginData, Value } from '../../../types/plugin'

const createValue = valueCreator('description')

function getSchemaOrgValue(dom): ?Value {
  const description = getItemProp(dom, 'description')
  if (!description) return null
  return createValue(description, 100)
}

export default function description({ dom, results }: Stage2PluginData): Stage2PluginData {
  const metadata = getSchemaOrgValue(dom)
  if (metadata) {
    return { dom, results: [...results, metadata] }
  }

  const selectors = ['features', 'detail', 'description']
  selectors.forEach(s => {
    //console.log(dom.find(`[class*='${s}']`))
  })
  const description = createValue('', 0)
  return { dom, results: [...results, description] }
}
