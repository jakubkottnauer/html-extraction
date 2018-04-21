// @flow

import { cleanupString, valueCreator, getJsonld, schemaFields } from '../../utils'
import type { Stage1PluginData, Stage2PluginData, Value } from '../../../types/plugin'

const key = 'jsonld.schemaorg'

export default async (dom: Stage2PluginData): Promise<?Array<Value>> => {
  const fields = await schemaFields()
  const jsonld = getJsonld(dom)
  if (!jsonld) return null
  console.log(jsonld)
  const extractedFields = fields
    .map(field => ({ field, value: cleanupString((jsonld[field] || '').toString()) }))
    .filter(r => r.value)
    .map(r => valueCreator(r.field, key)(r.value, 100))

  // Get entityType from JSON-LD
  const entityTypeVal = (jsonld['@type'] || '').toLowerCase()
  const entityType = valueCreator('entityType', key)(entityTypeVal, entityTypeVal.length> 0 ? 100 : 0)
  return [...extractedFields, entityType]
}
