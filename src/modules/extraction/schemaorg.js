// @flow

import { valueCreator, cleanupString, getMicrodataValue, levenshtein } from '../../utils'
import type { Stage1PluginData, Stage2PluginData, Value } from '../../../types/plugin'

const key = 'microdata.schemaorg'

export default async (dom: Stage2PluginData): Promise<Value> => {
  const schema = await import('./schema.json')
  if (!schema) return valueCreator(key)('no data', 0)

  return schema['@graph']
    .filter(node => node['@type'] === 'rdf:Property')
    .map(node => node['rdfs:label'])
    .map(field => ({ field, value: getMicrodataValue(dom, field) }))
    .filter(r => r.value)
    .map(r => valueCreator(r.field, key)(r.value, 100))
}
