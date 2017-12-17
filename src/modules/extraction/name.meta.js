// @flow

import { valueCreator, cleanupString, getItemProp, levenshtein } from '../../utils'
import type { Stage1PluginData, Stage2PluginData, Value } from '../../../types/plugin'

const createValue = valueCreator('name', 'name.meta')

function getSchemaOrgValue(dom): ?Value {
  const name = getItemProp(dom, 'name')
  if (!name) return null
  return createValue(name, 100)
}

export default (dom: Stage1PluginData): Value => {
  const metadata = getSchemaOrgValue(dom)
  if (metadata) {
    return metadata
  }

  return createValue('', 0)
}
