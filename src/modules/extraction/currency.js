// @flow

import { createValue, cleanupString, getItemProp, levenshtein } from '../../utils'
import type { Stage2PluginData, Value } from '../../../types/plugin'

const KEY = 'currency'

function getSchemaOrgValue(dom): ?Value {
  const currency = getItemProp(dom, 'currency') || getItemProp(dom, 'priceCurrency')
  if (!currency) return null

  return createValue(KEY, currency, 100)
}

export default function currency({ dom, results }: Stage2PluginData): Stage2PluginData {
  const metadata = getSchemaOrgValue(dom)
  if (metadata) {
    return { dom, results: [...results, metadata] }
  }

  return { dom, results: [...results, createValue(KEY, '', 0)] }
}
