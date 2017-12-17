// @flow

import { valueCreator, cleanupString, getItemProp, levenshtein } from '../../utils'
import type { Stage1PluginData, Stage2PluginData, Value } from '../../../types/plugin'

const createValue = valueCreator('description')

function getSchemaOrgValue(dom): ?Value {
  const description = getItemProp(dom, 'description')
  if (!description) return null
  return createValue(description, 100)
}

export default (dom: Stage1PluginData): Value => {
  const metadata = getSchemaOrgValue(dom)
  if (metadata) {
    return metadata
  }

  const selectors = ['features', 'detail', 'description']
  selectors.forEach(s => {
    //console.log(dom.find(`[class*='${s}']`))
  })
  return createValue('', 0)
}
