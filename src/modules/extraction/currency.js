// @flow

import { valueCreator, cleanupString, getItemProp, levenshtein } from '../../utils'
import type { Stage1PluginData, Stage2PluginData, Value } from '../../../types/plugin'

const createValue = valueCreator('currency')

function getSchemaOrgValue(dom): ?Value {
  const currency = getItemProp(dom, 'currency') || getItemProp(dom, 'priceCurrency')
  if (!currency) return null

  return createValue(currency, 100)
}

export default (dom: Stage1PluginData): Value => {
  const metadata = getSchemaOrgValue(dom)
  if (metadata) {
    return metadata
  }

  return createValue('', 0)
}
