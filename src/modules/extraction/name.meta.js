// @flow

import { valueCreator, cleanupString, getItemProp, levenshtein } from '../../utils'
import type { Stage2PluginData, Value } from '../../../types/plugin'

const createValue = valueCreator('name', 'name.meta')

function getSchemaOrgValue(dom): ?Value {
  const name = getItemProp(dom, 'name')
  if (!name) return null
  return createValue(name, 100)
}

export default function name({ dom, results }: Stage2PluginData): Stage2PluginData {
  const metadata = getSchemaOrgValue(dom)
  if (metadata) {
    return { dom, results: [...results, metadata] }
  }

  return { dom, results: [...results, createValue('', 0)] }
}
