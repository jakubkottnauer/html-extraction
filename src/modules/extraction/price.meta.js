// @flow

import { valueCreator, cleanupString, getItemProp, levenshtein } from '../../utils'
import type { Stage1PluginData, Stage2PluginData, Value } from '../../../types/plugin'

const createValue = valueCreator('price', 'meta')

function getSchemaOrgValue(dom): ?Value {
  const price = getItemProp(dom, 'price')
  if (!price) return null

  return createValue(parseFloat(price), 100)
}

export default (dom: Stage1PluginData): Value => {
  const metadata = getSchemaOrgValue(dom)
  if (metadata) {
    return metadata
  }

  return createValue(0, 0)
}
